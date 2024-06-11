"use server"

import { currentUser } from "@clerk/nextjs/server"

import { type NanoId } from "@types"

import { comments, db } from "@db"

export async function postComment(
  linkNanoId: NanoId,
  content: string,
) {
  try {
    const user = await currentUser()
    if (!user) return

    await db.insert(comments).values({
      content,
      commenterId: user.id,
      linkId: linkNanoId,
    })
  } catch (e) {
    console.error(e)
  }
}
