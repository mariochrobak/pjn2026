import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { Organismo } from '../hooks/useOrganismos';
import { Table, Button, Space, Card, Popconfirm, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useOrganismos } from '../hooks/useOrganismos';
import { OrganismoModal } from '../components/OrganismoModal';

import './Organismos.css';

export const Organismos: React.FC = () => {
  const {
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
    handleSubmit,
  } = useOrganismos();

  const columns: ColumnsType<Organismo> = [
    { title: 'Código', dataIndex: 'codigo', key: 'codigo', render: (text: string) => <strong>{text}</strong> },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre', sorter: (a: any, b: any) => a.nombre.localeCompare(b.nombre), defaultSortOrder: 'ascend' },
    { title: 'Ciudad', dataIndex: 'ciudad', key: 'ciudad', sorter: (a: any, b: any) => a.ciudad.localeCompare(b.ciudad) },
    { title: 'Fuero', dataIndex: 'fuero', key: 'fuero', sorter: (a: any, b: any) => a.fuero.localeCompare(b.fuero) },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_: unknown, record: any) => (
        <Space size="middle">
          <Tooltip title="Editar">
            <Button icon={<EditOutlined />} onClick={() => handleEditClick(record)} />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Popconfirm
              title="¿Está seguro de eliminar este organismo?"
              description="Se borrarán también todos sus expedientes asociados en cascada."
              onConfirm={() => handleDelete(record.id)} 
              okText="Sí, borrar"
              cancelText="No"
              okButtonProps={{ danger: true }}
            >
              <Button danger icon={<DeleteOutlined/>} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Space orientation="vertical" size="large" className="w-100">
      <div className="organismos-encabezado">
        <div>
          <h2 className="organismos-titulo">Gestión de Organismos</h2>
          <p className="organismos-subtitulo">Administración y control de dependencias judiciales</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAltaModal}>
          Nuevo Organismo
        </Button>
      </div>

      <Card>
        <Table dataSource={organismos} columns={columns} rowKey="id" loading={loading} />
      </Card>

      <OrganismoModal 
        isOpen={isModalOpen}
        editingId={editingId}
        form={form}
        ciudades={ciudades}
        fueros={fueros}
        onCancel={closeModal}
        onOk={handleSubmit}
      />
    </Space>
  );
};