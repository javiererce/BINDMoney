import { Router } from 'express';
import { calculateInflation, calculateLifeHours } from '../controllers/simulation.controller';

const router = Router();

router.post('/inflation', calculateInflation);
router.post('/life-hours', calculateLifeHours);

export default router;
