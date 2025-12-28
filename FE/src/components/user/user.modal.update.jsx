import { useEffect, useState } from "react";
import { Input, notification, Modal, message } from "antd";
import { updateUserAPI } from "../../services/user.api";

const UpdateUserModal = (props) => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setEmail(dataUpdate.email);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate]);

    const handleSubmit = async () => {
        const response = await updateUserAPI(id, fullName, email, phone);
        if (response.data) {
            message.success("User updated successfully");
            resetForm();
            await loadUser();
        } else {
            notification.error({
                message: "User update failed",
                description: JSON.stringify(response.message)
            });
        }
    }

    const resetForm = () => {
        setId("");
        setFullName("");
        setEmail("");
        setPhone("");
        setIsModalUpdateOpen(false);
        setDataUpdate(null);
    }

    return (
        <Modal
            title="Update User"
            open={isModalUpdateOpen}
            onOk={() => handleSubmit()}
            onCancel={() => resetForm()}
            maskClosable={false}
            okText={"Save"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id} disabled />
                </div>
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
                    <span>Phone</span>
                    <Input
                        value={phone}
                        onChange={(event) => { setPhone(event.target.value) }} />
                </div>
            </div>
        </Modal>
    )
}

export default UpdateUserModal;