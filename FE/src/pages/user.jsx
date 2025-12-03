import CreateUserModal from "../components/user/user.modal.create";
import UserTable from "../components/user/user.table";
import { useEffect, useState } from "react";
import { fetchAllUserAPI } from "../services/api.service";

const UserPage = () => {

    const [dataUsers, setDataUsers] = useState([
        {
            _id: '985643',
            fullName: 'John Brown',
            email: 'john.brown@example.com',
            avatar: 'ee11cbb19052e40b07aac0ca060c23ee.png'
        },
        {
            _id: '2123123',
            fullName: 'Jim Green',
            email: 'jim.green@example.com',
            phone: '987-654-3210',
            avatar: '21232f297a57a5a743894a0e4a801fc3.png'
        }
    ]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const res = await fetchAllUserAPI(current, pageSize);
        if (res.data) {
            setDataUsers(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <CreateUserModal loadUser={loadUser} />
            <UserTable
                dataUsers={dataUsers}
                loadUser={loadUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
            />
        </div>
    );
}

export default UserPage;