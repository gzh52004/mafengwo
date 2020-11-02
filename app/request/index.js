import axios from "axios"
let base = "http://47.107.122.219:6999"
let request = axios.create({
    baseURL:base
})

export default request
    