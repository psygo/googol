import { getLink } from "@actions"

import { LinkCard } from "@components"
import { NewComment } from "../../../../components/Comments/NewComment"

type LinkPageProps = {
  params: { link_id: string }
}

export default async function LinkPage({
  params,
}: LinkPageProps) {
  const link = await getLink(params.link_id)

  if (!link) return

  return (
    <div className="flex flex-col gap-6">
      <LinkCard link={link} />
      <NewComment />
    </div>
  )
}
