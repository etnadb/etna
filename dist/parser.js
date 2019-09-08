"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenizer = exports.getCommand = exports.getTokens = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var getCommand = function getCommand(token) {
  return new Promise(function (resolve, reject) {
    var availableCommands = Object.keys(commandsRegex);

    for (var _i = 0, _availableCommands = availableCommands; _i < _availableCommands.length; _i++) {
      var command = _availableCommands[_i];
      // $FlowFixMe
      if (commandsRegex[command].test(token)) resolve({
        command: command
      });
    }

    reject("".concat(token, " is not a valid command. Valid commands are: ").concat(availableCommands.join(", ")));
  });
};

exports.getCommand = getCommand;

var tokenizer = function tokenizer(message) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, reject) {
      var tokens, command;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              tokens = getTokens(message);
              if (tokens.length !== 4) reject("malformed query");
              _context.next = 5;
              return getCommand(tokens[0]);

            case 5:
              command = _context.sent;
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.tokenizer = tokenizer;