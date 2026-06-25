import React from 'react';
import { Modal, Table, Tag, Button } from 'antd';
import type { Expediente, Interviniente } from '../hooks/useExpedientes';


import './ExpedientePersonasModal.css';

interface ExpedientePersonasModalProps {
  isOpen: boolean;
  selectedExpediente: Expediente | null;
  intervinientes: Interviniente[];
  loading: boolean;
  onCancel: () => void;
}

export const ExpedientePersonasModal: React.FC<ExpedientePersonasModalProps> = ({ isOpen, selectedExpediente, intervinientes, loading, onCancel }) => {
  const columnsIntervinientes = [
    { title: 'DNI', dataIndex: 'dni', key: 'dni' },
    { title: 'Apellido', dataIndex: 'apellido', key: 'apellido' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    {
      title: 'Rol / Vínculo',
      dataIndex: 'rolEnExpediente',
      key: 'rolEnExpediente',
      render: (rol: string) => {
        const color = rol === 'ACTOR' ? 'green' : rol === 'DEMANDADO' ? 'volcano' : 'blue';
        return <Tag color={color} className="tag-rol">{rol}</Tag>;
      }
    },
  ];

  return (
    <Modal
      title={selectedExpediente ? `Personas en Expediente: ${selectedExpediente.codigoOrganismo} ${selectedExpediente.tipo} ${selectedExpediente.numero}/${selectedExpediente.anio}` : 'Personas vinculadas'}
      open={isOpen}
      onCancel={onCancel}
      footer={[<Button key="ok" type="primary" onClick={onCancel}>Entendido</Button>]}
      width={650}
    >
      <Table 
        dataSource={intervinientes} 
        columns={columnsIntervinientes} 
        rowKey="dni" 
        loading={loading} 
        className="tabla-intervinientes" 
        pagination={false} 
      />
    </Modal>
  );
};