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

export const slCommand: Command = {
  name: 'sl',
  description: 'Steam locomotive',
  handler: ({ addOutput }) => {
    addOutput(`
      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  | ________|___H__/__|_____/[][]~\\_______|       |
  |/ |   |-----------I_____I [][] []  D   |=======|_
__/ =| o |=-O=====O=====O=====O \\ ____Y___________|__
 |/-=|___|=    ||    ||    ||    |_____/~\\___/
  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/

Choo choo! 🚂
`);
  },
};

export const matrixCommand: Command = {
  name: 'matrix',
  description: 'Follow the white rabbit',
  handler: ({ args, addOutput }) => {
    addOutput(`
Wake up, Neo...
The Matrix has you...
Follow the white rabbit.

🐇 Knock, knock, ${args || 'developer'}...
`);
  },
};

export const fortuneCommand: Command = {
  name: 'fortune',
  description: 'Get your fortune',
  handler: ({ addOutput }) => {
    const fortunes = [
      "You will debug a tricky issue today and feel immense satisfaction.",
      "A great opportunity is coming your way. Keep coding!",
      "The best time to refactor was yesterday. The second best time is now.",
      "Your code will compile on the first try... eventually.",
      "Someone will appreciate your clean commit messages today.",
      "A rubber duck holds the answer you seek.",
      "In the land of spaghetti code, the one with tests is king.",
      "Today is a good day to learn a new keyboard shortcut.",
      "The bug you're looking for is in the last place you'll look.",
    ];
    addOutput(`🔮 ${fortunes[Math.floor(Math.random() * fortunes.length)]}`);
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

export const meaningCommand: Command = {
  name: '42',
  aliases: ['meaning'],
  description: 'The meaning of life',
  handler: ({ addOutput }) => {
    addOutput('The answer to life, the universe, and everything.');
  },
};

export const xkcdCommand: Command = {
  name: 'xkcd',
  description: 'Relevant xkcd',
  handler: ({ addOutput }) => {
    addOutput(`
   ╭──────────────────────────╮
   │ "It works on my machine" │
   │   - Every developer ever │
   ╰──────────────────────────╯

Relevant XKCD: https://xkcd.com/1988/
`);
  },
};

export const lolcatCommand: Command = {
  name: 'lolcat',
  description: 'Rainbow text',
  handler: ({ addOutput }) => {
    addOutput('🌈 Y o u   a r e   a w e s o m e ! 🌈');
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
