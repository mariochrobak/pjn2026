import { api } from './api';

export const ExpedienteService = {
  getAll: async () => (await api.get('/expedientes')).data,
  create: async (data: any) => (await api.post('/expedientes', data)).data,
  update: async (id: number, data: any) => (await api.put(`/expedientes/${id}`, data)).data,
  delete: async (id: number) => (await api.delete(`/expedientes/${id}`)).data,
  getPersonas: async (id: number) => (await api.get(`/expedientes/${id}/personas`)).data,
};