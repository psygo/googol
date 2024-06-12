"use server"

import {
  type AnyColumn,
  desc,
  eq,
  getTableColumns,
  or,
  sql,
} from "drizzle-orm"

import "@utils/array"

import { type NanoId } from "@types"

import { clicks, comments, db, links, votes } from "@db"

const userDistinctVotes = db
  .selectDistinctOn([votes.voterId, votes.linkId], {
    ...getTableColumns(votes),
  })
  .from(votes)
  .orderBy(
    votes.voterId,
    votes.linkId,
    desc(votes.createdAt),
  )
  .as("userDistinctVotes")

const linksQuery = db
  .select({
    ...getTableColumns(links),
    stats: {
      clicksTotal: sql<number>/* sql */ `COUNT(${clicks})`,
      commentsTotal: sql<number>/* sql */ `COUNT(${comments})`,
      positiveVoteTotal: sql<number>/* sql */ `
        SUM(
          CASE WHEN ${userDistinctVotes.points} > 0
            THEN ${userDistinctVotes.points} 
            ELSE 0
          END
        )
      `.mapWith(Number),
      negativeVoteTotal: sql<number>/* sql */ `
        SUM(
          CASE WHEN ${userDistinctVotes.points} < 0
            THEN ${userDistinctVotes.points} 
            ELSE 0
          END
        )
      `.mapWith(Number),
    },
  })
  .from(links)
  .leftJoin(
    userDistinctVotes,
    eq(links.nanoId, userDistinctVotes.linkId),
  )
  .leftJoin(clicks, eq(links.nanoId, clicks.linkId))
  .leftJoin(comments, eq(links.nanoId, comments.linkId))
  .groupBy(links.id)
  .orderBy(desc(links.createdAt))

export async function getLinks(search = "") {
  try {
    let allLinksQuery = linksQuery

    if (search !== "") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      allLinksQuery = linksQuery.where(
        or(
          searchQuery(links.url, search),
          searchQuery(links.title, search),
          searchQuery(links.description, search),
          searchQuery(links.content, search),
        ),
      )
    }

    return await allLinksQuery
  } catch (e) {
    console.error(e)
  }
}

function searchQuery(col: AnyColumn, search: string) {
  return sql/* sql */ `
    LOWER(${col}) LIKE LOWER(${sql.raw(`'%${search}%'`)})
  `
}

export async function getLink(linkNanoId: NanoId) {
  try {
    const link = await linksQuery.where(
      eq(links.nanoId, linkNanoId),
    )

    return link.first()
  } catch (e) {
    console.error(e)
  }
}
