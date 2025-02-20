import { io } from "socket.io-client";
import {startGame} from "./Game/Game.js";
const socketUrl = new URL("/", window.location.href);

const socket = io(socketUrl.toString()+ "socketNamespace");

let userName = "";
socket.on("connect", () => {
    console.log("connected to socket");
})

// document.getElementById("name-input").addEventListener("keypress", (event) => {
//     if(event.key == 'Enter'){
//         userName = document.getElementById("name-input").value;
//         console.log(userName);
//     } 
// });


startGame();
console.log("game started");