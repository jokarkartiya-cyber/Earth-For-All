import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const discussionsTable = pgTable("discussions", {
  id: serial("id").primaryKey(),
  topic: text("topic").notNull(),
  message: text("message").notNull(),
  authorName: text("author_name").notNull(),
  category: text("category").notNull(),
  upvotes: integer("upvotes").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertDiscussionSchema = createInsertSchema(discussionsTable).omit({ id: true, upvotes: true, createdAt: true });
export type InsertDiscussion = z.infer<typeof insertDiscussionSchema>;
export type Discussion = typeof discussionsTable.$inferSelect;
