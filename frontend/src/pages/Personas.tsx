import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { Persona } from '../hooks/usePersonas';
import { Table, Button, Space, Card, Tooltip, Popconfirm } from 'antd';
import { PlusOutlined, FolderOpenOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { usePersonas } from '../hooks/usePersonas';
import { PersonaModal } from '../components/PersonaModal';
import { PersonaExpedientesModal } from '../components/PersonaExpedientesModal';


import './Personas.css';

export const Personas: React.FC = () => {
  const {
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
  } = usePersonas();

  const columnsPersonas: ColumnsType<Persona> = [
    { title: 'DNI', dataIndex: 'dni', key: 'dni', sorter: (a: any, b: any) => a.dni.localeCompare(b.dni, {numeric: true})  },
    { title: 'Apellido', dataIndex: 'apellido', key: 'apellido', sorter: (a: any, b: any) => a.apellido.localeCompare(b.apellido), defaultSortOrder: 'ascend' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre', sorter: (a: any, b: any) => a.nombre.localeCompare(b.nombre)  },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip title="Ver Expedientes">
            <Button icon={<FolderOpenOutlined />} onClick={() => handleVerExpedientes(record)} />
          </Tooltip>
          <Tooltip title="Editar Datos">
            <Button icon={<EditOutlined/>} onClick={() => handleEditClick(record)} />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Popconfirm
              title="¿Dar de baja a esta persona?"
              description="Se revocará su participación en todos los expedientes activos."
              onConfirm={() => handleDelete(record.dni)}
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
      <div className="personas-encabezado">
        <div>
          <h2 className="personas-titulo">Gestión de Personas</h2>
          <p className="personas-subtitulo">Administración integral de intervinientes y ciudadanos</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAltaModal}>
          Nueva Persona
        </Button>
      </div>

      <Card>
        <Table dataSource={personas} columns={columnsPersonas} rowKey="dni" loading={loading} />
      </Card>

      <PersonaModal 
        isOpen={isFormModalOpen} 
        editingDni={editingDni} 
        form={form} 
        onCancel={closeFormModal} 
        onOk={handleSubmitPersona} 
      />
      <PersonaExpedientesModal 
        isOpen={isExpedientesModalOpen} 
        selectedPersona={selectedPersona} 
        expedientes={expedientes} 
        loading={loadingExpedientes} 
        onCancel={closeExpedientesModal} 
      />
    </Space>
  );
};