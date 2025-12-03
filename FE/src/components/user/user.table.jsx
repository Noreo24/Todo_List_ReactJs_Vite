import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Table } from "antd";
import UpdateUserModal from "./user.modal.update";
import { useState } from "react";
import UserDetailModal from "./user.modal.detail";
import { deleteUserAPI } from "../../services/api.service";

const UserTable = (props) => {

    const { dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [dataDetail, setDataDetail] = useState(null);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);

    const columns = [
        {
            title: 'No.',
            render: (_, record, index) => {
                return (
                    <>
                        {index + 1}
                    </>
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
            title: 'Full name',
            dataIndex: 'fullName'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Phone',
            dataIndex: 'phone'
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
                            title="Delete the user"
                            description="Are you sure to delete this user?"
                            onConfirm={() => handleDeleteUser(record._id)}
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

    const handleDeleteUser = async (id) => {
        const res = await deleteUserAPI(id);
        if (res.data) {
            notification.success({
                message: "Delete User",
                description: "User deleted successfully!"
            })
            await loadUser();
        } else {
            notification.error({
                message: "Delete User",
                description: JSON.stringify(res.message)
            })
        }
    }

    const onChange = (pagination, filters, sorter, extra) => {
        setCurrent(pagination.current);
        setPageSize(pagination.pageSize);
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
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
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <UserDetailModal
                isModalDetailOpen={isModalDetailOpen}
                setIsModalDetailOpen={setIsModalDetailOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                loadUser={loadUser}
            />
        </>
    )
}

export default UserTable;