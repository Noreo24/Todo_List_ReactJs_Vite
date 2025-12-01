import { Button, Drawer } from "antd";
import { useEffect } from "react";

const UserDetailModal = (props) => {

    const { isModalDetailOpen, setIsModalDetailOpen, dataDetail, setDataDetail } = props;

    const handleCloseModal = () => {
        setIsModalDetailOpen(false);
        setDataDetail(null);
    }

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
                    <div>
                        <img src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar ?? ""}`} alt="User Avatar" style={{ width: "100%" }} />
                    </div>
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
                        <input id="btnUpload" type="file" hidden />
                    </div>
                    {/* <Button type="primary">Upload avatar</Button> */}
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