import { Command } from './types';

const HELP_TEXT = `
Available commands:
  help              Show this help message
  ls [path]         List files in directory
  cd <dir>          Change directory
  cat <file>        Display file contents
  tree              Show directory structure
  pwd               Print working directory
  clear             Clear the terminal
  whoami            Who am I?
  contact           Show contact information
  history           Show command history
  exit              Return to dave-kav.com
`;

export const helpCommand: Command = {
  name: 'help',
  aliases: ['?', 'h'],
  description: 'Show available commands',
  handler: ({ addOutput }) => {
    addOutput(HELP_TEXT);
  },
};
