"use client"

import { type SelectLink } from "@types"

import { postClick } from "@actions"

import { Badge, Button } from "@shad"

type LinkCardProps = {
  link: SelectLink
}

export function LinkCard({ link }: LinkCardProps) {
  return (
    <Button
      variant="ghost"
      className="flex h-max flex-col items-start gap-2 rounded-md border-2 border-gray-400 px-4 py-3 pb-4"
      onClick={async () => await postClick(link.nanoId)}
    >
      <div className="flex items-baseline gap-2">
        {link.title && (
          <h3 className="text-2xl font-semibold">
            {link.title}
          </h3>
        )}
        <a
          href={link.url}
          className="text-blue-300 underline"
        >
          {link.url}
        </a>
      </div>
      <Badge className="w-max" variant="secondary">
        {link.clicks} Click{link.clicks === 1 ? "" : "s"}
      </Badge>
    </Button>
  )
}
