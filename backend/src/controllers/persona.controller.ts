import { Request, Response } from 'express';
import { Persona, Expediente, ExpedientePersona, Organismo } from '../database/db';

export const getPersonas = async (_req: Request, res: Response): Promise<any> => {
  try {
    const personas = await Persona.findAll();
    return res.json(personas);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createPersona = async (req: Request, res: Response): Promise<any> => {
  try {
    const nueva = await Persona.create(req.body);
    return res.status(201).json(nueva);
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El DNI ingresado ya pertenece a otra persona.' });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const updatePersona = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params; 
    const [updated] = await Persona.update(req.body, { where: { id } });
    
    if (!updated) return res.status(404).json({ error: 'Persona no encontrada' });
    return res.json({ message: 'Datos de la persona modificados con éxito' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletePersona = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const deleted = await Persona.destroy({ where: { id } });
    
    if (!deleted) return res.status(404).json({ error: 'Persona no encontrada' });
    return res.json({ message: 'Persona dada de baja correctamente' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getExpedientesPorPersona = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const vinculos = await ExpedientePersona.findAll({
      where: { idPersona: id },
      include: [{ 
        model: Expediente,        
        include: [{ model: Organismo, attributes: ['codigo'] }] 
      }]
    });

    const roles = ['ACTOR', 'DEMANDADO', 'CONDENADO', 'VICTIMA'];
    const resultado = vinculos.map((v: any) => ({
      id: v.Expediente.id,
      idOrganismo: v.Expediente.idOrganismo,
      codigoOrganismo: v.Expediente.Organismo?.codigo || 'S/C', 
      tipo: v.Expediente.tipo,
      numero: v.Expediente.numero,
      anio: v.Expediente.anio,
      caratula: v.Expediente.caratula,
      rolEnExpediente: roles[v.idVinculo - 1] || 'INTERVINIENTE'
    }));

    return res.json(resultado);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};