import { Command } from './types';

export const sudoCommand: Command = {
  name: 'sudo',
  description: 'Run with elevated privileges',
  handler: ({ args, addOutput }) => {
    if (args.toLowerCase().includes('hire')) {
      addOutput(`
🎉 EXCELLENT CHOICE! 🎉

Initiating hiring sequence...
[████████████████████████████████] 100%

Contact established! Reach out at work@dave-kav.com
`);
    } else {
      addOutput('sudo: nice try, but this is a portfolio website 😄');
    }
  },
};

export const editorCommands: Command = {
  name: 'vim',
  aliases: ['nano', 'emacs', 'vi', 'nvim', 'code'],
  description: 'Text editors',
  handler: ({ args, addOutput }) => {
    const cmd = args ? 'vim' : 'vim'; // simplified
    addOutput(`${cmd}: this is a read-only filesystem (but I do use neovim btw)`);
  },
};

export const rmCommand: Command = {
  name: 'rm',
  aliases: ['rmdir', 'del', 'delete'],
  description: 'Remove files',
  handler: ({ addOutput }) => {
    addOutput('rm: permission denied (nice try though)');
  },
};

export const gitCommand: Command = {
  name: 'git',
  description: 'Version control',
  handler: ({ addOutput }) => {
    addOutput('git: check out my repos at github.com/dave-kav');
  },
};

export const curlCommand: Command = {
  name: 'curl',
  aliases: ['wget', 'fetch'],
  description: 'Network requests',
  handler: ({ addOutput }) => {
    addOutput(`curl: I appreciate the enthusiasm, but just use 'cat' here`);
  },
};

export const coffeeCommand: Command = {
  name: 'coffee',
  aliases: ['brew'],
  description: 'Make coffee',
  handler: ({ addOutput }) => {
    addOutput(`
    ( (
     ) )
  ........
  |      |]
  \\      /
   \`----'

Coffee brewing... ☕
`);
  },
};

export const makeCommand: Command = {
  name: 'make',
  description: 'Build tool',
  handler: ({ args, addOutput }) => {
    if (args === 'coffee') {
      addOutput(`
    ( (
     ) )
  ........
  |      |]
  \\      /
   \`----'

Coffee brewing... ☕
`);
    } else {
      addOutput(`make: command not found`);
    }
  },
};

export const pingCommand: Command = {
  name: 'ping',
  description: 'Network ping',
  handler: ({ addOutput }) => {
    addOutput('PONG! 🏓');
  },
};

export const neofetchCommand: Command = {
  name: 'neofetch',
  aliases: ['screenfetch', 'fastfetch'],
  description: 'System information',
  handler: ({ addOutput }) => {
    addOutput(`
        .---.        david@portfolio
       /     \\       ---------------
       \\.@-@./       OS: Portfolio 1.0
       /\`\\_/\`\\       Host: React 18.2
      //  _  \\\\      Kernel: TypeScript
     | \\     )|_     Shell: dave-kav-sh
    /\`\\_\`>  <_/ \\    Terminal: Living Terminal
    \\__/'---'\\__/    Experience: 8+ years
                     Focus: Backend & Distributed Systems
`);
  },
};

export const cowsayCommand: Command = {
  name: 'cowsay',
  description: 'Talking cow',
  handler: ({ args, addOutput }) => {
    const msg = args || 'Hire me!';
    addOutput(`
 ${'_'.repeat(msg.length + 2)}
< ${msg} >
 ${'-'.repeat(msg.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`);
  },
};

export const manCommand: Command = {
  name: 'man',
  description: 'Manual pages',
  usage: 'man <command>',
  handler: ({ args, addOutput }) => {
    if (args === 'dave' || args === 'david') {
      addOutput(`
DAVE(1)                   Portfolio Manual                   DAVE(1)

NAME
       dave - Software Engineer specializing in backend systems

SYNOPSIS
       dave [OPTIONS] [PROJECT]

DESCRIPTION
       David Kavanagh is a software engineer with 8+ years of
       experience building scalable backend systems and distributed
       architectures. Currently working at Whatnot on financial
       systems and data infrastructure.

OPTIONS
       --hire         Initiate hiring process (highly recommended)
       --collaborate  Discuss interesting projects
       --chat         Have a conversation about tech
       --coffee       Schedule a coffee chat (Dublin area)

SKILLS
       Python, Rust, TypeScript, AWS, Snowflake, DBT, PostgreSQL,
       Distributed Systems, Team Leadership

EXAMPLES
       dave --hire
              Send an email to work@dave-kav.com

SEE ALSO
       github.com/dave-kav, linkedin.com/in/dave-kav

AUTHOR
       Written by years of debugging and coffee.

Portfolio 1.0               2025                             DAVE(1)
`);
    } else if (args) {
      addOutput(`No manual entry for ${args}`);
    } else {
      addOutput('What manual page do you want?\nTry: man dave');
    }
  },
};

export const topCommand: Command = {
  name: 'top',
  aliases: ['ps'],
  description: 'Process viewer',
  handler: ({ addOutput }) => {
    addOutput(`
top - ${new Date().toLocaleTimeString()} up 8 years, load average: caffeinated

  PID USER      PR  NI  PROCESS          %CPU  %MEM
    1 dave       0   0  backend-dev      45.0  high
    2 dave       0   0  system-design    25.0  med
    3 dave       0   0  team-leadership  15.0  med
    4 dave       0   0  code-review      10.0  low
    5 dave       0   0  coffee-intake    99.9  max
    6 dave       0   0  debugging         5.0  var
`);
  },
};

export const htopCommand: Command = {
  name: 'htop',
  description: 'Interactive process viewer',
  handler: ({ addOutput }) => {
    addOutput('htop: For the fancy version, see my GitHub contributions graph 📊');
  },
};

export const yesCommand: Command = {
  name: 'yes',
  description: 'Output yes repeatedly',
  handler: ({ addOutput }) => {
    addOutput('yes yes yes... (Ctrl+C to stop, but this is a portfolio, so...)\n\nJust kidding! But yes, you should hire me.');
  },
};

export const aliasCommand: Command = {
  name: 'alias',
  description: 'Show aliases',
  handler: ({ addOutput }) => {
    addOutput(`
alias hire='echo "Sending email to work@dave-kav.com"'
alias ll='ls -la'
alias please='sudo'
alias yeet='rm -rf'
`);
  },
};

export const motdCommand: Command = {
  name: 'motd',
  description: 'Message of the day',
  handler: ({ addOutput }) => {
    addOutput(`
╔══════════════════════════════════════════════════════════════╗
║  Welcome to David's Portfolio Terminal                        ║
║  ─────────────────────────────────────────────────────────── ║
║  "Any sufficiently advanced technology is                     ║
║   indistinguishable from magic." - Arthur C. Clarke          ║
║                                                               ║
║  Type 'help' for commands. Happy exploring!                   ║
╚══════════════════════════════════════════════════════════════╝
`);
  },
};
