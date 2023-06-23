import { Router } from 'express';

import page404 from './pages/404';
import pageRoot from './pages/root';
import raceResults from './race-results/';

const router = Router();

router.use(`/race-results`, raceResults);

router.use(pageRoot);
router.use(page404);

export default router;
