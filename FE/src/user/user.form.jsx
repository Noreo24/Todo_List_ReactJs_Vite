import { Button, Input, notification, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../services/api.service";

const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async () => {
        const response = await createUserAPI(fullName, email, password, phone);
        if (response.data) {
            notification.success({
                message: "User created successfully",
                description: `User ID: ${response.data.id}`
            })
            setIsModalOpen(false);
        } else {
            notification.error({
                message: "User creation failed",
                description: JSON.stringify(response.message)
            });
        }
    }

    return (
        <div className="user-form" style={{ margin: "10px 10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3> Table User</h3>
                <Button
                    type="primary"
                    onClick={() => setIsModalOpen(true)}>Submit
                </Button>
            </div>
            <Modal
                title="Create New User"
                open={isModalOpen}
                onOk={() => handleSubmit()}
                onCancel={() => setIsModalOpen(false)}
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

export default UserForm;