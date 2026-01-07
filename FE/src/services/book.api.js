import axios from "./axios.customize";

const fetchAllBookAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

const createBookAPI = (mainText, author, price, category, quantity, slider, sold, thumbnail) => {
    const URL_BACKEND = `/api/v1/book`;
    const data = {
        mainText: mainText,
        author: author,
        price: price,
        category: category,
        quantity: quantity,
        slider: slider,
        sold: sold,
        thumbnail: thumbnail
    };
    return axios.post(URL_BACKEND, data);
}


const updateBookAPI = (id, mainText, author, price, category, quantity, slider, sold, thumbnail) => {
    const URL_BACKEND = `/api/v1/book/${id}`;
    const data = {
        mainText: mainText,
        author: author,
        price: price,
        category: category,
        quantity: quantity,
        slider: slider,
        sold: sold,
        thumbnail: thumbnail
    };
    return axios.put(URL_BACKEND, data);
}

const deleteBookAPI = (id) => {
    const URL_BACKEND = `/api/v1/book/${id}`;
    return axios.delete(URL_BACKEND);
}


export {
    fetchAllBookAPI,
    createBookAPI,
    updateBookAPI,
    deleteBookAPI
}