import { getComments, getLink } from "@actions"

import { Comments, LinkCard, NewComment } from "@components"

type LinkPageProps = {
  params: { link_id: string }
}

export default async function LinkPage({
  params,
}: LinkPageProps) {
  const link = await getLink(params.link_id)
  const comments = await getComments(params.link_id)

  if (!link) return

  return (
    <div className="flex flex-col gap-6">
      <LinkCard link={link} />
      <NewComment />
      {comments && <Comments comments={comments} />}
    </div>
  )
}
