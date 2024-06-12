import { type SelectCommentWithCommenter } from "@types"

import { Avatar, AvatarFallback, AvatarImage } from "@shad"

type CommentProps = {
  comment: SelectCommentWithCommenter
}

export function Comment({ comment }: CommentProps) {
  return (
    <div className="flex flex-col gap-3 rounded-md border-[1.5px] border-gray-500 px-4 py-2 pb-3">
      <p className="text-lg">{comment.content}</p>
      <div className="flex items-center gap-2">
        <Avatar>
          {comment.commenter.imageUrl && (
            <AvatarImage
              src={comment.commenter.imageUrl}
              alt={comment.commenter.username}
            />
          )}
          <AvatarFallback>
            {comment.commenter.username[0]}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm text-orange-500">
          {comment.commenter.username}
        </p>
        <p className="text-sm text-gray-400">
          {comment.updatedAt.toUTCString()}
        </p>
      </div>
    </div>
  )
}
