import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { Expediente } from '../hooks/useExpedientes';
import { Table, Button, Space, Card, Popconfirm, Tooltip } from 'antd';
import { PlusOutlined, TeamOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useExpedientes } from '../hooks/useExpedientes';
import { ExpedienteModal } from '../components/ExpedienteModal';
import { ExpedientePersonasModal } from '../components/ExpedientePersonasModal';


import './Expedientes.css';

export const Expedientes: React.FC = () => {
  const {
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
  } = useExpedientes();

  const columnsExpedientes: ColumnsType<Expediente> = [
    {
      title: 'Clave Identificadora',
      key: 'clave',
      dataIndex: 'clave',
      sorter: (a: any, b: any) => {
        
        const claveA = `${a.codigoOrganismo} ${a.tipo} ${a.numero}/${a.anio}`;
        const claveB = `${b.codigoOrganismo} ${b.tipo} ${b.numero}/${b.anio}`;        
        return claveA.localeCompare(claveB, undefined, { numeric: true }
          
      )},
      render: (_: any, record: any) => (
        <strong>{`${record.codigoOrganismo} ${record.tipo} ${record.numero}/${record.anio}`}</strong>
      ),
      defaultSortOrder: 'ascend'
    },
    { title: 'Carátula / Título', dataIndex: 'caratula', key: 'caratula', sorter: (a: any, b: any) => a.caratula.localeCompare(b.caratula) },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip title="Ver Personas">
            <Button icon={<TeamOutlined />} onClick={() => handleVerPersonas(record)} />
          </Tooltip>
          <Tooltip title="Editar Expediente">
            <Button icon={<EditOutlined />} onClick={() => handleEditClick(record)} />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Popconfirm
              title="¿Eliminar este expediente?"
              description="Esta acción es irreversible y removerá los históricos asociados."
              onConfirm={() => handleDeleteExpediente(record.id)}
              okText="Eliminar"
              cancelText="Cancelar"
              okButtonProps={{ danger: true }}
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Space orientation="vertical" size="large" className="w-100">
      <div className="expedientes-encabezado">
        <div>
          <h2 className="expedientes-titulo">Expedientes</h2>
          <p className="expedientes-subtitulo">Gestión, auditoría y registro general de causas judiciales</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAltaModal}>
          Registrar Expediente
        </Button>
      </div>

      <Card>
        <Table dataSource={expedientes} columns={columnsExpedientes} rowKey="id" loading={loading} />
      </Card>

      <ExpedienteModal 
        isOpen={isCreateModalOpen} 
        editingId={editingId} 
        form={form} 
        organismos={organismos} 
        personas={personas} 
        onCancel={closeCreateModal} 
        onOk={handleSubmitExpediente} 
      />
      <ExpedientePersonasModal 
        isOpen={isPeopleModalOpen} 
        selectedExpediente={selectedExpediente} 
        intervinientes={intervinientes} 
        loading={loadingPeople} 
        onCancel={closePeopleModal} 
      />
    </Space>
  );
};