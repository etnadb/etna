import HashTable from "@ronomon/hash-table";

export default class Store {

  constructor() {
    this.table = new Map();
  }

  set(key, value) {
    this.table.set(key, value);
  }

  get(key) {
    return this.table.get(key);
  }

  delete(key) {
    this.table.delete(key);
  }

  exist(key) {
    return this.table.has(key);
  }
}