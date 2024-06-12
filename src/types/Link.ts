import {
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm"

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { links } from "@db"

import { type WithClickStats } from "./Click"
import { type WithCommentsStats } from "./Comment"
import { type SelectUser } from "./User"
import { type WithVoteStats } from "./Vote"

export type SelectLink = InferSelectModel<typeof links>
export type InsertLink = InferInsertModel<typeof links>

export type SelectLinkWithStatsAndCreator = SelectLink & {
  stats: WithVoteStats & WithClickStats & WithCommentsStats
} & {
  creator: SelectUser
}
