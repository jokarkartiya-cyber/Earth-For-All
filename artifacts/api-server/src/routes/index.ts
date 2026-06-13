import { Router, type IRouter } from "express";
import healthRouter from "./health";
import ideasRouter from "./ideas";
import reportsRouter from "./reports";
import articlesRouter from "./articles";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(ideasRouter);
router.use(reportsRouter);
router.use(articlesRouter);
router.use(statsRouter);

export default router;
