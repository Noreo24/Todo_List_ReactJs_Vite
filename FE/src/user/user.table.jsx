import { Space, Table, Tag } from "antd";
import { fetchAllUserAPI } from "../services/api.service";
import { useState } from "react";

const UserTable = () => {

    const [dataUsers, setDataUsers] = useState([
        {
            _id: '985643',
            fullname: 'John Brown',
            email: 'john.brown@example.com',
        },
        {
            _id: '2123123',
            fullname: 'Jim Green',
            email: 'jim.green@example.com',
        }
    ]);

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id'
        },
        {
            title: 'Fullname',
            dataIndex: 'fullname'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        }
    ];

    const loadUser = async() => {
        const res = await fetchAllUserAPI()
        // setDataUsers(res.data);
    }

    loadUser();

    return (
        <Table columns={columns} dataSource={dataUsers} />
    )
}

export default UserTable;