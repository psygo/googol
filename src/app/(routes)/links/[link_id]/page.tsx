import { getLink } from "@actions"

import { LinkCard } from "@components"

type LinkPageProps = {
  params: { link_id: string }
}

export default async function LinkPage({
  params,
}: LinkPageProps) {
  const link = await getLink(params.link_id)

  if (!link) return

  return <LinkCard link={link} />
}
