"use client"

import { useRouter } from "next/navigation"

import { type SelectLinkWithStatsAndCreator } from "@types"

import { postClick } from "@actions"

import { Button } from "@shad"

import { ClicksStats } from "./ClicksStats"
import { CommentsStats } from "./CommentsStats"
import { Creator } from "./Creator"
import { VoteButton } from "./VoteButton"

type LinkCardProps = {
  link: SelectLinkWithStatsAndCreator
}

export function LinkCard({ link }: LinkCardProps) {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      asChild
      className="flex h-max w-full cursor-pointer items-start rounded-md border-2 bg-gray-900 px-4 py-3 pb-4"
      onClick={async () =>
        router.push(`/links/${link.nanoId}`)
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline gap-3">
          {link.title && (
            <h3 className="text-3xl font-semibold">
              {link.title}
            </h3>
          )}
          <a
            href={link.url}
            className="text-xl text-blue-300"
            onClick={async () =>
              await postClick(link.nanoId)
            }
          >
            {link.url}
          </a>
          <p className="text-base text-gray-500">
            {link.createdAt.toDateString()}
          </p>
        </div>
        {link.description && (
          <p className="text-3xl font-semibold">
            {link.description}
          </p>
        )}
        <div className="flex gap-3">
          <ClicksStats
            clicksTotal={link.stats.clicksTotal}
          />
          <CommentsStats
            commentsTotal={link.stats.commentsTotal}
          />
          <VoteButton link={link} up={true} />
          <VoteButton link={link} up={false} />
          <Creator creator={link.creator} />
        </div>
      </div>
    </Button>
  )
}
