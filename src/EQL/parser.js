// @flow

type tokenTypeCheck = { [string]: RegExp };

type ASTObj = { [string]: string };

const commandsRegex: tokenTypeCheck = {
  SET:    /^SET/,
  GET:    /^GET/,
  DELETE: /^DELETE/,
  EXIST:  /^EXIST/
};

const typeRegex: tokenTypeCheck = {
  string:  /^&[string|s]/,
  integer: /^&[int|i]/,
  float:   /^&[float|f]/,
  json:    /^&[json|j]/,
  null:    /^&[null|n]/,
  bool:    /^&[bool|b]/
};

const keyRegex:   RegExp = /^[a-z]*$/i;
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
                                ? resolve({ key: token }) 
                                : reject(`Invalid key: ${token}`))
);

/**
 * @function isValidValue
 * @param {string} token
 * @returns {Promise<ASTObj>}
 */

export const getValue = (token: string): Promise<ASTObj> => (
  new Promise((resolve, reject) => valueRegex.test(token) 
                                ? resolve({ value: token }) 
                                : reject(`Invalid value: ${token}`))
);