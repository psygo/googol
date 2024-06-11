"use client"

import { useRouter } from "next/navigation"

import { MousePointer } from "lucide-react"

import { type SelectLinkWithStats } from "@types"

import { postClick } from "@actions"

import { Badge, Button } from "@shad"

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
      className="flex h-max cursor-pointer items-start rounded-md border-2 bg-gray-900 px-4 py-3 pb-4"
      onClick={async () => {
        await postClick(link.nanoId)
        router.push(link.url)
      }}
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
          <Badge
            className="flex w-max gap-1 border-2 border-gray-500 bg-gray-900 px-3 text-base"
            variant="outline"
          >
            <MousePointer className="h-[21px] w-[21px]" />
            {link.stats.clicksTotal}
          </Badge>
          <VoteButton link={link} up={true} />
          <VoteButton link={link} up={false} />
        </div>
      </div>
    </Button>
  )
}
