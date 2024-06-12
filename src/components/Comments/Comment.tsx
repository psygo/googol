import { type SelectCommentWithCommenter } from "@types"

type CommentProps = {
  comment: SelectCommentWithCommenter
}

export function Comment({ comment }: CommentProps) {
  return (
    <div className="rounded-md border-2 border-gray-500 p-2">
      <p>{comment.content}</p>
    </div>
  )
}
