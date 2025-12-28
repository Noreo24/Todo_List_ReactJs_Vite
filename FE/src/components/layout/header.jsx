import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BookOutlined, DownOutlined, HomeOutlined, IdcardOutlined, LoginOutlined, SettingOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, message } from 'antd'
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';

const Header = () => {

    const [current, setCurrent] = useState("");
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const onClick = e => {
        setCurrent(e.key);
    };

    const logout = async () => {
        const response = await logoutAPI();
        if (response.data) {
            // Clear user info in context and remove token in localStorage
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            });
            message.success("Logout successful!");

            // Redirect to home page
            navigate("/");
        } else {
            message.error("Logout failed!");
        }
    }

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: "home",
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: "users",
            icon: <UserOutlined />,
            // disabled: true,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: "books",
            icon: <BookOutlined />,
        },
        ...(!user.id ? [{
            label: <Link to={"/login"}>Login</Link>,
            key: "login",
            icon: <LoginOutlined />,
        }] : [
            {
                label:
                    <span>
                        <IdcardOutlined style={{ marginRight: 6 }} />
                        Welcome, <b>{user.fullName}</b>
                        <DownOutlined style={{ marginLeft: 6, fontSize: 10 }} />
                    </span>
                ,
                key: "settings",
                // icon: <IdcardOutlined />,
                children: [
                    {
                        label: <span onClick={() => logout()}>Logout</span>,
                        key: "logout",
                    }
                ]
            }
        ]),
    ];

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />
    )
    // Dùng thẻ <a></a> để tạo link chuyển trang nhưng sẽ load lại toàn bộ trang
    // Cách tốt hơn là dùng Link hoặc NavLink của react-router-dom
    // Dùng NavLink thay vì Link để có thể thêm class active khi trang đang ở đường dẫn đó
    // <ul className="header">
    //     <li className="header-item"><NavLink to="/">Home</NavLink></li>
    //     <li className="header-item"><NavLink to="/users">Users</NavLink></li>
    //     <li className="header-item"><NavLink to="/books">Books</NavLink></li>
    // </ul>
    // Nhưng không cần thiết vì đã có Menu của antd
}

export default Header