import axios from "axios";
import config from "../config.json";

const instance = axios.create({
    baseURL: config.SERVER_URL
});

instance.interceptors.request.use((config)=>{
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
})

export default instance;