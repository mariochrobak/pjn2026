import { Router } from 'express';
import { getCiudades, createCiudad, getFueros, createFuero } from '../controllers/maestros.controller';

const router = Router();

router.get('/ciudades', getCiudades);
router.post('/ciudades', createCiudad);

router.get('/fueros', getFueros);
router.post('/fueros', createFuero);

export default router;