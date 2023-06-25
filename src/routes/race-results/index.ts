import { Router } from 'express';

import { getRaceResults } from 'controllers/race-results/get';

const router = Router();

router.get('/:year/:filter', getRaceResults);

export default router;
