import axios from "axios";

export const APIURL = "https://chat-app-ralph.herokuapp.com/api"
export const SERVERURL = "https://chat-app-ralph.herokuapp.com"

const api = axios.create({
    baseURL: APIURL
})

export default api