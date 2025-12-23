import { createContext, useState } from "react";

export const AuthContext = createContext({
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: ""
});

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    });

    const [appLoading, setAppLoading] = useState(true);

    return (
        <AuthContext.Provider value={{ user, setUser, appLoading, setAppLoading }}>
            {props.children}
        </AuthContext.Provider>
    );
}