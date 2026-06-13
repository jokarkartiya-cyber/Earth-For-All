import { Router } from "express";
import { db, discussionsTable, insertDiscussionSchema } from "@workspace/db";
import { desc, eq, sql } from "drizzle-orm";

const router = Router();

router.get("/discussions", async (req, res) => {
  const { category, limit = "20" } = req.query as Record<string, string>;
  const query = db.select().from(discussionsTable).orderBy(desc(discussionsTable.upvotes), desc(discussionsTable.createdAt)).limit(Math.min(parseInt(limit), 100));
  if (category) {
    const results = await db.select().from(discussionsTable).where(eq(discussionsTable.category, category)).orderBy(desc(discussionsTable.upvotes), desc(discussionsTable.createdAt)).limit(Math.min(parseInt(limit), 100));
    return res.json(results);
  }
  const results = await query;
  res.json(results);
});

router.post("/discussions", async (req, res) => {
  const parsed = insertDiscussionSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
  const [created] = await db.insert(discussionsTable).values(parsed.data).returning();
  res.status(201).json(created);
});

router.post("/discussions/:id/upvote", async (req, res) => {
  const id = parseInt(req.params.id);
  const [updated] = await db.update(discussionsTable).set({ upvotes: sql`${discussionsTable.upvotes} + 1` }).where(eq(discussionsTable.id, id)).returning();
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

export default router;
