"use server"

import { desc, eq, getTableColumns } from "drizzle-orm"

import {
  type NanoId,
  type SelectCommentWithCommenter,
} from "@types"

import { comments, db, users } from "@db"

export async function getComments(linkNanoId: NanoId) {
  try {
    const cs = await db
      .select({
        ...getTableColumns(comments),
        commenter: {
          ...getTableColumns(users),
        },
      })
      .from(comments)
      .leftJoin(
        users,
        eq(comments.commenterId, users.clerkId),
      )
      .where(eq(comments.linkId, linkNanoId))
      .groupBy(comments.id, users.id)
      .orderBy(desc(comments.updatedAt))

    return cs as SelectCommentWithCommenter[]
  } catch (e) {
    console.error(e)
  }
}
