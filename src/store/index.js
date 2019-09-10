import { convert as convertTypeVal } from "../EQL/converter";

export default class Store {

  constructor() {
    this.table = new Map();
  }

  set({ key, value, type }) {
    this.table.set(key, convertTypeVal({ value, type }));
    return "OK."
  }

  get(key) {
    return this.table.get(key);
  }

  delete(key) {
    this.table.delete(key);
    return "OK."
  }

  exist(key) {
    return this.table.has(key);
  }
}