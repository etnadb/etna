import * as parser from "./parser";
import { parse } from "path";

type AST = { 
  command: string,
  key:     string,
  value:   string
};

export async function buildSetInstruction(tokens: string[]): AST {
  try {
    const [ type, key, value ] = await Promise.all([ 
        parser.getType(tokens[1]), 
        parser.getKey(tokens[2]), 
        parser.getValue(tokens[3])
      ]);
    return { command: "SET", ...type, ...key, ...value }
  }

  catch (err) {
    console.error(`Parser error =>`, err);
  }

}

export async function buildGetInstruction(tokens: string[]): AST {
  try {
    const key = await parser.getKey(tokens[1])
    return { command: "GET", ...key }
  }

  catch (err) {
    console.error(`Parser error =>`, err);
  }

}

export async function buildDeleteInstruction(tokens: string[]): AST {
  try {
    const key = await parser.getKey(tokens[1])
    return { command: "DELETE", ...key }
  }

  catch (err) {
    console.error(`Parser error =>`, err);
  }

}

export async function buildAST(message: string): Promise<AST> {

  try {

    const tokens  = parser.getTokens(message);
    const command = await parser.getCommand(tokens[0]);

    switch (command.command) {
      case "GET":    return buildGetInstruction(tokens);
      case "SET":    return buildSetInstruction(tokens);
      case "DELETE": return buildDeleteInstruction(tokens);
    }

  }

  catch (err) {
    console.error("AST error =>", err);
  }
}