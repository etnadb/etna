"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenizer = exports.getTokens = void 0;
var commandsRegex = {
  SET: /^SET/,
  GET: /^GET/
};
var keyRegex = {
  plain: /^\w*\:$/i
};
var typeRegex = {
  string: /^&string/,
  integer: /^&int/,
  "float": /^&float/,
  json: /^&json/
}; // SET &string foo: bar

var getTokens = function getTokens(message) {
  return message.split(" ").map(function (token) {
    return token.replace(/\s/g, "");
  }).filter(function (token) {
    return token !== "";
  });
};

exports.getTokens = getTokens;

var tokenizer = function tokenizer(message) {
  return new Promise(function (resolve, reject) {
    var tokens = getTokens(message);
    if (tokens.length !== 4) reject("malformed query");
  });
};

exports.tokenizer = tokenizer;