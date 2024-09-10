import axios from "axios";
import { io } from "socket.io-client";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 15000
})

const socket = io(import.meta.env.VITE_SOCKET_URL, { autoConnect: false, withCredentials: true })

export { api, socket }
