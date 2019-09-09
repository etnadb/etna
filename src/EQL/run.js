import { buildAST } from "./AST";

export default ({ store, message }) => (
  new Promise(async (resolve, reject) => {

    try {
      const { 
        key, 
        value, 
        type, 
        command 
      } = await buildAST(message);

      switch (command) {
        case "SET":
          resolve(store.set({ key, value, type }));
          break;
        case "DELETE": 
          resolve(store.delete(key));
          break;
        case "GET":    
          resolve(store.get(key));
          break;
        case "EXIST":  
          resolve(store.exist(key));
          break;
      }
    }

    catch (err) {
      reject(err);
    }

  })
)