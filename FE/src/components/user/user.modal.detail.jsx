import { Button, Drawer } from "antd";
import { useState } from "react";

const UserDetailModal = (props) => {

    const { isModalDetailOpen, setIsModalDetailOpen, dataDetail, setDataDetail } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleCloseModal = () => {
        setIsModalDetailOpen(false);
        setDataDetail(null);
    }

    const handleUploadAvatar = (event) => {
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
    console.log("Selected file:", previewUrl);


    return (
        <Drawer
            width={"30vw"}
            title="User Detail"
            onClose={() => handleCloseModal()}
            open={isModalDetailOpen}
        >
            {dataDetail ?
                <>
                    <p>ID:  {dataDetail._id ?? "-"}</p>
                    <br />
                    <p>Full name:  {dataDetail.fullName ?? "-"}</p>
                    <br />
                    <p>Email:  {dataDetail.email ?? "-"}</p>
                    <br />
                    <p>Phone:  {dataDetail.phone ?? "-"}</p>
                    <br />

                    {/* Current avatar */}
                    <div
                        style={{
                            marginTop: "10px",
                            height: "150px",
                            width: "150px",
                            border: "1px solid #ccc",
                        }}
                    >
                        <img
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar ?? ""}`}
                            alt="User Avatar"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>

                    {/* Upload button */}
                    <div>
                        <label htmlFor="btnUpload" style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "15px",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>Upload avatar</label>
                        <input
                            id="btnUpload"
                            type="file"
                            onChange={(event) => handleUploadAvatar(event)}
                            hidden
                        />
                    </div>

                    {/* Preview of uploaded avatar */}
                    {previewUrl &&
                        <div
                            style={{
                                marginTop: "10px",
                                height: "150px",
                                width: "150px",
                                border: "1px solid #ccc",
                            }}
                        >
                            <img
                                src={previewUrl}
                                alt="User Avatar"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </div>
                    }
                </>
                :
                <>
                    <p>No detail available.</p>
                </>
            }
        </Drawer>
    )
}

export default UserDetailModal;