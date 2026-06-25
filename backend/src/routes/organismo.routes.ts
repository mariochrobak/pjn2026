import { Router } from 'express';
import { getOrganismos, createOrganismo, updateOrganismo, deleteOrganismo } from '../controllers/organismo.controller';

const router = Router();

router.get('/', getOrganismos);
router.post('/', createOrganismo);
router.put('/:codigo', updateOrganismo);   
router.delete('/:codigo', deleteOrganismo);

export default router;