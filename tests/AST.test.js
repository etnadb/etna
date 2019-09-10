const AST = require("../src/EQL/AST");

test("Testing `buildAST` function", async () => {

  const ast1 = await AST.buildAST("SET &string name 'Mitch'");
  const ast2 = await AST.buildAST("GET name");
  const ast3 = await AST.buildAST("DELETE name");
  const ast4 = await AST.buildAST("EXIST name");

  expect(ast1.command).toBe("SET");
  expect(ast1.type)   .toBe("string");
  expect(ast1.key)    .toBe("name");
  expect(ast1.value)  .toBe("'Mitch'");

  expect(ast2.command).toBe("GET");
  expect(ast2.key)    .toBe("name");
  
  expect(ast3.command).toBe("DELETE");
  expect(ast3.key)    .toBe("name");

  expect(ast4.command).toBe("EXIST");
  expect(ast4.key)    .toBe("name");

  AST.buildAST("ERR &string name 'Mitch'")
    .then()
    .catch((err) => {
      expect(err).toBeDefined();
    });

  AST.buildAST("SET &err name 'Mitch'")
    .then()
    .catch((err) => {
      expect(err).toBeDefined();
    });

  AST.buildAST("SET &string &name 'Mitch'")
    .then()
    .catch((err) => {
      expect(err).toBeDefined();
    });

  AST.buildAST("SET &string name err")
    .then()
    .catch((err) => {
      expect(err).toBeDefined();
    });

});

test("Testing `buildExistInstruction` function", async () => {

  const i1 = await AST.buildExistInstruction(["EXIST", "name"]);
  const i2 = await AST.buildExistInstruction(["EXIST", "age"]);

  expect(i1.command).toBe("EXIST");
  expect(i1.key)    .toBe("name");

  expect(i2.command).toBe("EXIST");
  expect(i2.key)    .toBe("age");

  AST.buildExistInstruction(["ERR", "name"])
    .then()
    .catch((err) => expect(err).toBeDefined());

  AST.buildExistInstruction(["EXIST", "&err"])
    .then()
    .catch((err) => expect(err).toBeDefined());

});

test("Testing `buildDeleteInstruction` function", async () => {

  const i1 = await AST.buildDeleteInstruction(["DELETE", "name"]);
  const i2 = await AST.buildDeleteInstruction(["DELETE", "age"]);

  expect(i1.command).toBe("DELETE");
  expect(i1.key)    .toBe("name");

  expect(i2.command).toBe("DELETE");
  expect(i2.key)    .toBe("age");

  AST.buildDeleteInstruction(["ERR", "name"])
    .then()
    .catch((err) => expect(err).toBeDefined());

  AST.buildDeleteInstruction(["DELETE", "&err"])
    .then()
    .catch((err) => expect(err).toBeDefined());

});

test("Testing `buildGetInstruction` function", async () => {

  const i1 = await AST.buildGetInstruction(["GET", "name"]);
  const i2 = await AST.buildGetInstruction(["GET", "age"]);

  expect(i1.command).toBe("GET");
  expect(i1.key)    .toBe("name");

  expect(i2.command).toBe("GET");
  expect(i2.key)    .toBe("age");

  AST.buildGetInstruction(["ERR", "name"])
    .then()
    .catch((err) => expect(err).toBeDefined());

  AST.buildGetInstruction(["GET", "&err"])
    .then()
    .catch((err) => expect(err).toBeDefined());

});

test("Testing `buildSetInstruction` function", async () => {

  const i1 = await AST.buildSetInstruction(["SET", "&string", "name", '"Mitch"']);
  const i2 = await AST.buildSetInstruction(["SET", "&int", "age", '"11"']);

  expect(i1.command).toBe("SET");
  expect(i1.key)    .toBe("name");
  expect(i1.type)   .toBe("string");
  expect(i1.value)  .toBe('"Mitch"');

  expect(i2.command).toBe("SET");
  expect(i2.key)    .toBe("age");
  expect(i2.type)   .toBe("integer");
  expect(i2.value)  .toBe('"11"');

  AST.buildSetInstruction(["ERR", "&int", "age", '"11"'])
    .then()
    .catch((err) => {
      expect(err).toBeDefined();
    });

  AST.buildSetInstruction(["SET", "&err", "age", '"11"'])
    .then()
    .catch((err) => {
        expect(err).toBeDefined();
        expect(err).toBe("Parser error => &err is not a valid type. Valid types are: string, integer, float, json, null, bool");
      });

  AST.buildSetInstruction(["SET", "&string", "&ERR", '"11"'])
    .then()
    .catch((err) => {
        expect(err).toBeDefined();
        expect(err).toBe("Parser error => Invalid key: &ERR");
      });

  AST.buildSetInstruction(["SET", "&string", "name", 'ERROR'])
    .then()
    .catch((err) => {
        expect(err).toBeDefined();
        expect(err).toBe("Parser error => Invalid value: ERROR");
      });

});