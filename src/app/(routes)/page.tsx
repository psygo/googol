import { z } from "zod"

import { getLinks } from "@actions"

import { LinkList } from "@components"

type HomePageProps = {
  searchParams: Record<string, string>
}

const homePageSearchParamsSchema = z.object({
  search: z.string().default(""),
})

export default async function HomePage({
  searchParams,
}: HomePageProps) {
  const { search } =
    homePageSearchParamsSchema.parse(searchParams)

  const fetchedLinks = await getLinks(search)

  if (!fetchedLinks) return

  return <LinkList links={fetchedLinks} />
}
