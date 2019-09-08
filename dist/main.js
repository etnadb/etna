"use strict";

var _ws = _interopRequireDefault(require("ws"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _store = _interopRequireDefault(require("./store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var server = new _ws["default"].Server({
  port: process.env.ETNA_PORT || 3333
});
server.on("connection", function (socket) {
  var store = new _store["default"]();
  socket.on("message", function (message) {
    switch (true) {
      case /^SET\s*./.test(message):
        return store.set();
    }
  });
});