#!/usr/bin/env node

// @flow
import WebSocket from "ws";
import dotenv    from "dotenv";
import Store     from "./store";
import runEQL    from "./EQL/run";

dotenv.config();

const PORT = process.env.ETNA_PORT || 3999;

const server = new WebSocket.Server({ port: PORT });

const store = new Store();

console.log(`Etna server ready on port ${PORT}`);

server.on("connection", (socket) => {
  socket.on("message", async (message) => {
    try {
      const res = await runEQL({ store, message });
      socket.send(`${res}`);
    }
    catch (err) {
      socket.send(err.toString());
    }
  });
});