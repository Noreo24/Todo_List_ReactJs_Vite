import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { registerAPI } from "../services/api.service";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const response = await registerAPI(values.fullname, values.email, values.password, values.phone);
        if (response.data) {
            notification.success({
                message: "Register successfully!",
                description: "You can login now!"
            })
            navigate("/login")
        } else {
            notification.error({
                message: "Register failed!",
                description: JSON.stringify(response.error)
            })
        }
    }
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ margin: "30px" }}
        // onFinishFailed={onFinishFailed}
        >
            <h3 style={{ textAlign: "center" }}>Register</h3>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Full name"
                        name="fullname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
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
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: "Wrong format!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <div>
                        <Button onClick={() => form.submit()} type="primary">Register</Button>
                    </div>
                    <Divider />
                    <div>
                        Already have an account? <Link to="/login">Login here</Link>
                    </div>
                </Col>
            </Row>
        </Form >
    );
}

export default RegisterPage;