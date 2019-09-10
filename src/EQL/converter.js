// @flow

type etnaValue = string | number | boolean | null;

export function removeQuotes(value: string): string {
  return value.replace(/^("|')|("|')$/g, "");
}

export function convert ({ value, type }: { [string]: string }): etnaValue {

  const val = removeQuotes(value);

  switch (type) {
    case "bool":
      return val !== "false";
    case "integer":
      return parseInt(val);
    case "float":
      return parseFloat(val);
    case "null":
      return null;
    case "string":
    case "json":
    default:
      return val;
  }

}