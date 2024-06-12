"use client"

import { useRouter } from "next/navigation"

import { type SelectLinkWithStats } from "@types"

import { postClick } from "@actions"

import { Button } from "@shad"

import { ClickStats } from "./ClickStats"
import { VoteButton } from "./VoteButton"

type LinkCardProps = {
  link: SelectLinkWithStats
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
        <div className="flex items-baseline gap-3">
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
        </div>
        {link.description && (
          <p className="text-3xl font-semibold">
            {link.description}
          </p>
        )}
        <div className="flex gap-3">
          <ClickStats
            clicksTotal={link.stats.clicksTotal}
          />
          <VoteButton link={link} up={true} />
          <VoteButton link={link} up={false} />
        </div>
      </div>
    </Button>
  )
}
