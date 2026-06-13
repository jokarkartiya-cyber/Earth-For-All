import { pgTable, serial, text, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const airQualityTable = pgTable("air_quality", {
  id: serial("id").primaryKey(),
  city: text("city").notNull(),
  country: text("country").notNull().default("India"),
  aqi: integer("aqi").notNull(),
  pm25: real("pm25"),
  pm10: real("pm10"),
  no2: real("no2"),
  o3: real("o3"),
  status: text("status").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertAirQualitySchema = createInsertSchema(airQualityTable).omit({ id: true, updatedAt: true });
export type InsertAirQuality = z.infer<typeof insertAirQualitySchema>;
export type AirQuality = typeof airQualityTable.$inferSelect;
