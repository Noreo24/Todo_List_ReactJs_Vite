import { Link, NavLink } from 'react-router-dom'
import { BookOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd'
import { useState } from 'react';

const Header = () => {

    const [current, setCurrent] = useState("");
    const onClick = e => {
        console.log("click ", e);
        setCurrent(e.key);
    };

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
        }
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