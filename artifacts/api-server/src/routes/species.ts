import { Router } from "express";
import { db, animalSpeciesTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";

const router = Router();

router.get("/species", async (req, res) => {
  const { status, limit = "30" } = req.query as Record<string, string>;
  if (status) {
    const results = await db.select().from(animalSpeciesTable).where(eq(animalSpeciesTable.status, status)).orderBy(desc(animalSpeciesTable.createdAt)).limit(Math.min(parseInt(limit), 100));
    return res.json(results);
  }
  const results = await db.select().from(animalSpeciesTable).orderBy(desc(animalSpeciesTable.createdAt)).limit(Math.min(parseInt(limit), 100));
  res.json(results);
});

export default router;
