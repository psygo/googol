"use server"

import { type NanoId } from "@types"

import { db, increment, links } from "@db"

import { eq } from "drizzle-orm"

export async function postClick(linkNanoId: NanoId) {
  try {
    const fetchedLinks = await db
      .update(links)
      .set({ clicks: increment(links.clicks) })
      .where(eq(links.nanoId, linkNanoId))

    return fetchedLinks
  } catch (e) {
    console.error(e)
  }
}
