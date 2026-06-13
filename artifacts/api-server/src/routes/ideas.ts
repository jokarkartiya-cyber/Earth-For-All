import { Router } from "express";
import { db } from "@workspace/db";
import { ideasTable } from "@workspace/db";
import { eq, desc, sql } from "drizzle-orm";
import { CreateIdeaBody, UpvoteIdeaParams, ListIdeasQueryParams } from "@workspace/api-zod";

const router = Router();

router.get("/ideas/recent", async (req, res) => {
  const ideas = await db
    .select()
    .from(ideasTable)
    .orderBy(desc(ideasTable.createdAt))
    .limit(6);
  res.json(ideas);
});

router.get("/ideas", async (req, res) => {
  const parsed = ListIdeasQueryParams.safeParse(req.query);
  const params = parsed.success ? parsed.data : {};

  let query = db.select().from(ideasTable).$dynamic();

  if (params.category) {
    query = query.where(eq(ideasTable.category, params.category));
  }

  const ideas = await query
    .orderBy(desc(ideasTable.upvotes), desc(ideasTable.createdAt))
    .limit(params.limit ?? 20);

  res.json(ideas);
});

router.post("/ideas", async (req, res) => {
  const parsed = CreateIdeaBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
  }

  const [idea] = await db.insert(ideasTable).values(parsed.data).returning();
  res.status(201).json(idea);
});

router.post("/ideas/:id/upvote", async (req, res) => {
  const parsed = UpvoteIdeaParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const [idea] = await db
    .update(ideasTable)
    .set({ upvotes: sql`${ideasTable.upvotes} + 1` })
    .where(eq(ideasTable.id, parsed.data.id))
    .returning();

  if (!idea) {
    return res.status(404).json({ error: "Idea not found" });
  }

  res.json(idea);
});

export default router;
