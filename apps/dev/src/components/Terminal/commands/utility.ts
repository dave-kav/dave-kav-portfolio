import { Command } from './types';

export const clearCommand: Command = {
  name: 'clear',
  aliases: ['cls', 'reset'],
  description: 'Clear the terminal',
  handler: ({ clearHistory }) => {
    clearHistory();
  },
};

export const historyCommand: Command = {
  name: 'history',
  description: 'Show command history',
  handler: ({ commandHistory, addOutput }) => {
    addOutput(commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\n') || 'No commands in history');
  },
};

export const whoamiCommand: Command = {
  name: 'whoami',
  description: 'Display current user',
  handler: ({ addOutput }) => {
    addOutput('david.kavanagh - Software Engineer @ Whatnot');
  },
};

export const contactCommand: Command = {
  name: 'contact',
  aliases: ['email', 'socials'],
  description: 'Show contact information',
  handler: ({ addOutput }) => {
    addOutput(`
📧 Email:    work@dave-kav.com
🐙 GitHub:   github.com/dave-kav
💼 LinkedIn: linkedin.com/in/dave-kav
🌐 Website:  dave-kav.com
`);
  },
};

export const dateCommand: Command = {
  name: 'date',
  description: 'Display current date and time',
  handler: ({ addOutput }) => {
    addOutput(new Date().toString());
  },
};

export const echoCommand: Command = {
  name: 'echo',
  description: 'Display text',
  usage: 'echo <text>',
  handler: ({ args, addOutput }) => {
    addOutput(args || '');
  },
};

export const exitCommand: Command = {
  name: 'exit',
  aliases: ['quit', 'logout', 'bye'],
  description: 'Return to dave-kav.com',
  handler: ({ addOutput }) => {
    addOutput('Goodbye! Redirecting to dave-kav.com...');
    setTimeout(() => {
      window.location.href = 'https://dave-kav.com';
    }, 500);
  },
};

export const uptimeCommand: Command = {
  name: 'uptime',
  description: 'Show career uptime',
  handler: ({ addOutput }) => {
    const startDate = new Date('2017-01-01');
    const now = new Date();
    const years = now.getFullYear() - startDate.getFullYear();
    addOutput(`up ${years} years, career still going strong`);
  },
};
