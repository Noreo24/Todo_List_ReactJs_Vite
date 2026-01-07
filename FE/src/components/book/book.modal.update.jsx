import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { updateBookAPI } from "../../services/book.api";
import { uploadFileAPI } from "../../services/user.api";

const UpdateBookModal = (props) => {

    const { dataUpdate, setDataUpdate, isModalUpdateOpen, setIsModalUpdateOpen, loadBook } = props;
    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue({
                id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category,
                slider: dataUpdate.slider,
                sold: dataUpdate.sold
            });
            setPreviewUrl(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`);
        }
    }, [dataUpdate]);

    const updateBook = async (newThumbnail, values) => {
        const { id, mainText, author, price, quantity, category, slider, sold } = values;
        const response = await updateBookAPI(id, mainText, author, price, category, quantity, slider, sold, newThumbnail);
        if (response.data) {
            resetAndCloseModal();
            await loadBook();
            notification.success({
                message: "Update Book",
                description: "Update book successfully"
            });
        }
    }

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (!selectedFile && !previewUrl) {
                notification.error({
                    message: "Update Book",
                    description: "Please select a thumbnail image"
                });
                return;
            }
            let newThumbnail = null;
            if (!selectedFile && previewUrl) {
                newThumbnail = dataUpdate.thumbnail;
            } else {
                const resUpload = await uploadFileAPI(selectedFile, "book");
                if (resUpload.data) {
                    newThumbnail = resUpload.data.fileUploaded;
                } else {
                    notification.error({
                        message: "Update Book",
                        description: "Failed to upload thumbnail image"
                    });
                    return;
                }
            }
            // Ensure category fallback if not selected
            const categoryValue = values.category || 'Arts';
            await updateBook(newThumbnail, { ...values, category: categoryValue });
        } catch (error) {
            // Validation errors handled by Antd
        }
    }

    const formatter = value => {
        const [start, end] = `${value}`.split('.') || [];
        const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return `${end ? `${v}.${end}` : `${v}`}`;
    };

    const resetAndCloseModal = () => {
        form.resetFields();
        setSelectedFile(null);
        setPreviewUrl(null);
        setDataUpdate(null);
        setIsModalUpdateOpen(false);
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
        <Modal
            title="Update Book"
            open={isModalUpdateOpen}
            onOk={handleSubmit}
            onCancel={resetAndCloseModal}
            maskClosable={false}
            okText="Update"
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
                <Form.Item
                    label="Title"
                    name="mainText"
                    rules={[
                        { required: true, message: 'Please input the title!' },
                        { min: 2, message: 'Title must be at least 2 characters.' },
                        { max: 100, message: 'Title must be at most 100 characters.' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Author"
                    name="author"
                    rules={[
                        { required: true, message: 'Please input the author!' },
                        { min: 2, message: 'Author must be at least 2 characters.' },
                        { max: 50, message: 'Author must be at most 50 characters.' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        { required: true, message: 'Please input the price!' },
                        { type: 'number', min: 0, message: 'Price must be a positive number.' }
                    ]}
                >
                    <InputNumber
                        suffix="VND"
                        style={{ width: "100%" }}
                        formatter={formatter}
                    />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select a category!' }]}
                >
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
                <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[
                        { required: true, message: 'Please input the quantity!' },
                        { pattern: /^\d+$/, message: 'Quantity must be a positive integer.' },
                        { validator: (_, value) => value && Number(value) >= 0 ? Promise.resolve() : Promise.reject('Quantity must be >= 0') }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Sold"
                    name="sold"
                    rules={[
                        { pattern: /^\d*$/, message: 'Sold must be a non-negative integer.' },
                        { validator: (_, value) => value === undefined || value === "" || Number(value) >= 0 ? Promise.resolve() : Promise.reject('Sold must be >= 0') }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Slider"
                    name="slider"
                    rules={[
                        { required: false },
                        { max: 500, message: 'Slider value too long.' },
                        {
                            validator: (_, value) => {
                                // Accept empty, array, or comma-separated string
                                if (!value || Array.isArray(value)) return Promise.resolve();
                                if (typeof value === 'string') return Promise.resolve();
                                return Promise.reject('Slider must be a string or array');
                            }
                        }
                    ]}
                >
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
    );

}
export default UpdateBookModal;