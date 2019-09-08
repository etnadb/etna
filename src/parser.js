// @flow

type tokenTypeCheck = { [string]: RegExp };

const commandsRegex: tokenTypeCheck = {
  SET: /^SET/,
  GET: /^GET/
};

const keyRegex: tokenTypeCheck = {
  plain: /^\w*\:$/i
};

const typeRegex: tokenTypeCheck = {
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

export const getCommand = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {

    const availableCommands = Object.keys(commandsRegex);

    for (const command of availableCommands)
      // $FlowFixMe
      if (commandsRegex[command].test(token))
        resolve({ command: command })

    reject(`${token} is not a valid command. Valid commands are: ${availableCommands.join(", ")}`);

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