import { Router } from "express";
import { db } from "@workspace/db";
import { reportsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { CreateReportBody, ListReportsQueryParams } from "@workspace/api-zod";

const router = Router();

router.get("/reports/recent", async (req, res) => {
  const reports = await db
    .select()
    .from(reportsTable)
    .orderBy(desc(reportsTable.createdAt))
    .limit(6);
  res.json(reports);
});

router.get("/reports", async (req, res) => {
  const parsed = ListReportsQueryParams.safeParse(req.query);
  const params = parsed.success ? parsed.data : {};

  let query = db.select().from(reportsTable).$dynamic();

  if (params.type) {
    query = query.where(eq(reportsTable.type, params.type));
  }
  if (params.status) {
    query = query.where(eq(reportsTable.status, params.status));
  }

  const reports = await query
    .orderBy(desc(reportsTable.createdAt))
    .limit(params.limit ?? 20);

  res.json(reports);
});

router.post("/reports", async (req, res) => {
  const parsed = CreateReportBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
  }

  const [report] = await db.insert(reportsTable).values(parsed.data).returning();
  res.status(201).json(report);
});

export default router;
