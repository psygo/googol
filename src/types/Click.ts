import {
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm"

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { clicks } from "@db"

export type WithClickStats = {
  clicksTotal: number
}

export type SelectUser = InferSelectModel<typeof clicks>
export type InsertUser = InferInsertModel<typeof clicks>
