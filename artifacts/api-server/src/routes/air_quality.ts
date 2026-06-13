import { Router } from "express";
import { db, airQualityTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";

const router = Router();

router.get("/air-quality", async (req, res) => {
  const { country, limit = "50" } = req.query as Record<string, string>;
  if (country) {
    const results = await db.select().from(airQualityTable).where(eq(airQualityTable.country, country)).orderBy(desc(airQualityTable.aqi)).limit(Math.min(parseInt(limit), 200));
    return res.json(results);
  }
  const results = await db.select().from(airQualityTable).orderBy(desc(airQualityTable.aqi)).limit(Math.min(parseInt(limit), 200));
  res.json(results);
});

export default router;
