import { type SelectLink } from "@types"

type LinkCardProps = {
  link: SelectLink
}

export function LinkCard({ link }: LinkCardProps) {
  return (
    <div className="flex h-max flex-col rounded-md border-2 border-gray-400 px-3 py-2">
      <a href={link.link}>{link.link}</a>
    </div>
  )
}
