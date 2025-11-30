import { Drawer } from "antd";
import { useEffect } from "react";

const UserDetailModal = (props) => {

    const { isModalDetailOpen, setIsModalDetailOpen, dataDetail, setDataDetail } = props;

    const handleCloseModal = () => {
        setIsModalDetailOpen(false);
        setDataDetail(null);
    }

    return (
        <Drawer
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