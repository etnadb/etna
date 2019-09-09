const parser = require("../dist/DSL/parser");
require("regenerator-runtime");

test("Testing `getTokens` function", () => {

  const command1 = `SET &int age: 10`;
  const command2 = `GET age`;
  const command3 = `SET    &string    name:     "mitch"`;
  const command4 = `GET     name`;
  const command5 = `wrong command test`;

  const tokens1 = parser.getTokens(command1);
  const tokens2 = parser.getTokens(command2);
  const tokens3 = parser.getTokens(command3);
  const tokens4 = parser.getTokens(command4);
  const tokens5 = parser.getTokens(command5);

  expect(tokens1.length).toBe(4);
  expect(tokens2.length).toBe(2);
  expect(tokens3.length).toBe(4);
  expect(tokens4.length).toBe(2);
  expect(tokens5.length).toBe(3);

  expect(tokens1[0]).toBe("SET");
  expect(tokens1[1]).toBe("&int");
  expect(tokens1[2]).toBe("age:");
  expect(tokens1[3]).toBe("10");

  expect(tokens2[0]).toBe("GET");
  expect(tokens2[1]).toBe("age");

  expect(tokens3[0]).toBe("SET");
  expect(tokens3[1]).toBe("&string");
  expect(tokens3[2]).toBe("name:");
  expect(tokens3[3]).toBe(`"mitch"`);

  expect(tokens4[0]).toBe("GET");
  expect(tokens4[1]).toBe("name");

  expect(tokens5[0]).toBe("wrong");
  expect(tokens5[1]).toBe("command");
  expect(tokens5[2]).toBe("test");
});

test("Testing `getCommand` function", () => {

  parser.getCommand("GET")   .then(res => expect(res.command).toBe("GET"));
  parser.getCommand("SET")   .then(res => expect(res.command).toBe("SET"));
  parser.getCommand("DELETE").then(res => expect(res.command).toBe("DELETE"));

  parser.getCommand("FOO")
        .then()
        .catch((err) => expect(err).toBeDefined())

});

test("Testing `getType` function", () => {

  parser.getType("&string").then(res => expect(res.type).toBe("string"));
  parser.getType("&int")   .then(res => expect(res.type).toBe("integer"));
  parser.getType("&float") .then(res => expect(res.type).toBe("float"));
  parser.getType("&json")  .then(res => expect(res.type).toBe("json"));
  parser.getType("&null")  .then(res => expect(res.type).toBe("null"));

  parser.getType("&random")
        .then()
        .catch((err) => expect(err).toBeDefined())

});

test("Testing `isValidKey` function", () => {

  expect(parser.isValidKey("name:"))    .toBeTruthy();

  parser.isValidKey("name:")    .then((res) => expect(res.key).toBe("name"))
  parser.isValidKey("lastName:").then((res) => expect(res.key).toBe("lastName"))
  parser.isValidKey("foo:")     .then((res) => expect(res.key).toBe("foo"))
  parser.isValidKey("key:")     .then((res) => expect(res.key).toBe("key"))
  parser.isValidKey("value:")   .then((res) => expect(res.key).toBe("value"))
  
  parser.isValidKey("value")  .then().catch((err) => expect(err).toBeDefined())
  parser.isValidKey("name")   .then().catch((err) => expect(err).toBeDefined())
  parser.isValidKey("name&")  .then().catch((err) => expect(err).toBeDefined())
  parser.isValidKey("&asd")   .then().catch((err) => expect(err).toBeDefined())

});

test("Testing `isValidValue` function", () => {

  parser.isValidValue(`"mitch"`)           .then((res) => expect(res.value).toBe(`"mitch"`))
  parser.isValidValue(`'val'`)             .then((res) => expect(res.value).toBe(`'val'`))
  parser.isValidValue(`'00'`)              .then((res) => expect(res.value).toBe(`'00'`))
  parser.isValidValue(`"0.19"`)            .then((res) => expect(res.value).toBe(`"0.19"`))
  parser.isValidValue(`'{"foo": "bar"}'`)  .then((res) => expect(res.value).toBe(`'{"foo": "bar"}'`))

  parser.isValidValue("value")  .then().catch((err) => expect(err).toBeDefined())
  parser.isValidValue("name")   .then().catch((err) => expect(err).toBeDefined())
  parser.isValidValue(`name&"`) .then().catch((err) => expect(err).toBeDefined())
  parser.isValidValue("'asd")   .then().catch((err) => expect(err).toBeDefined())

});