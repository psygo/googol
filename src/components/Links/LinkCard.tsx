"use client"

import { ArrowDown, ArrowUp } from "lucide-react"

import { type SelectLinkWithVoteStats } from "@types"

import { postClick, postVote } from "@actions"

import { cn } from "@styles"

import { Badge, Button } from "@shad"

type LinkCardProps = {
  link: SelectLinkWithVoteStats
}

export function LinkCard({ link }: LinkCardProps) {
  return (
    <Button
      variant="ghost"
      asChild
      className="flex h-max items-start rounded-md border-2 bg-gray-900 px-4 py-3 pb-4"
      onClick={async () => await postClick(link.nanoId)}
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
          >
            {link.url}
          </a>
        </div>
        <div className="flex gap-3">
          <Badge
            className="w-max border-2 border-gray-500 bg-gray-900 px-3 text-base"
            variant="outline"
          >
            {link.clicks} Click
            {link.clicks === 1 ? "" : "s"}
          </Badge>
          <VoteButton link={link} up={true} />
          <VoteButton link={link} up={false} />
        </div>
      </div>
    </Button>
  )
}

type VoteButtonProps = LinkCardProps & {
  up: boolean
}

export function VoteButton({ link, up }: VoteButtonProps) {
  return (
    <Button
      className={cn(
        "flex gap-2 rounded-full py-1",
        `border-${up ? "green" : "red"}-400`,
      )}
      variant="outline"
      onClick={async () => await postVote(link.nanoId, up)}
    >
      {up ? (
        <ArrowUp className="h-5 w-5 text-green-400" />
      ) : (
        <ArrowDown className="h-5 w-5 text-red-400" />
      )}
      <p
        className={cn(
          "text-lg",
          `text-${up ? "green" : "red"}-400`,
        )}
      >
        {up
          ? link.stats.positiveVoteTotal
          : link.stats.negativeVoteTotal}
      </p>
    </Button>
  )
}
