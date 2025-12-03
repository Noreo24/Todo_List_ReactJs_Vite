import { Link, useRouteError } from "react-router-dom";
import { Button, Result } from 'antd';

export default function ErrorPage() {
    const error = useRouteError();
    return (
        <Result
            status="403"
            title="Oops!"
            subTitle={error.statusText || error.message}
            extra={
                <Button type="primary">
                    <Link to="/">
                        <span>Back to homepage !</span>
                    </Link>
                </Button>
            }
        />
    );
}