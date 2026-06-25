import { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { ExpedienteService } from '../services/expediente.service';
import { OrganismoService } from '../services/organismo.service';
import { PersonaService } from '../services/persona.service';
import type { Organismo } from './useOrganismos';
import type { Persona } from './usePersonas';

export interface Expediente {
  id: number;
  codigoOrganismo: string;
  tipo: string;
  numero: number;
  anio: number;
  caratula: string;
}

export interface Interviniente {
  idPersona: number;
  dni: string;
  nombre: string;
  apellido: string;
  idVinculo: number;
  rolEnExpediente: string;
}

export interface InvolucradoForm {
  dni: string;
  idVinculo: number;
}

export interface ExpedienteFormValues {
  codigoOrganismo: string;
  tipo: string;
  numero: number;
  anio: number;
  caratula: string;
  involucrados?: InvolucradoForm[];
}



export const useExpedientes = () => {
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const [organismos, setOrganismos] = useState<Organismo[]>([]);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isPeopleModalOpen, setIsPeopleModalOpen] = useState<boolean>(false);
  
  const [selectedExpediente, setSelectedExpediente] = useState<Expediente | null>(null);
  const [intervinientes, setIntervinientes] = useState<Interviniente[]>([]);
  const [loadingPeople, setLoadingPeople] = useState<boolean>(false);

  const [form] = Form.useForm<ExpedienteFormValues>();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resExp, resOrg, resPer] = await Promise.all([
        ExpedienteService.getAll(),
        OrganismoService.getAll(),
        PersonaService.getAll()
      ]);
      setExpedientes(resExp);
      setOrganismos(resOrg);
      setPersonas(resPer);
    } catch (error) {
      message.error('Error al cargar los datos del sistema');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = async (record: Expediente) => {
    setEditingId(record.id);
    setLoading(true);
    try {
      const data = await ExpedienteService.getPersonas(record.id);
      const involucradosFormateados = data.map((p: Interviniente) => (
        { 
        idPersona: p.idPersona,               
        dni: p.dni,
        idVinculo: p.idVinculo
      }));

      form.setFieldsValue({
        ...record,
        involucrados: involucradosFormateados
      });
      setIsCreateModalOpen(true);
    } catch (error) {
      message.error('Error al recuperar la nómina de la causa');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpediente = async (id: number) => {
    try {
      await ExpedienteService.delete(id);
      message.success('Expediente eliminado del registro');
      fetchData();
    } catch (error) {
      message.error('Error al eliminar el expediente');
    }
  };

  const handleSubmitExpediente = async (values: ExpedienteFormValues) => {
    const involucrados = values.involucrados || [];
    const actores = involucrados.filter((p) => p.idVinculo === 1);
    
    if (actores.length !== 1) {
      return message.error('Debe asignar exactamente UN (1) ACTOR principal al expediente.');
    }

    try {
      if (editingId) {
        await ExpedienteService.update(editingId, values);
        message.success('Expediente actualizado de forma correcta');
      } else {
        await ExpedienteService.create(values);
        message.success('Expediente y vínculos registrados con éxito');
      }
      closeCreateModal();
      fetchData();
    } catch (error) {
      message.error('Error al procesar la causa');
    }
  };

  const handleVerPersonas = async (expediente: Expediente) => {
    setSelectedExpediente(expediente);
    setIsPeopleModalOpen(true);
    setLoadingPeople(true);
    try {
      const data = await ExpedienteService.getPersonas(expediente.id);
      setIntervinientes(data);
    } catch (error) {
      message.error('Error al obtener los intervinientes');
    } finally {
      setLoadingPeople(false);
    }
  };

  const openAltaModal = () => {
    setEditingId(null);
    form.resetFields();
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    form.resetFields();
    setEditingId(null);
  };

  const closePeopleModal = () => {
    setIsPeopleModalOpen(false);
    setIntervinientes([]);
    setSelectedExpediente(null);
  };

  return {
    expedientes,
    organismos,
    personas,
    loading,
    isCreateModalOpen,
    editingId,
    isPeopleModalOpen,
    selectedExpediente,
    intervinientes,
    loadingPeople,
    form,
    openAltaModal,
    closeCreateModal,
    closePeopleModal,
    handleEditClick,
    handleDeleteExpediente,
    handleSubmitExpediente,
    handleVerPersonas
  };
};