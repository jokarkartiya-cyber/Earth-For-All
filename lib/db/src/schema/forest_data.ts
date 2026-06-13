import { pgTable, serial, text, real, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const forestDataTable = pgTable("forest_data", {
  id: serial("id").primaryKey(),
  country: text("country").notNull(),
  forestAreaMha: real("forest_area_mha").notNull(),
  forestLossMha: real("forest_loss_mha"),
  treeCanopyCover: real("tree_canopy_cover"),
  year: integer("year").notNull(),
  carbonStockMt: real("carbon_stock_mt"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertForestDataSchema = createInsertSchema(forestDataTable).omit({ id: true, createdAt: true });
export type InsertForestData = z.infer<typeof insertForestDataSchema>;
export type ForestData = typeof forestDataTable.$inferSelect;
