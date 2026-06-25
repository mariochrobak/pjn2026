import { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { PersonaService } from '../services/persona.service';

export interface Persona {
  id: number,
  dni: string;
  nombre: string;
  apellido: string;
}

export interface ExpedienteAsociado {
  id: number;
  codigoOrganismo: string;
  tipo: string;
  numero: number;
  anio: number;
  caratula: string;
  rolEnExpediente: string;
}

export const usePersonas = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [editingDni, setEditingDni] = useState<string | null>(null);
  
  const [isExpedientesModalOpen, setIsExpedientesModalOpen] = useState<boolean>(false);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [expedientes, setExpedientes] = useState<ExpedienteAsociado[]>([]);
  const [loadingExpedientes, setLoadingExpedientes] = useState<boolean>(false);

  const [form] = Form.useForm<Persona>();

  const fetchPersonas = async () => {
    setLoading(true);
    try {
      const data = await PersonaService.getAll();
      setPersonas(data);
    } catch (error) {
      message.error('Error al cargar las personas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonas();
  }, []);

  const handleEditClick = (record: Persona) => {
    setEditingDni(record.dni);
    form.setFieldsValue(record);
    setIsFormModalOpen(true);
  };

  const handleDelete = async (dni: string) => {
    try {
      await PersonaService.delete(dni);
      message.success('Persona removida del sistema de forma correcta');
      fetchPersonas();
    } catch (error) {
      message.error('Error al intentar eliminar la persona');
    }
  };

  const handleSubmitPersona = async (values: Persona) => {
    try {
      if (editingDni) {
        await PersonaService.update(editingDni, values);
        message.success('Datos de la persona actualizados');
      } else {
        await PersonaService.create(values);
        message.success('Persona registrada exitosamente');
      }
      closeFormModal();
      fetchPersonas();
    } catch (error) {
      message.error('Error al procesar la solicitud');
    }
  };

  const handleVerExpedientes = async (persona: Persona) => {
    setSelectedPersona(persona);
    setIsExpedientesModalOpen(true);
    setLoadingExpedientes(true);
    try {
      const data = await PersonaService.getExpedientes(persona.id.toString());
      setExpedientes(data);
    } catch (error) {
      message.error('Error al cargar los expedientes asociados');
    } finally {
      setLoadingExpedientes(false);
    }
  };

  const openAltaModal = () => {
    setEditingDni(null);
    form.resetFields();
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    form.resetFields();
    setEditingDni(null);
  };

  const closeExpedientesModal = () => {
    setIsExpedientesModalOpen(false);
    setExpedientes([]);
    setSelectedPersona(null);
  };

  return {
    personas,
    loading,
    isFormModalOpen,
    editingDni,
    isExpedientesModalOpen,
    selectedPersona,
    expedientes,
    loadingExpedientes,
    form,
    openAltaModal,
    closeFormModal,
    closeExpedientesModal,
    handleEditClick,
    handleDelete,
    handleSubmitPersona,
    handleVerExpedientes,
  };
};