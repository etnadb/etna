// @flow
import WebSocket from "ws";
import dotenv from "dotenv";
import Store from "./store";
import runEQL from "./EQL/run";

dotenv.config();

const server = new WebSocket.Server({
  port: process.env.ETNA_PORT || 3333
});

const store = new Store();

server.on("connection", (socket) => {

  socket.on("message", async (message) => {

    try {
      const res = await runEQL({ store, message });
      socket.send(`${res}`);
    }

    catch (err) {
      console.error(err);
      socket.send(err);
    }

  });

});