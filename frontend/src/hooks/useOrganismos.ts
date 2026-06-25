import { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { OrganismoService } from '../services/organismo.service';
import { MaestrosService } from '../services/maestros.service';
import type { MaestroItem } from './useMaestros';

export interface Organismo {
  id: number;
  codigo: string;
  nombre: string;
  idCiudad: number;
  idFuero: number;
  ciudad?: string; 
  fuero?: string;  
}

export const useOrganismos = () => {
  const [organismos, setOrganismos] = useState<Organismo[]>([]);
  const [ciudades, setCiudades] = useState<MaestroItem[]>([]);
  const [fueros, setFueros] = useState<MaestroItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [form] = Form.useForm<Organismo>();

  const fetchData = async () => {    
    setLoading(true);
    try {
      const [resOrg, resCiu, resFue] = await Promise.all([
        OrganismoService.getAll(),
        MaestrosService.getCiudades(),
        MaestrosService.getFueros()
      ]);
      setOrganismos(resOrg);
      setCiudades(resCiu);
      setFueros(resFue);
    } catch (error) {
      message.error('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (record: Organismo) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await OrganismoService.delete(id);
      message.success('Organismo eliminado correctamente');
      fetchData();
    } catch (error) {
      message.error('Error al eliminar');
    }
  };

  const handleSubmit = async (values: Organismo) => {
    try {
      if (editingId) {
        await OrganismoService.update(editingId, values);
        message.success('Organismo actualizado con éxito');
      } else {
        await OrganismoService.create(values);
        message.success('Organismo creado con éxito');
      }
      closeModal();
      fetchData();
    } catch (error: any) {
      message.error(error.response?.data?.error || 'Error al procesar la solicitud');
    }
  };

  const openAltaModal = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingId(null);
  };

  const idCiudad = Form.useWatch('idCiudad', form);
  const idFuero = Form.useWatch('idFuero', form);

  useEffect(() => {
    if (idCiudad && idFuero) {
      const ciudad = ciudades.find(c => Number(c.id) === Number(idCiudad));
      const fuero = fueros.find(f => Number(f.id) === Number(idFuero));
      
      if (ciudad && fuero) {        
        form.setFieldsValue({ codigo: `J${ciudad.codigo}${fuero.codigo}` });
      }
    }
  }, [idCiudad, idFuero, ciudades, fueros, form]);

  return {
    organismos,
    ciudades,
    fueros,
    loading,
    isModalOpen,
    editingId,
    form,
    openAltaModal,
    closeModal,
    handleEditClick,
    handleDelete,
    handleSubmit
  };
};