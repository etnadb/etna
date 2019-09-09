// @flow

type etnaValue = string | number | boolean | null;

export default  ({ value, type }: { [string]: string }): etnaValue => {

  switch (type) {
    case "bool":
      return Boolean(value);
    case "integer":
      return parseInt(value);
    case "float":
      return parseFloat(value);
    case "null":
      return null;
    case "string":
    case "json":
    default:
      return value.replace(/^["|']|["|']/g, "");
  }

}