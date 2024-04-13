import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Table, Form, Input, Button, Space, Card, Typography, Modal } from 'antd';
import axios from 'axios';
import { UpdateAndGetUser, getTransactionHistory, useToken, useTransaction, useUser } from '../hooks/storage';
import {
    MailOutlined, DollarCircleOutlined, UserOutlined, EnvironmentOutlined, EditOutlined
} from "@ant-design/icons";
const { Text } = Typography;


const User: React.FC = () => {
    const { userData, setUserData } = useUser();
    const { transactions, setTransactions } = useTransaction();
    const [form] = Form.useForm();
    const { token } = useToken()

    const [editMode, setEditMode] = useState(false);
    const [modal, contextHolder] = Modal.useModal();

    const handleEditToggle = () => {
        setEditMode(!editMode);
        form.setFieldsValue({
            fullName: userData.fullName,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            address: userData.address,
        });
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        form.resetFields();
    };

    const handleFinishEdit = (values: any) => {
        async function post() {
            try {
                
                setUserData(await UpdateAndGetUser(values))
                setEditMode(false)
          modal.success({ content: "successful", title: "save" });

            } catch (error) {
                modal.error({ content: "error", title: "save" });
            }
        }
        post()
    };
    return (
        <div>

            <Card
                title={<Text strong>{userData.fullName}</Text>}
                extra={<EditOutlined style={{ fontSize: 24, color: '#1890ff', cursor: 'pointer' }} onClick={handleEditToggle} />}
                style={{ width: 300, margin: '20px auto' }}
            >
                {editMode ? (
                    <Form form={form} onFinish={handleFinishEdit} layout="vertical">
                        <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your full name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Save
                                </Button>
                                <Button onClick={handleCancelEdit}>
                                    Cancel
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                ) : (
                    <>
                        <p><UserOutlined /> {userData.phoneNumber}</p>
                        <p><MailOutlined /> {userData.email}</p>
                        <p><EnvironmentOutlined /> {userData.address}</p>
                        <p><DollarCircleOutlined /> Balance: ${userData.balance}</p>
                    </>
                )}
            </Card>
            {contextHolder}
        </div>
    );
};

export default User;
