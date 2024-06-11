"use server"

import { currentUser } from "@clerk/nextjs/server"

import { type NanoId } from "@types"

import { clicks, db } from "@db"

export async function postClick(linkNanoId: NanoId) {
  try {
    const user = await currentUser()

    await db.insert(clicks).values({
      linkId: linkNanoId,
      clickerId: user ? user.id : null,
    })
  } catch (e) {
    console.error(e)
  }
}
