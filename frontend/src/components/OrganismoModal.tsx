import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import type { FormInstance } from 'antd';
import type { Organismo } from '../hooks/useOrganismos';
import type { MaestroItem } from '../hooks/useMaestros';


import './OrganismoModal.css';

interface OrganismoModalProps {
  isOpen: boolean;
  editingId: number | null;
  form: FormInstance<Organismo>;
  ciudades: MaestroItem[];
  fueros: MaestroItem[];
  onCancel: () => void;
  onOk: (values: Organismo) => void;
}

export const OrganismoModal: React.FC<OrganismoModalProps> = ({ 
  isOpen, editingId, form, ciudades, fueros, onCancel, onOk 
}) => {
  
  return (
    <Modal
      title={editingId ? `Modificar Registro (ID: ${editingId})` : "Registrar Nuevo Organismo"}
      open={isOpen}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Guardar"
      cancelText="Cancelar"
    >
      <Form form={form} layout="vertical" onFinish={onOk} className="modal-form-organismo">
        
        <Form.Item name="idCiudad" label="Ciudad" rules={[{ required: true, message: 'Seleccione una ciudad' }]}>
          <Select 
            placeholder="Seleccione una ciudad" 
            options={ciudades.map(c => ({ value: c.id, label: c.nombre }))}
            disabled={!!editingId}
          />
        </Form.Item>

        <Form.Item name="idFuero" label="Fuero" rules={[{ required: true, message: 'Seleccione un fuero' }]}>
          <Select 
            placeholder="Seleccione un fuero" 
            options={fueros.map(f => ({ value: f.id, label: f.nombre }))}
            disabled={!!editingId}
          />
        </Form.Item>

        <Form.Item
          name="codigo"
          label="Código del Organismo (Autogenerado)"
          rules={[{ required: true, message: 'Falta generar el código' }]}
        >
          <Input 
            readOnly 
            placeholder="Se generará automáticamente" 
            className="input-codigo-autogenerado"
          />
        </Form.Item>

        <Form.Item name="nombre" label="Nombre Completo" rules={[{ required: true, message: 'El nombre es obligatorio' }]}>
          <Input placeholder="Ej: Juzgado de Familia N° 1" />
        </Form.Item>
      </Form>
    </Modal>
  );
};