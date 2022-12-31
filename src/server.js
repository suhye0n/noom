import http from "http";
import SocketIO from "socket.io";
// import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpserver = http.createServer(app);
const wsServer = SocketIO(httpserver);

wsServer.on("connection", socket => {
    console.timeLog(socket);
});

// const wss = new WebSocket.Server({server});

// function onSocketClose() {
//     console.log("Disconnected from the Browser")
// }

// const sockets= [];

// wss.on("connection", (socket) => {
//     sockets.push(socket);
//     socket["nickname"] = "익명";
//     console.log("Connected to Browser");
//     socket.on("close", onSocketClose)
//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg);
//         switch(message.type) {
//             case "new_message":
//                 sockets.forEach((aSocket) =>
//                     aSocket.send(`${socket.nickname}: ${message.payload}`)
//                 );
//                 break;
//             case "nickname":
//                 socket["nickname"] = message.payload;
//                 break;
//         }
//     });
// });

const handleListen = () => console.log(`Listening on http://localhost:3000`)
httpserver.listen(3000, handleListen);
