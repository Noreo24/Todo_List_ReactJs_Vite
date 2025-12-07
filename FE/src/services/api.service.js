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

const updateUserAvatarAPI = (avatar, _id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        avatar: avatar,
        fullName: fullName,
        phone: phone
    };
    return axios.put(URL_BACKEND, data);
}

const fetchAllUserAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

const deleteUserAPI = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`;
    return axios.delete(URL_BACKEND);
}

const uploadFileAPI = (file, folder) => {
    const URL_BACKEND = `/api/v1/file/upload`;
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data"
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    return axios.post(URL_BACKEND, bodyFormData, config);
}

const registerAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    };
    // Hoặc data = { fullName, email, password, phone }
    return axios.post(URL_BACKEND, data);
}

export {
    createUserAPI,
    updateUserAPI,
    fetchAllUserAPI,
    deleteUserAPI,
    uploadFileAPI,
    updateUserAvatarAPI,
    registerAPI
}