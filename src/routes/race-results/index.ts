import { Router } from 'express';

import { getRaceResults } from 'controllers/race-results/get';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Archive year data
 *   description: API to extract data from formula1.com
 * /years/{year}/{filter}:
 *   get:
 *     summary: Create a new book
 *     tags: [Books]
 *     parameters:
 *       - name: year
 *         in: path
 *         description: The year to retrieve data for (between 1980 and 2023)
 *         required: true
 *         type: integer
 *         minimum: 1980
 *         maximum: 2023
 *       - name: filter
 *         in: path
 *         description: The filter to apply (races, drivers, teams)
 *         required: true
 *         type: string
 *         enum:
 *          - races
 *          - drivers
 *          - teams
 *       - name: code
 *         in: query
 *         description: The query parameter code
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *
 */
router.get('/:year/:filter', getRaceResults);

export default router;
