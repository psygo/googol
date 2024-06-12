import { MousePointer } from "lucide-react"

import { Button } from "@shad"

type ClicksStatsProps = {
  clicksTotal: number
}

export function ClicksStats({
  clicksTotal,
}: ClicksStatsProps) {
  return (
    <Button
      className="flex cursor-auto gap-2 rounded-full border-gray-300 py-1"
      variant="outline"
      onClick={(e) => e.stopPropagation()}
    >
      <MousePointer className="h-5 w-5" />
      <p className="text-base">{clicksTotal}</p>
    </Button>
  )
}
