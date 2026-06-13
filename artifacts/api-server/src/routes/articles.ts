import { Router } from "express";
import { db } from "@workspace/db";
import { articlesTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { GetArticleParams, ListArticlesQueryParams } from "@workspace/api-zod";

const router = Router();

router.get("/articles", async (req, res) => {
  const parsed = ListArticlesQueryParams.safeParse(req.query);
  const params = parsed.success ? parsed.data : {};

  let query = db.select().from(articlesTable).$dynamic();

  if (params.category) {
    query = query.where(eq(articlesTable.category, params.category));
  }

  const articles = await query
    .orderBy(desc(articlesTable.createdAt))
    .limit(params.limit ?? 10);

  res.json(articles);
});

router.get("/articles/:id", async (req, res) => {
  const parsed = GetArticleParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const [article] = await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.id, parsed.data.id));

  if (!article) {
    return res.status(404).json({ error: "Article not found" });
  }

  res.json(article);
});

export default router;
