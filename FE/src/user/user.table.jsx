import { Table } from "antd";
import { fetchAllUserAPI } from "../services/api.service";
import { useEffect, useState } from "react";

const UserTable = () => {

    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => {
        console.log('Component UserTable mounted');
        loadUser();
    }, []);

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

    const loadUser = async () => {
        const res = await fetchAllUserAPI()
        setDataUsers(res.data);
    }

    return (
        <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
    )
}

export default UserTable;