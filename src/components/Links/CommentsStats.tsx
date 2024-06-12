import { MessageCircle } from "lucide-react"

import { Button } from "@shad"

type CommentsStatsProps = {
  commentsTotal: number
}

export function CommentsStats({
  commentsTotal,
}: CommentsStatsProps) {
  return (
    <Button
      className="flex cursor-auto gap-2 rounded-full border-gray-300 py-1"
      variant="outline"
      onClick={(e) => e.stopPropagation()}
    >
      <MessageCircle className="h-5 w-5" />
      <p className="text-base">{commentsTotal}</p>
    </Button>
  )
}
