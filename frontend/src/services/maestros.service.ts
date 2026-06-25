import { api } from './api';
import type { MaestroItem } from '../hooks/useMaestros';


export interface CreateMaestroDTO {
  codigo: string;
  nombre: string;
}

export const MaestrosService = {

  getCiudades: async (): Promise<MaestroItem[]> => 
    (await api.get('/ciudades')).data,
  

  createCiudad: async (data: CreateMaestroDTO): Promise<MaestroItem> => 
    (await api.post('/ciudades', data)).data,
  

  getFueros: async (): Promise<MaestroItem[]> => 
    (await api.get('/fueros')).data,
  

  createFuero: async (data: CreateMaestroDTO): Promise<MaestroItem> => 
    (await api.post('/fueros', data)).data,
};