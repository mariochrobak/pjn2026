import React, { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { MaestroItem } from '../hooks/useMaestros';
import { Space, Card, Tabs, Table, Input, Button } from 'antd';
import { EnvironmentOutlined, BankOutlined, PlusOutlined } from '@ant-design/icons';
import { useMaestros } from '../hooks/useMaestros';


import './Maestros.css';

export const Maestros: React.FC = () => {
  const { ciudades, fueros, loading, handleCreateCiudad, handleCreateFuero } = useMaestros();
  
  const [nuevaCiudadCod, setNuevaCiudadCod] = useState('');
  const [nuevaCiudadNom, setNuevaCiudadNom] = useState('');
  
  const [nuevoFueroCod, setNuevoFueroCod] = useState('');
  const [nuevoFueroNom, setNuevoFueroNom] = useState('');

  const columns :ColumnsType<MaestroItem> = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80, render: (text: number) => <strong>#{text}</strong> },
    { title: 'Código', dataIndex: 'codigo', key: 'codigo', width: 100, render: (text: string) => <strong>{text}</strong>, sorter: (a: any, b: any) => a.codigo.localeCompare(b.codigo )},
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre', defaultSortOrder: 'ascend', sorter: (a: any, b: any) => a.nombre.localeCompare(b.nombre) }
  ];

  const onAddCiudad = () => {
    handleCreateCiudad(nuevaCiudadCod, nuevaCiudadNom);
    setNuevaCiudadCod('');
    setNuevaCiudadNom('');
  };

  const onAddFuero = () => {
    handleCreateFuero(nuevoFueroCod, nuevoFueroNom);
    setNuevoFueroCod('');
    setNuevoFueroNom('');
  };

  const items = [
    {
      key: '1',
      label: <Space><EnvironmentOutlined /> Ciudades</Space>,
      children: (
        <Space orientation="vertical" className="w-100">
          <Space.Compact className="formulario-maestro-compact">
            <Input 
              placeholder="Cód (Ej: NQ)" 
              maxLength={2} 
              className="input-codigo-maestro" 
              value={nuevaCiudadCod} 
              onChange={(e) => setNuevaCiudadCod(e.target.value)} 
            />
            <Input 
              placeholder="Nombre de la nueva ciudad..." 
              value={nuevaCiudadNom} 
              onChange={(e) => setNuevaCiudadNom(e.target.value)} 
              onPressEnter={onAddCiudad}
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={onAddCiudad}>Agregar</Button>
          </Space.Compact>
          <Table dataSource={ciudades} columns={columns} rowKey="id" loading={loading} size="small" pagination={{ pageSize: 8 }} />
        </Space>
      ),
    },
    {
      key: '2',
      label: <Space> <BankOutlined /> Fueros</Space>,
      children: (
        <Space orientation="vertical" className="w-100">
          <Space.Compact className="formulario-maestro-compact">
            <Input 
              placeholder="Cód (Ej: FA)" 
              maxLength={2} 
              className="input-codigo-maestro" 
              value={nuevoFueroCod} 
              onChange={(e) => setNuevoFueroCod(e.target.value)} 
            />
            <Input 
              placeholder="Nombre del nuevo fuero..." 
              value={nuevoFueroNom} 
              onChange={(e) => setNuevoFueroNom(e.target.value)} 
              onPressEnter={onAddFuero}
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={onAddFuero}>Agregar</Button>
          </Space.Compact>
          <Table dataSource={fueros} columns={columns} rowKey="id" loading={loading} size="small" pagination={{ pageSize: 8 }} />
        </Space>
      ),
    }
  ];

  return (
    <Space orientation="vertical" size="large" className="w-100">
      <div>
        <h2 className="maestros-titulo">Parámetros</h2>
        <p className="maestros-subtitulo">Gestión de diccionarios y parámetros del sistema</p>
      </div>
      <Card>
        <Tabs defaultActiveKey="1" items={items} />
      </Card>
    </Space>
  );
};