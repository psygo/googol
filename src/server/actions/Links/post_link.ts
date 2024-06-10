"use server"

import { db, links } from "@db"

import { currentUser } from "@clerk/nextjs/server"

export async function postLink(link: string) {
  try {
    const user = await currentUser()
    if (!user) return

    await db.insert(links).values({
      link,
      creatorId: user.id,
    })
  } catch (e) {
    console.error(e)
  }
}
