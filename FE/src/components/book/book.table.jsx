import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Table } from "antd";
import { useState } from "react";
import BookDetailModal from "./book.modal.detail";

const BookTable = (props) => {

    const { dataBooks, loadBook, current, pageSize, total, setCurrent, setPageSize } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [dataDetail, setDataDetail] = useState(null);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);

    const handleDeleteBook = async (id) => {
        // const res = await deleteBookAPI(id);
        // if (res.data) {
        //     message.success("Delete book successfully");
        //     await loadBook();
        // } else {
        //     notification.error({
        //         message: "Delete Book",
        //         description: JSON.stringify(res.message)
        //     })
        // }
    }

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current);
            }
        }

        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize);
            }
        }
    };

    const columns = [
        {
            title: 'No.',
            render: (_, record, index) => {
                return (
                    <>{(index + 1) + (current - 1) * pageSize}</>
                )
            }
        },
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a
                        href="#"
                        onClick={() => {
                            setDataDetail(record);
                            setIsModalDetailOpen(true);
                        }}
                    >{record._id}</a>
                )
            }
        },
        {
            title: 'Picture',
            dataIndex: 'thumbnail',
            render: (thumbnail) => (
                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${thumbnail ?? ""}`}
                    alt="thumbnail"
                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                />
            )
        },
        {
            title: 'Title',
            dataIndex: 'mainText'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (price) => (`${price?.toLocaleString('vi-VN')} VND`)
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity'
        },
        {
            title: 'Author',
            dataIndex: 'author'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <div style={{ display: "flex", gap: "20px" }}>
                        <EditOutlined
                            onClick={() => {
                                setDataUpdate(record);
                                setIsModalUpdateOpen(true);
                            }}
                            style={{ cursor: "pointer", color: "orange" }}
                        />
                        <Popconfirm
                            title="Delete the book"
                            description="Are you sure to delete this book?"
                            onConfirm={() => handleDeleteBook(record._id)}
                            okText="Yes"
                            cancelText="No"
                            placement="leftTop"
                        >
                            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                        </Popconfirm>
                    </div>
                )
            }
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataBooks}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }
                }
                onChange={onChange}
            />

            <BookDetailModal
                isModalDetailOpen={isModalDetailOpen}
                setIsModalDetailOpen={setIsModalDetailOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                loadBook={loadBook}
            />
        </>
    );
}

export default BookTable;