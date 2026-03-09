import { Command, CommandContext } from './types';

// Core commands
import { helpCommand } from './help';
import { lsCommand, llCommand, cdCommand, catCommand, pwdCommand, treeCommand } from './navigation';
import { clearCommand, historyCommand, whoamiCommand, contactCommand, dateCommand, echoCommand, exitCommand, uptimeCommand } from './utility';

// Easter eggs
import {
  sudoCommand,
  editorCommands,
  rmCommand,
  gitCommand,
  curlCommand,
  coffeeCommand,
  makeCommand,
  pingCommand,
  neofetchCommand,
  cowsayCommand,
  manCommand,
  topCommand,
  htopCommand,
  yesCommand,
  aliasCommand,
  motdCommand,
} from './easter-eggs';

// All commands
const commands: Command[] = [
  // Core
  helpCommand,
  lsCommand,
  llCommand,
  cdCommand,
  catCommand,
  pwdCommand,
  treeCommand,
  clearCommand,
  historyCommand,
  whoamiCommand,
  contactCommand,
  dateCommand,
  echoCommand,
  exitCommand,
  uptimeCommand,

  // Easter eggs
  sudoCommand,
  editorCommands,
  rmCommand,
  gitCommand,
  curlCommand,
  coffeeCommand,
  makeCommand,
  pingCommand,
  neofetchCommand,
  cowsayCommand,
  manCommand,
  topCommand,
  htopCommand,
  yesCommand,
  aliasCommand,
  motdCommand,
];

// Build a lookup map for commands (including aliases)
const commandMap = new Map<string, Command>();
commands.forEach(cmd => {
  commandMap.set(cmd.name.toLowerCase(), cmd);
  cmd.aliases?.forEach(alias => {
    commandMap.set(alias.toLowerCase(), cmd);
  });
});

export function executeCommand(name: string, ctx: CommandContext): boolean {
  const command = commandMap.get(name.toLowerCase());
  if (command) {
    command.handler(ctx);
    return true;
  }
  return false;
}

export function getCommand(name: string): Command | undefined {
  return commandMap.get(name.toLowerCase());
}

export function getAllCommands(): Command[] {
  return commands;
}

export type { Command, CommandContext, FileSystem } from './types';
