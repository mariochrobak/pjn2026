import { Request, Response } from 'express';
import { Expediente, Persona, ExpedientePersona, Organismo, sequelize } from '../database/db';

export const getExpedientes = async (_req: Request, res: Response): Promise<any> => {
  try {
    const expedientes = await Expediente.findAll({
      include: [{ model: Organismo, attributes: ['codigo'] }]
    });

    const formateados = expedientes.map((e: any) => ({
      id: e.id,
      idOrganismo: e.idOrganismo,
      codigoOrganismo: e.Organismo.codigo, 
      tipo: e.tipo,
      numero: e.numero,
      anio: e.anio,
      caratula: e.caratula
    }));

    return res.json(formateados);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createExpediente = async (req: Request, res: Response): Promise<any> => {
  const t = await sequelize.transaction();
  try {
    const { idOrganismo, tipo, numero, anio, caratula, involucrados } = req.body;

    const nuevoExpediente = await Expediente.create(
      { idOrganismo, tipo, numero, anio, caratula },
      { transaction: t }
    );

    if (involucrados && involucrados.length > 0) {
      const vinculos = involucrados.map((inv: any) => ({
        idExpediente: nuevoExpediente.id,
        idPersona: inv.idPersona, 
        idVinculo: inv.idVinculo
      }));
      await ExpedientePersona.bulkCreate(vinculos, { transaction: t });
    }

    await t.commit();
    return res.status(201).json(nuevoExpediente);
  } catch (error: any) {
    await t.rollback();
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Ya existe un expediente con esa misma numeración en el organismo.' });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const updateExpediente = async (req: Request, res: Response): Promise<any> => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { idOrganismo, tipo, numero, anio, caratula, involucrados } = req.body;

    await Expediente.update(
      { idOrganismo, tipo, numero, anio, caratula },
      { where: { id }, transaction: t }
    );

    await ExpedientePersona.destroy({ where: { idExpediente: id }, transaction: t });

    if (involucrados && involucrados.length > 0) {
      const vinculos = involucrados.map((inv: any) => ({
        idExpediente: Number(id),
        idPersona: inv.idPersona,
        idVinculo: inv.idVinculo
      }));
      await ExpedientePersona.bulkCreate(vinculos, { transaction: t });
    }

    await t.commit();
    return res.json({ message: 'Expediente actualizado' });
  } catch (error: any) {
    await t.rollback();
    return res.status(500).json({ error: error.message });
  }
};

export const deleteExpediente = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const deleted = await Expediente.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Expediente no encontrado' });
    return res.json({ message: 'Expediente purgado del sistema de registros' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPersonasPorExpediente = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const vinculos = await ExpedientePersona.findAll({
      where: { idExpediente: id },
      include: [{ model: Persona }]
    });

    const roles = ['ACTOR', 'DEMANDADO', 'CONDENADO', 'VICTIMA'];
    const resultado = vinculos.map((v: any) => ({
      idPersona: v.Persona.id,
      idVinculo: v.idVinculo,
      dni: v.Persona.dni,
      nombre: v.Persona.nombre,
      apellido: v.Persona.apellido,
      rolEnExpediente: roles[v.idVinculo - 1] || 'INTERVINIENTE'
    }));

    return res.json(resultado);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};