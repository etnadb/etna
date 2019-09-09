const AST = require("../dist/EQL/AST");

test("Testing `buildAST` function", async () => {

  const ast1 = await AST.buildAST("SET &string name 'Mitch'");
  const ast2 = await AST.buildAST("GET name");
  const ast3 = await AST.buildAST("DELETE name");

  expect(ast1.command).toBe("SET");
  expect(ast1.type)   .toBe("string");
  expect(ast1.key)    .toBe("name");
  expect(ast1.value)  .toBe("'Mitch'");

  expect(ast2.command).toBe("GET");
  expect(ast2.key)    .toBe("name");
  
  expect(ast3.command).toBe("DELETE");
  expect(ast3.key)    .toBe("name");

});