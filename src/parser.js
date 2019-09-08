// @flow

const commandsRegex = {
  SET: /^SET/,
  GET: /^GET/
};

const keyRegex = {
  plain: /^\w*\:$/i
};

const typeRegex = {
  string:  /^&string/,
  integer: /^&int/,
  float:   /^&float/,
  json:    /^&json/
};

// SET &string foo: bar

export const getTokens = (message: string): string[] => message
                                                        .split(" ")
                                                        .map(token => token.replace(/\s/g, ""))
                                                        .filter(token => token !== "");

export const getCommand = (token: string): string => {
  return new Promise((resolve, reject) => {

    const availableCommands = Object.keys(commandsRegex);

    for (let command of availableCommands)
      if (availableCommands[command].test(token))
        resolve({ command: command })

    reject(`${token} is not a valid command. Valid commands are: ${availableCommands.join(", ")}`);

  });
}

export const tokenizer = (message: string): Promise<any> => {
  return new Promise((resolve, reject) => {

    const tokens = getTokens(message);

    if (tokens.length !== 4) reject("malformed query");

    const command = 

  });
}