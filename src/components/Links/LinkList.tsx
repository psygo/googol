import { type SelectLink } from "@types"

import { LinkCard } from "./LinkCard"

type LinkListProps = {
  links: SelectLink[]
}

export function LinkList({ links }: LinkListProps) {
  return (
    <div className="flex flex-col gap-2">
      {links.map((l) => (
        <LinkCard key={l.nanoId} link={l} />
      ))}
    </div>
  )
}
