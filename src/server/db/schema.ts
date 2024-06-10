import { relations, sql } from "drizzle-orm"
import {
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

import { standardNanoid } from "./nanoid"

export const createTable = pgTableCreator(
  (name) => `googol_${name}`,
)

function idCols() {
  return {
    id: serial("id").primaryKey(),
    nanoId: varchar("nano_id", { length: 256 })
      .unique()
      .notNull()
      .$defaultFn(() => standardNanoid()),
  }
}

function dateTimeCols() {
  return {
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
}

function imageUrlCol() {
  return {
    imageUrl: varchar("image_url", { length: 1024 }),
  }
}

export const users = createTable(
  "users",
  {
    // IDs
    ...idCols(),
    clerkId: varchar("clerk_id", { length: 256 })
      .unique()
      .notNull(),
    username: varchar("username", { length: 256 })
      .unique()
      .notNull(),
    email: varchar("email", { length: 256 })
      .unique()
      .notNull(),
    // DB Metadata
    ...dateTimeCols(),
    // Data
    firstName: varchar("first_name", { length: 256 }),
    lastName: varchar("last_name", { length: 256 }),
    ...imageUrlCol(),
  },
  (table) => ({
    usersNanoidIdx: index("users_nano_id_idx").on(
      table.nanoId,
    ),
    usernameIdx: index("username_idx").on(table.username),
    clerkIdIdx: index("clerk_id_idx").on(table.clerkId),
  }),
)

export const usersRelations = relations(
  users,
  ({ many }) => ({
    links: many(links),
    votes: many(votes),
    // comments: many(comments),
  }),
)

export const links = createTable(
  "links",
  {
    // IDs
    ...idCols(),
    // DB Metadata
    ...dateTimeCols(),
    // Data
    link: varchar("first_name", { length: 4096 }),
    clicks: integer("clicks"),
    // Relationships
    creatorId: integer("creator_id").notNull(),
  },
  (table) => ({
    linksNanoidIdx: index("links_nano_id_idx").on(
      table.nanoId,
    ),
    linksCreatedAtIdx: index("links_created_at_idx").on(
      table.createdAt,
    ),
    linksUpdatedAtIdx: index("links_updated_at_idx").on(
      table.updatedAt,
    ),
  }),
)

export const linksRelations = relations(
  links,
  ({ one }) => ({
    creator: one(users, {
      fields: [links.creatorId],
      references: [users.id],
    }),
  }),
)

export const votes = createTable("votes", {
  // IDs
  ...idCols(),
  // Metadata
  ...dateTimeCols(),
  // Data
  points: integer("points").notNull(),
  // Relationships
  voterId: integer("voter_id").notNull(),
  linkId: varchar("link_id"),
})

export const votesRelations = relations(
  votes,
  ({ one }) => ({
    creator: one(users, {
      fields: [votes.voterId],
      references: [users.id],
    }),
    link: one(links, {
      fields: [votes.linkId],
      references: [links.id],
    }),
  }),
)

export const comments = createTable("comments", {
  // IDs
  ...idCols(),
  // Metadata
  ...dateTimeCols(),
  // Data
  content: varchar("content", { length: 4096 }).notNull(),
  // Relationships
  commenterId: integer("commenter_id").notNull(),
  linkId: varchar("link_id"),
})

export const commentsRelations = relations(
  comments,
  ({ one }) => ({
    creator: one(users, {
      fields: [comments.commenterId],
      references: [users.id],
    }),
    node: one(links, {
      fields: [comments.linkId],
      references: [links.id],
    }),
  }),
)
