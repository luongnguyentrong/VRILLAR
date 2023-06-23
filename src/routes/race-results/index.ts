import { Router } from 'express';

import { login } from 'controllers/race-results/get';

const router = Router();

router.get('/', login);

export default router;
