"use server"

import { db, links } from "@db"

import { currentUser } from "@clerk/nextjs/server"
import { desc } from "drizzle-orm"

export async function getLinks() {
  try {
    const user = await currentUser()
    if (!user) return

    const fetchedLinks = await db
      .select()
      .from(links)
      .orderBy(desc(links.clicks))

    return fetchedLinks
  } catch (e) {
    console.error(e)
  }
}
