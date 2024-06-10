import { getLinks } from "@actions"

import { LinkList } from "@components"

export default async function HomePage() {
  const fetchedLinks = await getLinks()

  if (!fetchedLinks) return

  return <LinkList links={fetchedLinks} />
}
