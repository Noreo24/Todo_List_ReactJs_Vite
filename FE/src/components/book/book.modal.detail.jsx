import { Drawer } from "antd";
import { useState } from "react";

const BookDetailModal = (props) => {

    const { isModalDetailOpen, setIsModalDetailOpen, dataDetail, setDataDetail, loadBook } = props;

    const handleCloseModal = () => {
        setIsModalDetailOpen(false);
        setDataDetail(null);
    }

    return (
        <Drawer
            width={"30vw"}
            title="Book Detail"
            onClose={() => handleCloseModal()}
            open={isModalDetailOpen}
        >
            {dataDetail ?
                <>
                    <p>ID:  {dataDetail._id ?? "-"}</p>
                    <br />
                    <p>Title:  {dataDetail.mainText ?? "-"}</p>
                    <br />
                    <p>Author:  {dataDetail.author ?? "-"}</p>
                    <br />
                    <p>Price:  {`${dataDetail.price?.toLocaleString('vi-VN')} VND`}</p>
                    <br />
                    <p>Sold:  {dataDetail.sold ?? "-"}</p>
                    <br />
                    <p>Quantity:  {dataDetail.quantity ?? "-"}</p>
                    <br />
                    <p>Category:  {dataDetail.category ?? "-"}</p>
                    <br />

                    <div
                        style={{
                            marginTop: "10px",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <img
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail ?? ""}`}
                            alt="Book Thumbnail"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>
                </>
                :
                <>
                    <p>No detail available.</p>
                </>
            }
        </Drawer>
    );
}

export default BookDetailModal;