import { Button, Form, Input, notification } from "antd";
import { registerAPI } from "../services/api.service";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log("Success:", values.fullname);
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
        // onFinishFailed={onFinishFailed}
        >
            <div style={{ margin: "50px" }}>
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
                <div>
                    <Button onClick={() => form.submit()} type="primary">Register</Button>
                </div>
            </div >
        </Form >
    );
}

export default RegisterPage;