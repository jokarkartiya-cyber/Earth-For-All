import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const animalSpeciesTable = pgTable("animal_species", {
  id: serial("id").primaryKey(),
  speciesName: text("species_name").notNull(),
  scientificName: text("scientific_name"),
  status: text("status").notNull(),
  habitat: text("habitat"),
  population: text("population"),
  threats: text("threats"),
  protectionMethods: text("protection_methods"),
  country: text("country"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertAnimalSpeciesSchema = createInsertSchema(animalSpeciesTable).omit({ id: true, createdAt: true });
export type InsertAnimalSpecies = z.infer<typeof insertAnimalSpeciesSchema>;
export type AnimalSpecies = typeof animalSpeciesTable.$inferSelect;
