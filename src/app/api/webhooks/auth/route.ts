import { Webhook } from "svix"

import {
  type UserJSON,
  type WebhookEvent,
  clerkClient,
} from "@clerk/nextjs/server"

import { headers } from "next/headers"
import { NextResponse } from "next/server"

import "@utils/array"

import { db, users } from "@db"
import { eq } from "drizzle-orm"

const clerkWebhooksUserEventsSecret =
  process.env.CLERK_WEBHOOKS_USER_EVENTS!

async function validateRequest(request: Request) {
  try {
    const payloadString = await request.text()
    const headerPayload = headers()

    const svixHeaders = {
      "svix-id": headerPayload.get("svix-id")!,
      "svix-timestamp": headerPayload.get(
        "svix-timestamp",
      )!,
      "svix-signature": headerPayload.get(
        "svix-signature",
      )!,
    }

    const wh = new Webhook(clerkWebhooksUserEventsSecret)

    return wh.verify(
      payloadString,
      svixHeaders,
    ) as WebhookEvent
  } catch (e) {
    console.error(e)
  }
}

export async function POST(req: Request) {
  try {
    const verifiedPayload = await validateRequest(req)

    if (verifiedPayload) {
      const data = verifiedPayload.data as UserJSON
      const type = verifiedPayload.type

      switch (type) {
        case "user.created":
          await createUser(data)
          break
        case "user.updated":
          await updateUser(data)
          break
        default:
          console.log(`${type} is not a managed event.`)
      }
    }

    return NextResponse.json({})
  } catch (e) {
    console.error(e)
  }
}

async function createUser(userData: UserJSON) {
  try {
    const dbUserData = await db
      .insert(users)
      .values({
        clerkId: userData.id,
        username: userData.username!,
        email:
          userData.email_addresses.first().email_address,
      })
      .returning()

    await clerkClient.users.updateUser(userData.id, {
      publicMetadata: {
        nanoid: dbUserData.first().nanoId,
        isAdmin: false,
      },
    })
  } catch (e) {
    console.error(e)
  }
}

async function updateUser(userData: UserJSON) {
  try {
    await db
      .update(users)
      .set({
        username: userData.username!,
        email:
          userData.email_addresses.first().email_address,
      })
      .where(eq(users.clerkId, userData.id))
  } catch (e) {
    console.error(e)
  }
}
