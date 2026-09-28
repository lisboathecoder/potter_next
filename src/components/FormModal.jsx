'use client';

import { useEffect } from 'react';
import { Form, Input, Modal, Switch } from 'antd';

const camposTexto = [
    { name: 'house', label: 'Casa', placeholder: 'ex: Grifinória' },
    { name: 'species', label: 'Espécie', placeholder: 'ex: Humano' },
    { name: 'gender', label: 'Gênero', placeholder: 'ex: Masculino' },
    { name: 'dateOfBirth', label: 'Data de nascimento', placeholder: 'ex: 31-07-1980' },
    { name: 'patronus', label: 'Patrono', placeholder: 'ex: Cervo' },
    { name: 'actor', label: 'Ator/atriz', placeholder: 'ex: Daniel Radcliffe' },
    { name: 'eyeColour', label: 'Cor dos olhos', placeholder: 'ex: Verde' },
    { name: 'hairColour', label: 'Cor do cabelo', placeholder: 'ex: Preto' },
    { name: 'image', label: 'URL da imagem', placeholder: 'https://exemplo.com/personagem.png' },
];

export default function FormModal({ openModal, personagem, confirmLoading, onSubmit, onCancel }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (openModal) {
            form.resetFields();
            form.setFieldsValue({ alive: true, ...personagem });
        }
    }, [form, openModal, personagem]);

    return (
        <Modal
            open={openModal}
            title={personagem ? 'Editar personagem' : 'Adicionar personagem'}
            centered
            onOk={() => form.submit()}
            onCancel={onCancel}
            confirmLoading={confirmLoading}
            okText={personagem ? 'Salvar' : 'Adicionar'}
            cancelText="Cancelar"
            destroyOnHidden>
            <Form form={form} layout="vertical" onFinish={onSubmit}>
                <Form.Item
                    name="name"
                    label="Nome"
                    rules={[
                        {
                            required: true,
                            min: 2,
                            max: 120,
                            message: 'Informe um nome entre 2 e 120 caracteres.',
                        },
                    ]}>
                    <Input placeholder="ex: Harry Potter" />
                </Form.Item>

                {camposTexto.map(({ name, label, placeholder }) => (
                    <Form.Item
                        key={name}
                        name={name}
                        label={label}
                        rules={
                            name === 'image'
                                ? [{ type: 'url', message: 'Informe uma URL válida.' }]
                                : undefined
                        }>
                        <Input placeholder={placeholder} />
                    </Form.Item>
                ))}

                <Form.Item name="alive" label="Está vivo?" valuePropName="checked">
                    <Switch checkedChildren="Sim" unCheckedChildren="Não" />
                </Form.Item>
            </Form>
        </Modal>
    );
}
