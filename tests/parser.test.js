const parser = require("../src/EQL/parser");

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
  parser.getCommand("get")   .then(res => expect(res.command).toBe("GET"));
  parser.getCommand("SET")   .then(res => expect(res.command).toBe("SET"));
  parser.getCommand("set")   .then(res => expect(res.command).toBe("SET"));
  parser.getCommand("DELETE").then(res => expect(res.command).toBe("DELETE"));
  parser.getCommand("delete").then(res => expect(res.command).toBe("DELETE"));
  parser.getCommand("EXIST") .then(res => expect(res.command).toBe("EXIST"));
  parser.getCommand("exist") .then(res => expect(res.command).toBe("EXIST"));

  parser.getCommand("FOO")
        .then()
        .catch((err) => expect(err).toBeDefined());

  parser.getCommand("&string")
        .then()
        .catch((err) => expect(err).toBeDefined());

  parser.getCommand("'value'")
        .then()
        .catch((err) => expect(err).toBeDefined());

});

test("Testing `getType` function", () => {

  parser.getType("&string")  .then(res => expect(res.type).toBe("string"));
  parser.getType("&int")     .then(res => expect(res.type).toBe("integer"));
  parser.getType("&integer") .then(res => expect(res.type).toBe("integer"));
  parser.getType("&float")   .then(res => expect(res.type).toBe("float"));
  parser.getType("&json")    .then(res => expect(res.type).toBe("json"));
  parser.getType("&null")    .then(res => expect(res.type).toBe("null"));
  parser.getType("&bool")    .then(res => expect(res.type).toBe("bool"));

  parser.getType("&s").then(res => expect(res.type).toBe("string"));
  parser.getType("&i")   .then(res => expect(res.type).toBe("integer"));
  parser.getType("&f") .then(res => expect(res.type).toBe("float"));
  parser.getType("&j")  .then(res => expect(res.type).toBe("json"));
  parser.getType("&n")  .then(res => expect(res.type).toBe("null"));
  parser.getType("&b")  .then(res => expect(res.type).toBe("bool"));

  parser.getType("&random")
        .then()
        .catch((err) => {
          expect(err).toBe("&random is not a valid type. Valid types are: string, integer, float, json, null, bool");
          expect(err).toBeDefined();
        });

  parser.getType("0:A")
        .then()
        .catch((err) => {
          expect(err).toBe("0:A is not a valid type. Valid types are: string, integer, float, json, null, bool");
          expect(err).toBeDefined();
        });

});

test("Testing `getKey` function", () => {

  parser.getKey("name")    .then((res) => expect(res.key).toBe("name"));
  parser.getKey("lastName").then((res) => expect(res.key).toBe("lastName"));
  parser.getKey("foo")     .then((res) => expect(res.key).toBe("foo"));
  parser.getKey("key")     .then((res) => expect(res.key).toBe("key"));
  parser.getKey("value")   .then((res) => expect(res.key).toBe("value"));
  
  parser.getKey("'value'")
    .then()
    .catch((err) => {
      expect(err).toBeDefined();
      expect(err).toBe("Invalid key: 'value'");
    });

  parser.getKey("&name")
    .then()
    .catch((err) => {
      expect(err).toBeDefined();
      expect(err).toBe("Invalid key: &name");
    });

  parser.getKey("name space")
    .then()
    .catch((err) => {
      expect(err).toBeDefined();
      expect(err).toBe("Invalid key: name space");
    });
  
  parser.getKey("^foo")
    .then()
    .catch((err) => {
      expect(err).toBeDefined();
      expect(err).toBe("Invalid key: ^foo");
    });

});

test("Testing `getValue` function", () => {

  parser.getValue(`"mitch"`)           .then((res) => expect(res.value).toBe(`"mitch"`));
  parser.getValue(`'val'`)             .then((res) => expect(res.value).toBe(`'val'`));
  parser.getValue(`'00'`)              .then((res) => expect(res.value).toBe(`'00'`));
  parser.getValue(`"0.19"`)            .then((res) => expect(res.value).toBe(`"0.19"`));
  parser.getValue(`'{"foo": "bar"}'`)  .then((res) => expect(res.value).toBe(`'{"foo": "bar"}'`));

  parser.getValue("value")
    .then()
    .catch((err) => {
      expect(err).toBe("Invalid value: value");
      expect(err).toBeDefined();
    });

  parser.getValue("name")
    .then()
    .catch((err) => {
      expect(err).toBeDefined();
      expect(err).toBe("Invalid value: name");
    })
  
  parser.getValue(`name&"`)
    .then()
    .catch((err) => {
      expect(err).toBeDefined();
      expect(err).toBe("Invalid value: name&\"");
    });
  
  parser.getValue("'asd")
    .then()
    .catch((err) => {
      expect(err).toBeDefined();
      expect(err).toBe("Invalid value: 'asd");
    });

});