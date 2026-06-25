import { api } from './api';

export const PersonaService = {
  getAll: async () => (await api.get('/personas')).data,
  create: async (data: any) => (await api.post('/personas', data)).data,
  update: async (dni: string, data: any) => (await api.put(`/personas/${dni}`, data)).data,
  delete: async (dni: string) => (await api.delete(`/personas/${dni}`)).data,
  getExpedientes: async (dni: string) => (await api.get(`/personas/${dni}/expedientes`)).data,
};