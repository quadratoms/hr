import { Button, Form, Input, Space } from "antd";
import axios from "axios";
import { useIsLoggedIn, useToken, useUser } from "../hooks/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../redux/reducers/formTypeSlice";

const Login: React.FC = () => {
  const isAuthenticated= useAppSelector(
    (state: any) => state.formType?.isAuthenticated
  );
  const dispatch = useAppDispatch()
      const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();
    const { setToken } = useToken()
    const [form] = Form.useForm();
    const navigation = useNavigate()
    const [isNew, setIsNew] = useState(false)

    useEffect(() => {

        if (isAuthenticated) {
            console.log(isAuthenticated);
            localStorage.setItem('token', JSON.stringify(isAuthenticated));

            navigation("/", {})
        }
    }, [isAuthenticated])
    
    const onFinish = (values: any) => {
        const apiUrl = process.env.REACT_APP_BASE_API;
        dispatch(login(values))
        // Example: Sign in
        // axios
        //     .post(`${apiUrl}/signin/`, values)
        //     .then((response) => {
        //         console.log("Login successful:", response.data);
        //         // setUserData(response.data);
        //         setIsLoggedIn(true);
        //         setToken(response.data?.access_token)
        //         dispatch({})
                
        //     })
        //     .catch((error) => {
        //         console.error("Login failed:", error);
        //     });
    };
    const onFinishNew = (values: any) => {
        const apiUrl = process.env.REACT_APP_BASE_API;

        // Example: Sign in
        axios
            .post(`${apiUrl}/user/signup`, values)
            .then((response) => {
                console.log("Login successful:", response.data);
                // setUserData(response.data);
                // setIsLoggedIn(true);
                // setToken(response.data?.token)
                setIsNew(false)
                
            })
            .catch((error) => {
                console.error("Login failed:", error);
            });
    };
    return (
        <div className="flex h-screen overflow-hidden gradient-background">
            {isLoggedIn}
            <div className="flex justify-center items-center w-full h-full">
                {/* <div>
                                <h1>{userData && userData.fullName}</h1>
                                <p>Email: {userData && userData.email}</p>
                            </div> */}
                <div>
                    <h2 className="text-white text-lg">Login</h2>
                    {isNew?
                    <Form form={form} onFinish={onFinishNew} className="bg-white p-6"
                    layout="vertical">
                    <Form.Item
                      label="Username"
                      name="username"
                      

                      rules={[{ required: true, message: 'Please input your Username!' },{min:10},{max:11}]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      label="Full Name"
                      name="fullName"
                      rules={[{ required: true, message: 'Please input your full name!' }]}
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
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item shouldUpdate={true}>
                      <Space>
                        <Button type="primary" htmlType="submit">
                          Signup
                        </Button>
                      </Space>
                    </Form.Item>
                    <div>
                        <span onClick={()=>setIsNew(!isNew)}>Already have an Account <Button color="blue">Click here</Button> </span>
                    </div>
                  </Form>
                    :
                    <Form
                        form={form}
                        onFinish={onFinish}
                        className="bg-white p-6"
                        layout="vertical"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                { required: true, message: "Please input your Username!" },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Please input your password!" }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item shouldUpdate={true}>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Login
                                </Button>
                            </Space>
                        </Form.Item>
                        <div>
                        <span onClick={()=>setIsNew(!isNew)}>Already have an Account <Button type="link" color="blue">Click here</Button> </span>
                    </div>
                    </Form>
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;
