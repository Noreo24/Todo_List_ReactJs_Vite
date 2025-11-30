import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    };
    // Hoặc data = { fullName, email, password, phone }
    return axios.post(URL_BACKEND, data);
}

const updateUserAPI = (_id, fullName, email, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        fullName: fullName,
        email: email,
        phone: phone
    };
    return axios.put(URL_BACKEND, data);
}

const fetchAllUserAPI = () => {
    const URL_BACKEND = "/api/v1/user";
    return axios.get(URL_BACKEND);
}

const deleteUserAPI = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`;
    return axios.delete(URL_BACKEND);
}

export {
    createUserAPI,
    updateUserAPI,
    fetchAllUserAPI,
    deleteUserAPI
}