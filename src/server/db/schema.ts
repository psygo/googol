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
import {
  MAX_COMMENT_LENGTH,
  MAX_CONTENT_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
} from "./settings"

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
    imageUrl: varchar("image_url", { length: 1_024 }),
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
    clicks: many(clicks),
    votes: many(votes),
    comments: many(comments),
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
    url: varchar("url", { length: 2_048 }).notNull(),
    title: varchar("title", { length: MAX_TITLE_LENGTH }),
    description: varchar("description", {
      length: MAX_DESCRIPTION_LENGTH,
    }),
    content: varchar("content", {
      length: MAX_CONTENT_LENGTH,
    }),
    // Relationships
    creatorId: varchar("creator_id").notNull(),
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
    linksUrlIdx: index("links_url_idx").on(table.url),
  }),
)

export const linksRelations = relations(
  links,
  ({ one }) => ({
    creator: one(users, {
      fields: [links.creatorId],
      references: [users.clerkId],
    }),
  }),
)

export const clicks = createTable("clicks", {
  // IDs
  id: serial("id").primaryKey(),
  // Metadata
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  // Relationships
  clickerId: varchar("clicker_id"),
  linkId: varchar("link_id").notNull(),
})

export const clicksRelations = relations(
  clicks,
  ({ one }) => ({
    voter: one(users, {
      fields: [clicks.clickerId],
      references: [users.clerkId],
    }),
    link: one(links, {
      fields: [clicks.linkId],
      references: [links.nanoId],
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
  voterId: varchar("voter_id").notNull(),
  linkId: varchar("link_id").notNull(),
})

export const votesRelations = relations(
  votes,
  ({ one }) => ({
    voter: one(users, {
      fields: [votes.voterId],
      references: [users.clerkId],
    }),
    link: one(links, {
      fields: [votes.linkId],
      references: [links.nanoId],
    }),
  }),
)

export const comments = createTable("comments", {
  // IDs
  ...idCols(),
  // Metadata
  ...dateTimeCols(),
  // Data
  content: varchar("content", {
    length: MAX_COMMENT_LENGTH,
  }).notNull(),
  // Relationships
  commenterId: varchar("commenter_id").notNull(),
  linkId: varchar("link_id"),
})

export const commentsRelations = relations(
  comments,
  ({ one }) => ({
    commenter: one(users, {
      fields: [comments.commenterId],
      references: [users.clerkId],
    }),
    node: one(links, {
      fields: [comments.linkId],
      references: [links.id],
    }),
  }),
)
