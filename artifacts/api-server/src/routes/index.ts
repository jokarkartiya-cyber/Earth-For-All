import { Router, type IRouter } from "express";
import healthRouter from "./health";
import ideasRouter from "./ideas";
import reportsRouter from "./reports";
import articlesRouter from "./articles";
import statsRouter from "./stats";
import discussionsRouter from "./discussions";
import airQualityRouter from "./air_quality";
import speciesRouter from "./species";
import forestDataRouter from "./forest_data";

const router: IRouter = Router();

router.use(healthRouter);
router.use(ideasRouter);
router.use(reportsRouter);
router.use(articlesRouter);
router.use(statsRouter);
router.use(discussionsRouter);
router.use(airQualityRouter);
router.use(speciesRouter);
router.use(forestDataRouter);

export default router;
