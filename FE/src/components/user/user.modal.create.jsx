import { Button, Input, notification, Modal, message } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const CreateUserModal = (props) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const { loadUser } = props;

    const handleSubmit = async () => {
        const response = await createUserAPI(fullName, email, password, phone);
        if (response.data) {
            message.success("User created successfully");
            resetForm();
            await loadUser();
        } else {
            notification.error({
                message: "User creation failed",
                description: JSON.stringify(response.message)
            });
        }
    }

    const resetForm = () => {
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setIsModalCreateOpen(false);
    }

    return (
        <div className="user-form" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3> Table User</h3>
                <Button
                    type="primary"
                    onClick={() => setIsModalCreateOpen(true)}>Create
                </Button>
            </div>
            <Modal
                title="Create New User"
                open={isModalCreateOpen}
                onOk={() => handleSubmit()}
                onCancel={() => resetForm()}
                maskClosable={false}
                okText={"Create User"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Fullname</span>
                        <Input
                            value={fullName}
                            onChange={(event) => { setFullName(event.target.value) }} />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }} />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }} />
                    </div>
                    <div>
                        <span>Phone</span>
                        <Input
                            value={phone}
                            onChange={(event) => { setPhone(event.target.value) }} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CreateUserModal;