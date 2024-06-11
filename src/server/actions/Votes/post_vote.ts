"use server"

import { type NanoId } from "@types"

import { db, votes } from "@db"

import { currentUser } from "@clerk/nextjs/server"

export async function postVote(
  linkNanoId: NanoId,
  up: boolean,
) {
  try {
    const user = await currentUser()
    if (!user) return

    await db.insert(votes).values({
      points: up ? 1 : -1,
      linkId: linkNanoId,
      voterId: user.id,
    })
  } catch (e) {
    console.error(e)
  }
}
