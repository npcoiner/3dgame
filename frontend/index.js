import { io } from "socket.io-client";

const socketUrl = new URL("/", window.location.href);

const socket = io(socketUrl.toString()+ "socketNamespace");

let userName = "";
socket.on("connect", () => {
    console.log("connected to socket");
})