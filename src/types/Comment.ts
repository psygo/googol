import {
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm"

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { comments } from "@db"

import { type SelectUser } from "./User"

export type SelectComment = InferSelectModel<
  typeof comments
>
export type InsertComment = InferInsertModel<
  typeof comments
>

export type SelectCommentWithCommenter = SelectComment & {
  commenter: SelectUser
}
