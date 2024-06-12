import {
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm"

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { votes } from "@db"

export type WithVoteStats = {
  positiveVoteTotal: number
  negativeVoteTotal: number
}

export type SelectVote = InferSelectModel<typeof votes>
export type InsertVote = InferInsertModel<typeof votes>
