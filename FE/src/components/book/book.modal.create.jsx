import { Button, Input, InputNumber, message, Modal, notification, Select, Form } from "antd";
import { useRef, useState } from "react";
import { uploadFileAPI } from "../../services/user.api";
import { createBookAPI } from "../../services/book.api";

const CreateBookModal = (props) => {

    const { loadBook, isModalCreateOpen, setIsModalCreateOpen } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [form] = Form.useForm();

    const resetForm = () => {
        form.resetFields();
        setSelectedFile(null);
        setPreviewUrl(null);
        setIsModalCreateOpen(false);
    }

    const formatter = value => {
        const [start, end] = `${value}`.split('.') || [];
        const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return `${end ? `${v}.${end}` : `${v}`}`;
    };

    const handleSubmit = async () => {
        const values = form.getFieldsValue();
        if (!selectedFile) {
            notification.error({
                message: "Create Book",
                description: "Please select a thumbnail image for the book."
            });
            return;
        }
        const resUpload = await uploadFileAPI(selectedFile, "book");
        const response = await createBookAPI(
            values.title,
            values.author,
            values.price,
            values.category,
            values.quantity,
            values.slider,
            values.sold,
            resUpload.data ? resUpload.data.fileUploaded : ""
        );
        if (response.data) {
            message.success("Book created successfully");
            resetForm();
            await loadBook();
        } else {
            message.error("Book creation failed");
        }
    }

    const handleUploadBookImage = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreviewUrl(null);
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    }


    return (
        <div className="book-form" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3> Table Book</h3>
                <Button
                    type="primary"
                    onClick={() => setIsModalCreateOpen(true)}>Create
                </Button>
            </div>
            <Modal
                title="Create New Book"
                open={isModalCreateOpen}
                onOk={handleSubmit}
                onCancel={resetForm}
                maskClosable={false}
                okText={"Create Book"}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        category: "Arts",
                        sold: 0,
                        slider: ""
                    }}
                >
                    <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Author" name="author" rules={[{ required: true, message: 'Please input the author!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input the price!' }]}>
                        <InputNumber
                            suffix="VND"
                            style={{ width: "100%" }}
                            formatter={formatter}
                        />
                    </Form.Item>
                    <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category!' }]}>
                        <Select
                            style={{ width: "100%" }}
                            allowClear
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },
                            ]}
                            placeholder="Select category"
                        />
                    </Form.Item>
                    <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: 'Please input the quantity!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Sold" name="sold">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Slider" name="slider">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Thumbnail URL">
                        <div>
                            <label htmlFor="btnUpload" style={{
                                display: "block",
                                width: "fit-content",
                                marginTop: "15px",
                                padding: "5px 10px",
                                background: "orange",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}>Upload Image</label>
                            <input
                                id="btnUpload"
                                type="file"
                                onChange={handleUploadBookImage}
                                onClick={event => event.target.value = null}
                                hidden
                                style={{ display: "none" }}
                            />
                        </div>
                        {previewUrl && (
                            <div
                                style={{
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                    height: "150px",
                                    width: "150px"
                                }}
                            >
                                <img
                                    src={previewUrl}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default CreateBookModal;