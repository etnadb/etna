import { buildAST } from "./AST";

export default ({ store, message }) => (
  new Promise(async (resolve, reject) => {

    try {
      const command = await buildAST(message);

      switch (command.command) {
        case "SET":
          store.set(command.key, command.value);
          resolve("OK.");
          break;
        case "DELETE": 
          store.delete(command.key);
          resolve("OK.");
          break; 
        case "GET":    return resolve(store.get(command.key)); 
        case "EXIST":  return resolve(store.exist(command.key)); 
      }
    }

    catch (err) {
      reject(err);
    }

  })
)