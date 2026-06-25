import { api } from './api';

export const OrganismoService = {
  getAll: async () => (await api.get('/organismos')).data,
  create: async (data: unknown) => (await api.post('/organismos', data)).data,
  update: async (id: number, data: unknown) => (await api.put(`/organismos/${id}`, data)).data,
  delete: async (id: number) => (await api.delete(`/organismos/${id}`)).data,
}; 