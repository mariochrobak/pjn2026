import { Request, Response } from 'express';
import { Expediente, Organismo, Ciudad, Fuero, sequelize } from '../database/db';

export const getEstadisticas = async (_req: Request, res: Response): Promise<any> => {
  try {
    
    const totalExpedientes = await Expediente.count();


    const porCiudad = await Expediente.findAll({
      attributes: [
        [sequelize.literal('`Organismo->Ciudad`.`nombre`'), 'ciudad'],
        [sequelize.fn('COUNT', sequelize.col('Expediente.id')), 'cantidad']
      ],
      include: [{
        model: Organismo,
        attributes: [],
        include: [{ model: Ciudad, attributes: [] }]
      }],
      group: [sequelize.literal('`Organismo->Ciudad`.`nombre`') as any],
      raw: true
    });



    const porFuero = await Expediente.findAll({
      attributes: [
        [sequelize.literal('`Organismo->Fuero`.`nombre`'), 'fuero'],
        [sequelize.fn('COUNT', sequelize.col('Expediente.id')), 'cantidad']
      ],
      include: [{
        model: Organismo,
        attributes: [],
        include: [{ model: Fuero, attributes: [] }]
      }],
      group: [sequelize.literal('`Organismo->Fuero`.`nombre`') as any],
      raw: true
    });



    const porAnio = await Expediente.findAll({
      attributes: [
        ['anio', 'anio'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'cantidad']
      ],
      group: ['anio'],
      order: [['anio', 'ASC']],
      raw: true
    });


    return res.json({
      totalExpedientes,
      porCiudad,
      porFuero,
      porAnio 
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};