import { Router } from 'express';
import { 
  getPersonas, 
  createPersona, 
  updatePersona, 
  deletePersona,
  getExpedientesPorPersona 
} from '../controllers/persona.controller';

const router = Router();


router.get('/', getPersonas);
router.post('/', createPersona);
router.put('/:id', updatePersona);     
router.delete('/:id', deletePersona);   
router.get('/:id/expedientes', getExpedientesPorPersona); 

export default router;