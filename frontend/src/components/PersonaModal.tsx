import React from 'react';
import { Modal, Form, Input } from 'antd';
import type { FormInstance } from 'antd';
import type { Persona } from '../hooks/usePersonas';

import './PersonaModal.css';

interface PersonaModalProps {
  isOpen: boolean;
  editingDni: string | null;
  form: FormInstance<Persona>;
  onCancel: () => void;
  onOk: (values: Persona) => void;
}

export const PersonaModal: React.FC<PersonaModalProps> = ({ isOpen, editingDni, form, onCancel, onOk }) => {
  return (
    <Modal
      title={editingDni ? `Modificar Datos - DNI: ${editingDni}` : "Registrar Nueva Persona"}
      open={isOpen}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Guardar"
      cancelText="Cancelar"
    >
      <Form form={form} layout="vertical" onFinish={onOk} className="modal-form-persona">
        <Form.Item
          name="dni"
          label="Documento Nacional de Identidad (DNI)"
          rules={[
            { required: true, message: 'El DNI es obligatorio' },
            { pattern: /^\d+$/, message: 'El DNI solo debe contener números' }
          ]}
        >
          <Input placeholder="Ej: 26123456" maxLength={10} disabled={!!editingDni} />
        </Form.Item>

        <Form.Item name="apellido" label="Apellido/s" rules={[{ required: true, message: 'El apellido es obligatorio' }]}>
          <Input placeholder="Ej: Pérez" />
        </Form.Item>

        <Form.Item name="nombre" label="Nombre/s" rules={[{ required: true, message: 'El nombre es obligatorio' }]}>
          <Input placeholder="Ej: Juán Carlos" />
        </Form.Item>
      </Form>
    </Modal>
  );
};