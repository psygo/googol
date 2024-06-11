"use server"

import { JSDOM } from "jsdom"

import { db, links } from "@db"

import { currentUser } from "@clerk/nextjs/server"

export async function postLink(url: string) {
  try {
    const user = await currentUser()
    if (!user) return

    const { title, description, content } =
      await fetchUrlContents(url)

    await db.insert(links).values({
      url,
      title,
      description,
      content,
      creatorId: user.id,
    })
  } catch (e) {
    console.error(e)
  }
}

async function fetchUrlContents(url: string) {
  const res = await fetch(url)
  const text = await res.text()
  const dom = new JSDOM(text)

  const toBeDeleted = dom.window.document.querySelectorAll(
    "script, style, link",
  )
  toBeDeleted.forEach((el) => el.remove())

  const title = dom.window.document.querySelector("title")
  const titleStr = title?.innerHTML ?? ""
  const description =
    dom.window.document.querySelector("description")
  const descriptionStr = description?.innerHTML ?? ""
  const content = dom.window.document.querySelector("body")
  const contentStr = content?.innerHTML ?? ""

  return {
    title: titleStr,
    description: descriptionStr,
    content: contentStr,
  }
}
