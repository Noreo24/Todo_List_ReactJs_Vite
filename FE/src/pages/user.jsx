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
            phone: '123-456-7890'
        },
        {
            _id: '2123123',
            fullName: 'Jim Green',
            email: 'jim.green@example.com',
            phone: '987-654-3210'
        }
    ]);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const res = await fetchAllUserAPI()
        // setDataUsers(res.data);
    }

    return (
        <div style={{ padding: "20px" }}>
            <CreateUserModal loadUser={loadUser} />
            <UserTable
                dataUsers={dataUsers}
                loadUser={loadUser}
            />
        </div>
    );
}

export default UserPage;