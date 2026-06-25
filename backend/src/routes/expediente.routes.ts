import { Router } from 'express';
import { 
  getExpedientes, 
  createExpediente, 
  updateExpediente, 
  deleteExpediente,
  getPersonasPorExpediente 
} from '../controllers/expediente.controller';

const router = Router();

router.get('/', getExpedientes);
router.post('/', createExpediente);
router.put('/:id', updateExpediente);    
router.delete('/:id', deleteExpediente);   
router.get('/:id/personas', getPersonasPorExpediente); 

export default router;