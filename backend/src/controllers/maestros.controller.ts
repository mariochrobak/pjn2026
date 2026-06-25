import { Request, Response } from 'express';
import { Ciudad, Fuero } from '../database/db';


// Ciudades

export const getCiudades = async (_req: Request, res: Response): Promise<any> => {
  try {
    const ciudades = await Ciudad.findAll({ order: [['nombre', 'ASC']] });
    return res.json(ciudades);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createCiudad = async (req: Request, res: Response): Promise<any> => {
  try {
    const nueva = await Ciudad.create(req.body);
    return res.status(201).json(nueva);
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'La ciudad ya se encuentra registrada.' });
    }
    return res.status(500).json({ error: error.message });
  }
};

// Fueros
export const getFueros = async (_req: Request, res: Response): Promise<any> => {
  try {
    const fueros = await Fuero.findAll({ order: [['nombre', 'ASC']] });
    return res.json(fueros);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createFuero = async (req: Request, res: Response): Promise<any> => {
  try {
    const nuevo = await Fuero.create(req.body);
    return res.status(201).json(nuevo);
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El fuero ya se encuentra registrado.' });
    }
    return res.status(500).json({ error: error.message });
  }
};