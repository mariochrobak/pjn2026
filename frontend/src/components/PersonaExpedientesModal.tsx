import React from 'react';
import { Modal, Table, Button } from 'antd';
import type { Persona, ExpedienteAsociado } from '../hooks/usePersonas';


import './PersonaExpedientesModal.css';

interface PersonaExpedientesModalProps {
  isOpen: boolean;
  selectedPersona: Persona | null;
  expedientes: ExpedienteAsociado[];
  loading: boolean;
  onCancel: () => void;
}

export const PersonaExpedientesModal: React.FC<PersonaExpedientesModalProps> = ({ isOpen, selectedPersona, expedientes, loading, onCancel }) => {
  const columnsExpedientes = [
    { 
      title: 'Clave Expediente', 
      key: 'clave',
      render: (_: unknown, record: ExpedienteAsociado) => (
        <strong>{`${record.codigoOrganismo} ${record.tipo} ${record.numero}/${record.anio}`}</strong>
      )
    },
    { title: 'Carátula / Título', dataIndex: 'caratula', key: 'caratula' },
    { 
      title: 'Vínculo / Rol', 
      dataIndex: 'rolEnExpediente', 
      key: 'rolEnExpediente',
      render: (rol: string) => (
        <span className={`rol-texto ${rol === 'ACTOR' ? 'rol-actor' : 'rol-otro'}`}>
          {rol}
        </span>
      )
    },
  ];

  return (
    <Modal
      title={selectedPersona ? `Historial de: ${selectedPersona.apellido}, ${selectedPersona.nombre}` : 'Expedientes'}
      open={isOpen}
      footer={[<Button key="close" type="primary" onClick={onCancel}>Cerrar</Button>]}
      onCancel={onCancel}
      width={750}
    >
      <Table 
        dataSource={expedientes} 
        columns={columnsExpedientes} 
        rowKey="id" 
        loading={loading} 
        className="tabla-expedientes" 
      />
    </Modal>
  );
};