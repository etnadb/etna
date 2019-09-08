// @flow
import WebSocket from "ws";
import dotenv from "dotenv";
import Store from "./store";

dotenv.config();

const server = new WebSocket.Server({
  port: process.env.ETNA_PORT || 3333
});

server.on("connection", (socket): void => {

  const store = new Store();

  socket.on("message", (message): void => {

    switch (true) {
      case /^SET\s*./.test(message):
        return store.set()
    }

  });

});