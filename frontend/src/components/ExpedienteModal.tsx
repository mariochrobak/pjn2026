import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Space, Divider, Button } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import type { Organismo } from '../hooks/useOrganismos';
import type { Persona } from '../hooks/usePersonas';
import type { ExpedienteFormValues } from '../hooks/useExpedientes';


import './ExpedienteModal.css';

interface ExpedienteModalProps {
  isOpen: boolean;
  editingId: number | null;
  form: FormInstance<ExpedienteFormValues>;
  organismos: Organismo[];
  personas: Persona[];
  onCancel: () => void;
  onOk: (values: ExpedienteFormValues) => void;
}

export const ExpedienteModal: React.FC<ExpedienteModalProps> = ({ isOpen, editingId, form, organismos, personas, onCancel, onOk }) => {
  return (
    <Modal
      title={editingId ? `Modificar Registro de Causa (ID: ${editingId})` : "Registrar Expediente en Mesa de Entradas"}
      open={isOpen}
      onCancel={onCancel}
      onOk={() => form.submit()}
      width={700}
      okText={editingId ? "Actualizar" : "Registrar"}
      cancelText="Cancelar"
    >
      <Form form={form} layout="vertical" onFinish={onOk} className="modal-form-expediente">
        <Space size="middle" className="flex-w-100">
          <Form.Item name="idOrganismo" label="Organismo" rules={[{ required: true, message: 'Requerido' }]} className="select-organismo">
            <Select placeholder="Seleccione Organismo" options={organismos.map(o => ({ value: o.id, label: `${o.codigo} - ${o.nombre}` }))} />
          </Form.Item>

          <Form.Item name="tipo" label="Tipo" rules={[{ required: true, message: 'Requerido' }]} className="select-tipo">
            <Select placeholder="Tipo" options={[{ value: 'EXP', label: 'EXP (Expediente)' }, { value: 'LEG', label: 'LEG (Legajo)' }]} />
          </Form.Item>

          <Form.Item name="numero" label="Número" rules={[{ required: true, message: 'Requerido' }]}>
            <InputNumber min={1} placeholder="Ej: 4520" className="w-100" />
          </Form.Item>

          <Form.Item name="anio" label="Año" rules={[{ required: true, message: 'Requerido' }]}>
            <InputNumber min={1900} max={2026} placeholder="Ej: 2026" className="w-100" />
          </Form.Item>
        </Space>

        <Form.Item name="caratula" label="Carátula / Título del Expediente" rules={[{ required: true, message: 'La carátula es obligatoria' }]}>
          <Input.TextArea placeholder="Ej: Pérez Juan contra Catalá Marisa..." rows={2} />
        </Form.Item>

        <Divider titlePlacement="left">Personas Involucradas</Divider>

        <Form.List name="involucrados">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} className="fila-involucrado" align="baseline">
                  <Form.Item {...restField} name={[name, 'idPersona']} rules={[{ required: true, message: 'Seleccione persona' }]} className="select-persona">
                    <Select placeholder="Seleccione la Persona" showSearch options={personas.map(p => ({ value: p.id, label: `${p.dni} - ${p.apellido}, ${p.nombre}` }))} />
                  </Form.Item>

                  <Form.Item {...restField} name={[name, 'idVinculo']} rules={[{ required: true, message: 'Seleccione rol' }]} className="select-vinculo">
                    <Select placeholder="Vínculo / Rol" options={[{ value: 1, label: 'ACTOR' }, { value: 2, label: 'DEMANDADO' }, { value: 3, label: 'CONDENADO' }, { value: 4, label: 'VICTIMA' }]} />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} className="icono-eliminar" />
                </Space>
              ))}
              
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Asociar Persona al Expediente
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};