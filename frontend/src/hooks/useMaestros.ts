import { useEffect, useState } from 'react';
import { message } from 'antd';
import { MaestrosService } from '../services/maestros.service';

export interface MaestroItem {
  id: number;
  codigo: string; // <-- NUEVO
  nombre: string;
}

export const useMaestros = () => {
  const [ciudades, setCiudades] = useState<MaestroItem[]>([]);
  const [fueros, setFueros] = useState<MaestroItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMaestros = async () => {    
    setLoading(true);
    try {
      const [ciudadesData, fuerosData] = await Promise.all([
        MaestrosService.getCiudades(),
        MaestrosService.getFueros()
      ]);
      setCiudades(ciudadesData);
      setFueros(fuerosData);
    } catch (error) {
      message.error('Error al cargar las tablas paramétricas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaestros();
  }, []);

  const handleCreateCiudad = async (codigo: string, nombre: string) => {
    if (!codigo.trim() || !nombre.trim()) return;
    try {
      await MaestrosService.createCiudad({ codigo: codigo.trim().toUpperCase(), nombre: nombre.trim() });
      message.success('Ciudad registrada correctamente');
      fetchMaestros();
    } catch (error: any) {
      message.error(error.response?.data?.error || 'Error al registrar la ciudad');
    }
  };

  const handleCreateFuero = async (codigo: string, nombre: string) => {
    if (!codigo.trim() || !nombre.trim()) return;
    try {
      await MaestrosService.createFuero({ codigo: codigo.trim().toUpperCase(), nombre: nombre.trim() });
      message.success('Fuero registrado correctamente');
      fetchMaestros();
    } catch (error: any) {
      message.error(error.response?.data?.error || 'Error al registrar el fuero');
    }
  };

  return {
    ciudades,
    fueros,
    loading,
    handleCreateCiudad,
    handleCreateFuero
  };
};