"use server"

import { desc, eq, getTableColumns, sql } from "drizzle-orm"

import { db, links, votes } from "@db"

import { currentUser } from "@clerk/nextjs/server"

export async function getLinks() {
  try {
    const user = await currentUser()
    if (!user) return

    const fetchedLinks = await db
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

    return fetchedLinks
  } catch (e) {
    console.error(e)
  }
}
