// @flow

type tokenTypeCheck = { [string]: RegExp };

type ASTObj = { [string]: string };

const commandsRegex: tokenTypeCheck = {
  SET:    /^SET/,
  GET:    /^GET/,
  DELETE: /^DELETE/
};

const typeRegex: tokenTypeCheck = {
  string:  /^&string/,
  integer: /^&int/,
  float:   /^&float/,
  json:    /^&json/,
  null:    /^&null/
};

const keyRegex:   RegExp = /^\w*\:$/i;
const valueRegex: RegExp = /^["|'].+["|']$/;

/**
 * @function getTokens
 * @param {string} message
 * @returns {string[]}
 */
export const getTokens = (message: string): string[] => (
  message
    .split(" ")
    .map(token => token.replace(/\s/g, ""))
    .filter(token => token !== "")
)

/**
 * @function getCommand
 * @param {string} message
 * @returns {Promise<ASTObj>}
 */
export const getCommand = (token: string): Promise<ASTObj> => {
  return new Promise((resolve, reject) => {

    const availableCommands = Object.keys(commandsRegex);

    for (const command of availableCommands)
      if (commandsRegex[command].test(token))
        resolve({ command })

    reject(`${token} is not a valid command. Valid commands are: ${availableCommands.join(", ")}`);

  });
}

/**
 * @function getType
 * @param {string} message
 * @returns {Promise<ASTObj>}
 */
export const getType = (token: string): Promise<ASTObj> => {
  return new Promise((resolve, reject) => {

    const availableTypes = Object.keys(typeRegex);

    for (const type of availableTypes)
      if (typeRegex[type].test(token))
        resolve({ type })

    reject(`${token} is not a valid type. Valid types are: ${availableTypes.join(", ")}`);

  });
}

/**
 * @function isValidKey
 * @param {string} token
 * @returns {Promise<ASTObj>}
 */

export const getKey = (token: string): Promise<ASTObj> => (
  new Promise((resolve, reject) => keyRegex.test(token) 
                                ? resolve({ key: token.slice(0, -1) }) 
                                : reject(`Invalid key: ${token}`))
);

/**
 * @function isValidValue
 * @param {string} token
 * @returns {Promise<ASTObj>}
 */

export const getValue = (token: string): Promise<ASTObj> => (
  new Promise((resolve, reject) => keyRegex.test(token) 
                                ? resolve({ value: token }) 
                                : reject(`Invalid value: ${token}`))
);


export const tokenizer = (message: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {

      const tokens = getTokens(message);

      const command = await getCommand(tokens[0]);
      const type    = await getType(tokens[1]);
      const key     = await getKey(tokens[2]);
      const value   = await getValue(tokens[3]);

      const ast = {
        command,
        type,
        key,
        value
      };

      console.log(ast);

    }

    catch (err) {
      reject(err);
    }

  });
}