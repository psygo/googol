"use client"

import { useState } from "react"

import { ArrowDown, ArrowUp } from "lucide-react"

import { type SelectLinkWithStats } from "@types"

import { postVote } from "@actions"

import { cn } from "@styles"

import { Button } from "@shad"

type LinkCardProps = {
  link: SelectLinkWithStats
}

type VoteButtonProps = LinkCardProps & {
  up: boolean
}

export function VoteButton({ link, up }: VoteButtonProps) {
  const [voteTotal, setVoteTotal] = useState(
    up
      ? link.stats.positiveVoteTotal
      : link.stats.negativeVoteTotal,
  )

  async function vote() {
    await postVote(link.nanoId, up)
    setVoteTotal(up ? voteTotal + 1 : voteTotal - 1)
  }

  return (
    <Button
      className={cn(
        "flex gap-2 rounded-full py-1",
        `border-${up ? "green" : "red"}-400`,
      )}
      variant="outline"
      onClick={async (e) => {
        e.stopPropagation()
        await vote()
      }}
    >
      {up ? (
        <ArrowUp className="h-5 w-5 text-green-400" />
      ) : (
        <ArrowDown className="h-5 w-5 text-red-400" />
      )}
      <p
        className={cn(
          "text-base",
          `text-${up ? "green" : "red"}-400`,
        )}
      >
        {voteTotal}
      </p>
    </Button>
  )
}
