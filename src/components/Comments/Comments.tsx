import { type SelectCommentWithCommenter } from "@types"

import { Comment } from "./Comment"

type CommentsProps = {
  comments: SelectCommentWithCommenter[]
}

export function Comments({ comments }: CommentsProps) {
  return (
    <div className="flex flex-col gap-3">
      {comments.map((c) => (
        <Comment key={c.nanoId} comment={c} />
      ))}
    </div>
  )
}
