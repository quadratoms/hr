import React, { ReactNode, useEffect, useState } from "react";
import {
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    BookOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
    AppstoreOutlined, LockFilled, LockOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Form, Input, Menu, Space } from "antd";
import axios from "axios";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useIsLoggedIn, useToken, useTransaction, useUser } from "../hooks/storage";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import logo from "./../assets/log.svg"
import { reset } from "../redux/reducers/formTypeSlice";


type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    onClick?:Function,
    children?: MenuItem[],
    type?: "group",

): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,onClick
    } as MenuItem;
}



interface DefaultLayoutProps {
    children: ReactNode;
}






const Main: React.FC<DefaultLayoutProps> = ({ children }) => {


    const [collapsed, setCollapsed] = useState(window.innerWidth <= 760);
    const { userData, setUserData } = useUser()
    const {transactions, setTransactions} = useTransaction();
    const [form] = Form.useForm();
    const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();
    const { token } = useToken()
    const navigate = useNavigate()

    const items: MenuItem[] = [
        getItem("Home", '1', <PieChartOutlined />, ()=>navigate('/')),
        getItem('Form Type', '2', <DesktopOutlined />, ()=>navigate('/formtype')),
        getItem('All Requuest', '3', <ContainerOutlined />, ()=>navigate('/request')),
        getItem('Request', '4', <ContainerOutlined />, ()=>navigate('/my-request')),    
       
    ];
    const logoutmenu: MenuItem[] = [
        getItem('Logout', '5', <LockFilled />,() => { localStorage.clear(); reset(); navigate("/login") }),
    
    ];


    useEffect(() => {
        const apiUrl = process.env.REACT_APP_BASE_API;
        const api = axios.create({
            baseURL: apiUrl,
            headers: {
                Authorization: "Bearer " + token
            }
        })

        // Fetch user details
        api.get(`/user`,{
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                setUserData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });

       
    }, []);



    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleResize = () => {
        setCollapsed(window.innerWidth <= 760);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click ", e);
    };

    return (
        <div className="flex h-screen overflow-hidden gradient-background">
            <div className="flex h-full flex-col border-r-2 bg-blue-600 justify-between">
                <div className="">

                    <Button
                        type="default"
                        className="text-start"
                        color="white"
                        block
                        onClick={toggleCollapsed}
                        style={{ marginBottom: 16 }}
                    >
                        {collapsed ? (
                            <MenuUnfoldOutlined color="black" />
                        ) : (
                            <MenuFoldOutlined color="black" />
                        )}
                    </Button>
                    <Menu
                        className={` bg-blue-700 text-white ${!collapsed && "w-60"}`}
                        onClick={onClick}
                        defaultSelectedKeys={["1"]}
                        color="green"

                        // defaultOpenKeys={["sub1"]}
                        mode="inline"
                        inlineCollapsed={collapsed} 
                        items={items}
                    />
                </div>
                <Menu
                    defaultSelectedKeys={[]}
                    items={logoutmenu}
                        inlineCollapsed={collapsed} 
                        mode="inline"
                    className={`text-blue-700 ${!collapsed && "w-60"}`}

                />
            </div>
            <div className="h-full flex flex-col flex-1 overflow-auto">
                <Header >
                    <div className="logo text-white flex items-center">
                        <img width={50} src={logo} />
                        <span className="text-lg font-bold">Request And Sign</span>
                    </div>
                    
                </Header>
                <Content style={{ padding: '50px' }} className="flex-col flex flex-1 h-full overflow-auto  ">
                   
                    {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Request ©2024 Created by Quadratoms</Footer>
            </div>
        </div>
    );
};

export default Main;

