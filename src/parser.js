// @flow

type tokenTypeCheck = { [string]: RegExp };

type ASTObj = { [string]: string };

const commandsRegex: tokenTypeCheck = {
  SET:    /^SET/,
  GET:    /^GET/,
  DELETE: /^DELETE/
};

const keyRegex = /^\w*\:$/i;

const typeRegex: tokenTypeCheck = {
  string:  /^&string/,
  integer: /^&int/,
  float:   /^&float/,
  json:    /^&json/,
  null:    /^&null/
};

// SET &string foo: bar

export const getTokens = (message: string): string[] => (
  message
    .split(" ")
    .map(token => token.replace(/\s/g, ""))
    .filter(token => token !== "")
)

export const getCommand = (token: string): Promise<ASTObj> => {
  return new Promise((resolve, reject) => {

    const availableCommands = Object.keys(commandsRegex);

    for (const command of availableCommands)
      if (commandsRegex[command].test(token))
        resolve({ command })

    reject(`${token} is not a valid command. Valid commands are: ${availableCommands.join(", ")}`);

  });
}

export const isValidKey = (token: string): boolean => keyRegex.test(token);

export const getType = (token: string): Promise<ASTObj> => {
  return new Promise((resolve, reject) => {

    const availableTypes = Object.keys(typeRegex);

    for (const type of availableTypes)
      if (typeRegex[type].test(token))
        resolve({ type })

    reject(`${token} is not a valid type. Valid types are: ${availableTypes.join(", ")}`);

  });
}

export const tokenizer = (message: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {

      const tokens = getTokens(message);
      
      if (tokens.length !== 4) reject("malformed query");
      
      const command = await getCommand(tokens[0]);

    }

    catch (err) {
      reject(err);
    }

  });
}