import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Link } from "react-router-dom";
import { Button, Result } from "antd";

const PrivateRoute = (props) => {

    const { user } = useContext(AuthContext);

    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        );
    }

    return (
        <Result
            status="403"
            title="Unauthorized!"
            subTitle={"You don't have access to this page. Please login to continue."}
            extra={
                <Button type="primary">
                    <Link to="/login">
                        <span>Go to Login</span>
                    </Link>
                </Button>
            }
        />
    );
}

export default PrivateRoute;