import {
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm"

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { links } from "@db"

import { type WithVoteStats } from "./Vote"

export type SelectLink = InferSelectModel<typeof links>
export type InsertLink = InferInsertModel<typeof links>

export type SelectLinkWithVoteStats = SelectLink & {
  stats: WithVoteStats
}
