import { type SelectUser } from "@types"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from "@shad"

type CreatorProps = {
  creator: SelectUser
}

export function Creator({ creator }: CreatorProps) {
  return (
    <Button
      className="flex cursor-auto items-center gap-2 rounded-full border-gray-300 py-1"
      variant="outline"
      onClick={(e) => e.stopPropagation()}
    >
      <Avatar>
        {creator.imageUrl && (
          <AvatarImage
            src={creator.imageUrl}
            alt={creator.username}
          />
        )}
        <AvatarFallback>
          {creator.username[0]}
        </AvatarFallback>
      </Avatar>
      <p className="text-base">{creator.username}</p>
    </Button>
  )
}
