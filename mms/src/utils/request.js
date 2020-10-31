import axios from 'axios';

const baseUrl = 'http://47.107.122.219:6999'

const request = axios.create({
    baseURL: baseUrl
})


export default request;