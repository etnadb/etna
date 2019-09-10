const { convert } = require("../src/EQL/converter");

test("Testing `converter`", () => {

  expect(convert({ value: `"Foo bar baz"`, type: "string" })).toBe("Foo bar baz");
  expect(convert({ value: `"Foo 'bar' baz"`, type: "string" })).toBe("Foo 'bar' baz");
  expect(convert({ value: `"'Foo' 'bar' 'baz'"`, type: "string" })).toBe("'Foo' 'bar' 'baz'");

  expect(convert({ value: `"12"`, type: "integer" })).toBe(12);
  expect(convert({ value: `"193"`, type: "integer" })).toBe(193);
  expect(convert({ value: `"-15"`, type: "integer" })).toBe(-15);

  expect(convert({ value: `"2.3"`, type: "float" })).toBe(2.3);
  expect(convert({ value: `"0.019293"`, type: "float" })).toBe(0.019293);
  expect(convert({ value: `"-91283.2384"`, type: "float" })).toBe(-91283.2384);

  expect(convert({ value: `"true"`, type: "bool" })).toBeTruthy();
  expect(convert({ value: `"false"`, type: "bool" })).toBeFalsy();
  
  expect(convert({ value: `"foooo"`, type: "null" })).toBe(null);
  expect(convert({ value: ``, type: "null" })).toBe(null);
  
  expect(convert({ value: `'{"foo": "bar"}'`, type: "json" })).toBe('{"foo": "bar"}');
});