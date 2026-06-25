import { Request, Response } from 'express';
import { Organismo, Ciudad, Fuero } from '../database/db';

export const getOrganismos = async (_req: Request, res: Response): Promise<any> => {
  try {
    const organismos = await Organismo.findAll({
      include: [
        { model: Ciudad, attributes: ['nombre'] },
        { model: Fuero, attributes: ['nombre'] }
      ]
    });

    const formateados = organismos.map((o: any) => ({
      id: o.id,
      codigo: o.codigo,
      nombre: o.nombre,
      idCiudad: o.idCiudad,
      idFuero: o.idFuero,
      ciudad: o.Ciudad?.nombre || 'Sin Ciudad',
      fuero: o.Fuero?.nombre || 'Sin Fuero'
    }));

    return res.json(formateados);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createOrganismo = async (req: Request, res: Response): Promise<any> => {
  try {
    const nuevo = await Organismo.create(req.body);
    return res.status(201).json(nuevo);
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El código de organismo ya se encuentra registrado.' });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const updateOrganismo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params; 
    const [updated] = await Organismo.update(req.body, { where: { id } });
    
    if (!updated) return res.status(404).json({ error: 'Organismo no encontrado' });
    return res.json({ message: 'Organismo actualizado correctamente' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOrganismo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const deleted = await Organismo.destroy({ where: { id } });
    
    if (!deleted) return res.status(404).json({ error: 'Organismo no encontrado' });
    return res.json({ message: 'Organismo eliminado del sistema' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};