import { Router } from "express";
import { db } from "@workspace/db";
import { ideasTable, reportsTable, articlesTable } from "@workspace/db";
import { sql, count } from "drizzle-orm";

const router = Router();

router.get("/stats", async (req, res) => {
  const [ideasCount] = await db.select({ count: count() }).from(ideasTable);
  const [reportsCount] = await db.select({ count: count() }).from(reportsTable);
  const [articlesCount] = await db.select({ count: count() }).from(articlesTable);

  const ideasByCategory = await db
    .select({
      category: ideasTable.category,
      count: count(),
    })
    .from(ideasTable)
    .groupBy(ideasTable.category);

  const reportsByType = await db
    .select({
      category: reportsTable.type,
      count: count(),
    })
    .from(reportsTable)
    .groupBy(reportsTable.type);

  res.json({
    totalIdeas: ideasCount?.count ?? 0,
    totalReports: reportsCount?.count ?? 0,
    totalArticles: articlesCount?.count ?? 0,
    ideasByCategory: ideasByCategory.map((r) => ({ category: r.category, count: Number(r.count) })),
    reportsByType: reportsByType.map((r) => ({ category: r.category, count: Number(r.count) })),
  });
});

export default router;
