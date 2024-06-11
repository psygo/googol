"use server"

import { desc, eq, getTableColumns, sql } from "drizzle-orm"

import { db, links, votes } from "@db"

import { currentUser } from "@clerk/nextjs/server"

export async function getLinks(search = "") {
  try {
    const user = await currentUser()
    if (!user) return

    let linksQuery = db
      .select({
        ...getTableColumns(links),
        stats: {
          positiveVoteTotal: sql<number>/* sql */ `
            SUM(
              CASE WHEN ${votes.points} > 0
                THEN ${votes.points} 
                ELSE 0
              END
            )
          `.mapWith(Number),
          negativeVoteTotal: sql<number>/* sql */ `
            SUM(
              CASE WHEN ${votes.points} < 0
                THEN ${votes.points} 
                ELSE 0
              END
            )
          `.mapWith(Number),
        },
      })
      .from(links)
      .leftJoin(votes, eq(links.nanoId, votes.linkId))
      .groupBy(links.id)
      .orderBy(desc(links.clicks))

    if (search !== "") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      linksQuery = linksQuery.where(
        sql/* sql */ `
          LOWER(${links.title}) LIKE LOWER(${sql.raw(`'%${search}%'`)})
        `,
      )
    }

    const fetchedLinks = await linksQuery

    return fetchedLinks
  } catch (e) {
    console.error(e)
  }
}
