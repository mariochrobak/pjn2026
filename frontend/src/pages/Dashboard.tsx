import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Table, Space, Spin, message } from 'antd';
import { FileTextOutlined, EnvironmentOutlined, BankOutlined, CalendarOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/plots';
import { api } from '../services/api';


import './Dashboard.css';

interface StatItem {
  anio?: number;
  ciudad?: string;
  fuero?: string;
  cantidad: number;
}

interface EstadisticasData {
  porAnio: StatItem[];
  porCiudad: StatItem[];
  porFuero: StatItem[];
}

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<EstadisticasData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const response = await api.get('/estadisticas');
        setData(response.data);
      } catch (error) {
        message.error('Error al cargar las estadísticas del panel');
      } finally {
        setLoading(false);
      }
    };

    fetchEstadisticas();
  }, []);

  if (loading || !data) {
    return (
      <div className="dashboard-loading">
        <Spin size="large" description="Cargando estadísticas del sistema..." />
      </div>
    );
  }

  const totalExpedientes = data.porAnio.reduce((sum, item) => sum + item.cantidad, 0);

  
  
  const configCiudad = {
    data: data.porCiudad,
    angleField: 'cantidad',
    colorField: 'ciudad',
    radius: 0.8,
    label: {
      text: 'cantidad',
      style: { fontWeight: 'bold', fontSize: 14 },
    },
    legend: {
      color: { position: 'bottom', alignment: 'center' },
    },
    tooltip: (datum: any) => ({
      name: datum.ciudad,
      value: '',
    }),
  };
  
  
  const configFuero = {
    data: data.porFuero,
    angleField: 'cantidad',
    colorField: 'fuero',
    radius: 0.8,
    label: {
      text: 'cantidad',
      style: { fontWeight: 'bold', fontSize: 14 },
    },
    legend: {
      color: { position: 'bottom', alignment: 'center' },
    },
    tooltip: (datum: any) => ({
      name: datum.fuero, 
      value: '',         
    }),
  };
  
  const columnsAnio = [
    {
      title: 'Año Calendario',
      dataIndex: 'anio',
      key: 'anio',
      render: (text: number) => <Space><CalendarOutlined className="icono-calendario-azul" /> <strong>{text}</strong></Space>
    },
    {
      title: 'Expedientes Registrados',
      dataIndex: 'cantidad',
      key: 'cantidad',
      render: (cant: number) => `${cant} causa${cant !== 1 ? 's' : ''}`
    }
  ];

  return (
    <Space orientation="vertical" size="large" className="w-100">
      {/* Encabezado */}
      <div>
        <h2 className="dashboard-titulo">Panel de Estadísticas</h2>
        <p className="dashboard-subtitulo">Indicadores clave de rendimiento y distribución de la Mesa de Entradas</p>
      </div>

      {/* Totalizador */}
      <Row>
        <Col span={24}>
          <Card variant="borderless" className="tarjeta-totalizador">
            <Statistic
              title={<span className="titulo-totalizador">Total General de Expedientes</span>}
              value={totalExpedientes}
              className="estadistica-totalizador"
              prefix={<FileTextOutlined className="icono-totalizador" />}
            />
          </Card>
        </Col>
      </Row>

      {/* Tortas */}
      <Row gutter={[16, 16]}>
        {/* Torta de Ciudades */}
        <Col xs={24} md={12}>
          <Card title={<Space><EnvironmentOutlined className="icono-18" /><span>Distribución Geográfica (Por Ciudad)</span></Space>} variant="borderless">
            {data.porCiudad.length === 0 ? (
              <p className="texto-vacio">No hay datos geográficos disponibles</p>
            ) : (
              <div className="contenedor-grafico">
                <Pie {...configCiudad} />
              </div>
            )}
          </Card>
        </Col>

        {/* Torta de Fueros */}
        <Col xs={24} md={12}>
          <Card title={<Space><BankOutlined /><span>Distribución por Fuero Judicial</span></Space>} variant="borderless">
            {data.porFuero.length === 0 ? (
              <p className="texto-vacio">No hay datos de fueros disponibles</p>
            ) : (
              <div className="contenedor-grafico">
                <Pie {...configFuero} />
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Histórico por años */}
      <Row>
        <Col span={24}>
          <Card title={<Space><CalendarOutlined /><span>Histórico de Altas por Año</span></Space>} variant="borderless">
            <Table
              dataSource={data.porAnio}
              columns={columnsAnio}
              rowKey="anio"
              pagination={false}
              size="middle"
              locale={{ emptyText: 'No se registran expedientes en el histórico' }}
            />
          </Card>
        </Col>
      </Row>
    </Space>
  );
};