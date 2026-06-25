import { Router } from 'express';
import { getEstadisticas } from '../controllers/estadisticas.controller';

const router = Router();

router.get('/', getEstadisticas);

export default router;