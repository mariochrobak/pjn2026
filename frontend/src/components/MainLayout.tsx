import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { BarChartOutlined, FileTextOutlined, TeamOutlined, BankOutlined, DatabaseOutlined } from '@ant-design/icons';


import './MainLayout.css';

const { Header, Sider, Content } = Layout;

export const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const menuItems = [
    {
      key: '/',
      icon: <BarChartOutlined />,
      label: 'Tablero',
    },
    {
      key: '/expedientes',
      icon: <FileTextOutlined />,
      label: 'Expedientes',
    },
    {
      key: '/personas',
      icon: <TeamOutlined />,
      label: 'Personas',
    },
    {
      key: '/organismos',
      icon: <BankOutlined />,
      label: 'Organismos',
    },
    { 
      key: '/maestros', 
      icon: <DatabaseOutlined />, 
      label: 'Parámetros' 
    },
  ];

  return (
    <Layout className="layout-wrapper">
      {/* Menú Lateral */}
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="sider-logo">
          Mesa de Entradas
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={(item) => navigate(item.key)}
        />
      </Sider>

      {/* Contenido Principal */}
      <Layout>
        <Header className="header-main">
          Mesa de Entradas Virtual
        </Header>
        <Content className="contenido-principal">
          {/* Páginas de contenido */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};