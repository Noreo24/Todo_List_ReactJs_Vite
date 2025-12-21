import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Form, Input, Row, Divider, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useState } from "react";

const LoginPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        const res = await loginAPI(values.email, values.password);
        if (res.data) {
            message.success("Login successfully!");
            navigate("/");
            // localStorage.setItem("token", res.data.token);
            // localStorage.setItem("user", JSON.stringify(res.data.user));
            // window.location.href = "/";
        } else {
            notification.error({
                message: "Login failed!",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false);
    }

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8} >
                <fieldset style={{ padding: "15px", margin: "15px", borderRadius: "5px", border: "1px solid #ccc" }}>
                    <legend>Login</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!'
                                },
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email!'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!'
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Flex justify="space-between" align="center">
                                <Button loading={loading} type="primary" onClick={() => form.submit()}>
                                    Login
                                </Button>
                                <Link to="/">Go to homepage <ArrowRightOutlined /></Link>
                            </Flex>
                        </Form.Item>
                    </Form >
                    <Divider />
                    <Flex align="center" justify="end" gap={5}>
                        Don't have an account?
                        <Link to="/register">Register now</Link>
                    </Flex>
                </fieldset>
            </Col>
        </Row>
    );
}

export default LoginPage;