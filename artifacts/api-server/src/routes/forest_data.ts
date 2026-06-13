import { Router } from "express";
import { db, forestDataTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router = Router();

router.get("/forest-data", async (req, res) => {
  const { limit = "30" } = req.query as Record<string, string>;
  const results = await db.select().from(forestDataTable).orderBy(desc(forestDataTable.forestAreaMha)).limit(Math.min(parseInt(limit), 100));
  res.json(results);
});

export default router;
