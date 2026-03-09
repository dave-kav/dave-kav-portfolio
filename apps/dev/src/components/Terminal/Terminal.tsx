import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useConfig, ExperienceData, EducationData, ProjectsData, ExperienceItem, EducationItem, ProjectItem } from '../../hooks/useConfig';
import './Terminal.css';

interface FileSystem {
  [key: string]: string | FileSystem;
}

const buildFileSystem = (
  isMobile: boolean,
  experiences: ExperienceItem[],
  education: EducationItem[],
  projects: ProjectItem[]
): FileSystem => {
  const fs: FileSystem = {
    'about.txt': isMobile ? `
─────────────────────────────
  DAVID KAVANAGH
  Software Engineer
─────────────────────────────

I build scalable backend systems
and solve complex engineering
challenges.

Currently at Whatnot, focused on
financial systems and data
infrastructure.

Location: Dublin, Ireland
Email:    work@dave-kav.com
GitHub:   github.com/dave-kav
LinkedIn: linkedin.com/in/dave-kav
Website:  dave-kav.com

Type 'help' for commands.
` : `
╔══════════════════════════════════════════════════════════════════╗
║                       DAVID KAVANAGH                              ║
║                     Software Engineer                             ║
╚══════════════════════════════════════════════════════════════════╝

I build scalable backend systems and solve complex engineering challenges.
Currently at Whatnot, focused on financial systems and data infrastructure.

Location: Dublin, Ireland
Email: work@dave-kav.com
GitHub: github.com/dave-kav
LinkedIn: linkedin.com/in/dave-kav
Website: dave-kav.com

Type 'help' for available commands.
`,
    'skills.txt': isMobile ? `
─────────────────────────────
  TECHNICAL SKILLS
─────────────────────────────

Languages:
  Python, Rust, TypeScript,
  Java, Scala, JavaScript

Data:
  Snowflake, DBT, PostgreSQL,
  MySQL, Redis, Kafka

Cloud:
  AWS, Terraform, Docker

Tools:
  Datadog, Jenkins, Git

Architecture:
  Microservices,
  Distributed Systems,
  REST APIs
` : `
╭─────────────────────────────────────╮
│           TECHNICAL SKILLS          │
╰─────────────────────────────────────╯

Languages:    Python, Rust, TypeScript, Java, Scala, JavaScript
Data:         Snowflake, DBT, PostgreSQL, MySQL, Redis, Kafka
Cloud:        AWS, Terraform, Docker
Tools:        Datadog, Jenkins, Git
Architecture: Microservices, Distributed Systems, REST APIs
`,
    experience: {} as FileSystem,
    education: {} as FileSystem,
    projects: {} as FileSystem,
  };

  // Build experience directory
  experiences.forEach((exp, index) => {
    const filename = `${index + 1}_${exp.company.toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`;
    (fs.experience as FileSystem)[filename] = isMobile ? `
─────────────────────────────
${exp.role}
${exp.company}
${exp.period}
─────────────────────────────

${exp.description}

HIGHLIGHTS:
${exp.highlights.map((h: string) => `• ${h}`).join('\n')}

TECH:
${exp.technologies.join(', ')}
` : `
╔══════════════════════════════════════════════════════════════════╗
║  ${exp.role.padEnd(64)}║
║  ${exp.company.padEnd(64)}║
║  ${exp.period.padEnd(64)}║
╚══════════════════════════════════════════════════════════════════╝

${exp.description}

HIGHLIGHTS:
${exp.highlights.map((h: string) => `  • ${h}`).join('\n')}

TECHNOLOGIES:
  ${exp.technologies.join(' | ')}
`;
  });

  // Build education directory
  education.forEach((edu, index) => {
    const filename = `${index + 1}_${edu.school.toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`;
    (fs.education as FileSystem)[filename] = isMobile ? `
─────────────────────────────
${edu.degree}
${edu.school}
${edu.period}
─────────────────────────────

${edu.description}

${edu.highlights ? `HIGHLIGHTS:\n${edu.highlights.map((h: string) => `• ${h}`).join('\n')}` : ''}
` : `
╔══════════════════════════════════════════════════════════════════╗
║  ${edu.degree.padEnd(64)}║
║  ${edu.school.padEnd(64)}║
║  ${edu.period.padEnd(64)}║
╚══════════════════════════════════════════════════════════════════╝

${edu.description}

${edu.highlights ? `HIGHLIGHTS:\n${edu.highlights.map((h: string) => `  • ${h}`).join('\n')}` : ''}
`;
  });

  // Build projects directory
  projects.forEach((proj, index) => {
    const filename = `${index + 1}_${proj.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`;
    (fs.projects as FileSystem)[filename] = isMobile ? `
─────────────────────────────
${proj.title}
─────────────────────────────

${proj.description}

${proj.highlights ? `HIGHLIGHTS:\n${proj.highlights.map((h: string) => `• ${h}`).join('\n')}\n` : ''}
TECH:
${proj.tech.join(', ')}

${proj.repo ? `REPO: ${proj.repo}` : ''}
` : `
╔══════════════════════════════════════════════════════════════════╗
║  ${proj.title.padEnd(64)}║
╚══════════════════════════════════════════════════════════════════╝

${proj.description}

${proj.highlights ? `HIGHLIGHTS:\n${proj.highlights.map((h: string) => `  • ${h}`).join('\n')}\n` : ''}
TECHNOLOGIES:
  ${proj.tech.join(' | ')}

${proj.repo ? `REPO: ${proj.repo}` : ''}
`;
  });

  return fs;
};

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
`;

interface HistoryEntry {
  type: 'input' | 'output';
  content: string | React.ReactNode;
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

export const Terminal: React.FC = () => {
  const isMobile = useIsMobile();
  const { data: expData, loading: expLoading } = useConfig<ExperienceData>('experience');
  const { data: eduData, loading: eduLoading } = useConfig<EducationData>('education');
  const { data: projData, loading: projLoading } = useConfig<ProjectsData>('projects');

  const loading = expLoading || eduLoading || projLoading;
  const experiences = expData?.experiences || [];
  const education = eduData?.education || [];
  const projects = projData?.projects || [];

  const filesystem = useMemo(
    () => buildFileSystem(isMobile, experiences, education, projects),
    [isMobile, experiences, education, projects]
  );
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  // Initialize terminal - start with empty history (just the prompt)
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      setHistory([]);
    }
  }, []);

  const getCurrentDir = useCallback((): FileSystem | string => {
    let current: FileSystem | string = filesystem;
    for (const dir of currentPath) {
      if (typeof current === 'object' && dir in current) {
        current = current[dir];
      }
    }
    return current;
  }, [currentPath, filesystem]);

  // Resolve a path relative to current directory
  // Returns { item, parentDir, name } or null if not found
  const resolvePath = useCallback((path: string): {
    item: FileSystem | string;
    parentDir: FileSystem | null;
    name: string;
  } | null => {
    if (!path) {
      const dir = getCurrentDir();
      return { item: dir, parentDir: null, name: '' };
    }

    const cleanPath = path.replace(/\/+$/, ''); // Remove trailing slashes
    const parts = cleanPath.split('/').filter(p => p !== '');

    // Start from current directory or root if path starts with ~
    let workingPath = [...currentPath];
    if (parts[0] === '~') {
      workingPath = [];
      parts.shift();
    }

    // Process each part
    for (const part of parts) {
      if (part === '..') {
        workingPath.pop();
      } else if (part !== '.') {
        workingPath.push(part);
      }
    }

    // Navigate to the resolved path
    let current: FileSystem | string = filesystem;
    let parent: FileSystem | null = null;
    let lastName = '';

    for (const dir of workingPath) {
      if (typeof current === 'object' && dir in current) {
        parent = current;
        lastName = dir;
        current = current[dir];
      } else {
        return null; // Path not found
      }
    }

    return { item: current, parentDir: parent, name: lastName };
  }, [currentPath, getCurrentDir, filesystem]);

  // Get completions for a partial path
  const getPathCompletions = useCallback((partial: string): string[] => {
    const lastSlash = partial.lastIndexOf('/');

    if (lastSlash === -1) {
      // No slash - complete from current directory
      const dir = getCurrentDir();
      if (typeof dir !== 'object') return [];
      return Object.keys(dir)
        .filter(k => k.toLowerCase().startsWith(partial.toLowerCase()))
        .map(k => typeof dir[k] === 'object' ? k + '/' : k);
    }

    // Has slash - resolve the directory part and complete the rest
    const dirPath = partial.slice(0, lastSlash) || '/';
    const filePartial = partial.slice(lastSlash + 1).toLowerCase();

    const resolved = resolvePath(dirPath);
    if (!resolved || typeof resolved.item !== 'object') return [];

    const prefix = lastSlash === 0 ? '/' : partial.slice(0, lastSlash + 1);
    return Object.keys(resolved.item)
      .filter(k => k.toLowerCase().startsWith(filePartial))
      .map(k => prefix + (typeof resolved.item === 'object' && typeof (resolved.item as FileSystem)[k] === 'object' ? k + '/' : k));
  }, [getCurrentDir, resolvePath]);

  const getPathString = () => {
    return '~/' + currentPath.join('/');
  };

  const addOutput = (content: string) => {
    setHistory(prev => [...prev, { type: 'output', content }]);
  };

  const processCommand = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setHistory(prev => [...prev, { type: 'input', content: `${getPathString()} $ ${trimmed}` }]);
    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const [cmd, ...args] = trimmed.split(' ');
    const arg = args.join(' ');

    switch (cmd.toLowerCase()) {
      case 'help':
        addOutput(HELP_TEXT);
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'ls': {
        const resolved = resolvePath(arg);
        if (!resolved) {
          addOutput(`ls: ${arg}: No such file or directory`);
          break;
        }

        if (typeof resolved.item === 'object') {
          const keys = Object.keys(resolved.item);
          const dir = resolved.item;
          const output = (
            <span>
              {keys.map((name, i) => {
                const isDir = typeof dir[name] === 'object';
                return (
                  <React.Fragment key={name}>
                    {i > 0 && '  '}
                    <span className={isDir ? 'terminal__dir' : ''}>
                      {isDir ? `${name}/` : name}
                    </span>
                  </React.Fragment>
                );
              })}
            </span>
          );
          setHistory(prev => [...prev, { type: 'output', content: output }]);
        } else {
          // It's a file, just show the filename
          addOutput(resolved.name);
        }
        break;
      }

      case 'cd': {
        if (!arg || arg === '~') {
          setCurrentPath([]);
          break;
        }

        // Build the new path
        const cleanPath = arg.replace(/\/+$/, '');
        const parts = cleanPath.split('/').filter(p => p !== '');

        let newPath = cleanPath.startsWith('~') ? [] : [...currentPath];
        if (parts[0] === '~') parts.shift();

        for (const part of parts) {
          if (part === '..') {
            newPath.pop();
          } else if (part !== '.') {
            newPath.push(part);
          }
        }

        // Verify the path exists and is a directory
        let current: FileSystem | string = filesystem;
        let valid = true;
        for (const dir of newPath) {
          if (typeof current === 'object' && dir in current && typeof current[dir] === 'object') {
            current = current[dir];
          } else {
            valid = false;
            break;
          }
        }

        if (valid) {
          setCurrentPath(newPath);
        } else {
          addOutput(`cd: no such directory: ${arg}`);
        }
        break;
      }

      case 'cat': {
        if (!arg) {
          addOutput('cat: missing file argument');
          break;
        }

        // Try exact path resolution first
        const resolved = resolvePath(arg);
        if (resolved && typeof resolved.item === 'string') {
          addOutput(resolved.item);
          break;
        }

        // If exact path failed, try partial match in current dir (convenience feature)
        const dir = getCurrentDir();
        if (typeof dir === 'object') {
          const match = Object.keys(dir).find(k =>
            k.toLowerCase().includes(arg.toLowerCase()) && typeof dir[k] === 'string'
          );
          if (match) {
            addOutput(dir[match] as string);
            break;
          }
        }

        addOutput(`cat: ${arg}: No such file`);
        break;
      }

      case 'pwd':
        addOutput('/' + currentPath.join('/') || '/');
        break;

      case 'tree': {
        const buildTree = (obj: FileSystem, prefix = ''): string => {
          const entries = Object.keys(obj);
          return entries.map((key, i) => {
            const isLast = i === entries.length - 1;
            const connector = isLast ? '└── ' : '├── ';
            const isDir = typeof obj[key] === 'object';
            const line = `${prefix}${connector}${isDir ? `📁 ${key}` : `📄 ${key}`}`;
            if (isDir) {
              const childPrefix = prefix + (isLast ? '    ' : '│   ');
              return line + '\n' + buildTree(obj[key] as FileSystem, childPrefix);
            }
            return line;
          }).join('\n');
        };
        addOutput('.\n' + buildTree(filesystem));
        break;
      }

      case 'whoami':
        addOutput('david.kavanagh - Software Engineer @ Whatnot');
        break;

      case 'contact':
        addOutput(`
📧 Email:    work@dave-kav.com
🐙 GitHub:   github.com/dave-kav
💼 LinkedIn: linkedin.com/in/dave-kav
🌐 Website:  dave-kav.com
`);
        break;

      case 'history':
        addOutput(commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\n') || 'No commands in history');
        break;

      // Easter eggs
      case 'sudo':
        if (arg.toLowerCase().includes('hire')) {
          addOutput(`
🎉 EXCELLENT CHOICE! 🎉

Initiating hiring sequence...
[████████████████████████████████] 100%

Contact established! Reach out at work@dave-kav.com
`);
        } else {
          addOutput('sudo: nice try, but this is a portfolio website 😄');
        }
        break;

      case 'vim':
      case 'nano':
      case 'emacs':
        addOutput(`${cmd}: this is a read-only filesystem (but I do use ${cmd === 'vim' ? 'neovim' : cmd} btw)`);
        break;

      case 'rm':
        addOutput('rm: permission denied (nice try though)');
        break;

      case 'exit':
      case 'quit':
        addOutput('Thanks for visiting! (But you can\'t really exit... try refreshing the page 😄)');
        break;

      case 'curl':
      case 'wget':
        addOutput(`${cmd}: I appreciate the enthusiasm, but just use 'cat' here`);
        break;

      case 'git':
        addOutput('git: check out my repos at github.com/dave-kav');
        break;

      case 'coffee':
      case 'make':
        if (arg === 'coffee' || cmd === 'coffee') {
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
          addOutput(`${cmd}: command not found`);
        }
        break;

      case 'ping':
        addOutput('PONG! 🏓');
        break;

      case 'date':
        addOutput(new Date().toString());
        break;

      case 'echo':
        addOutput(arg || '');
        break;

      case 'neofetch':
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
        break;

      case 'cowsay':
        const cowMsg = arg || 'Hire me!';
        addOutput(`
 ${'_'.repeat(cowMsg.length + 2)}
< ${cowMsg} >
 ${'-'.repeat(cowMsg.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`);
        break;

      case 'sl':
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
        break;

      case 'matrix':
        addOutput(`
Wake up, Neo...
The Matrix has you...
Follow the white rabbit.

🐇 Knock, knock, ${arg || 'developer'}...
`);
        break;

      case 'fortune':
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
        break;

      case 'man':
        if (arg === 'dave' || arg === 'david') {
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
        } else if (arg) {
          addOutput(`No manual entry for ${arg}`);
        } else {
          addOutput('What manual page do you want?\nTry: man dave');
        }
        break;

      case 'uptime':
        const startDate = new Date('2017-01-01');
        const now = new Date();
        const years = now.getFullYear() - startDate.getFullYear();
        addOutput(`up ${years} years, career still going strong`);
        break;

      case 'top':
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
        break;

      case 'htop':
        addOutput('htop: For the fancy version, see my GitHub contributions graph 📊');
        break;

      case '42':
      case 'meaning':
        addOutput('The answer to life, the universe, and everything.');
        break;

      case 'xkcd':
        addOutput(`
   ╭──────────────────────────╮
   │ "It works on my machine" │
   │   - Every developer ever │
   ╰──────────────────────────╯

Relevant XKCD: https://xkcd.com/1988/
`);
        break;

      case 'lolcat':
        addOutput('🌈 Y o u   a r e   a w e s o m e ! 🌈');
        break;

      case 'yes':
        addOutput('yes yes yes... (Ctrl+C to stop, but this is a portfolio, so...)\n\nJust kidding! But yes, you should hire me.');
        break;

      case 'alias':
        addOutput(`
alias hire='echo "Sending email to work@dave-kav.com"'
alias ll='ls -la'
alias please='sudo'
alias yeet='rm -rf'
`);
        break;

      case 'motd':
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
        break;

      default:
        addOutput(`${cmd}: command not found. Type 'help' for available commands.`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Tab completion with path support
      const parts = currentInput.split(' ');
      const partial = parts[parts.length - 1];
      const matches = getPathCompletions(partial);

      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0];
        setCurrentInput(parts.join(' '));
      } else if (matches.length > 1) {
        // Show matches with directory highlighting
        const output = (
          <span>
            {matches.map((m, i) => (
              <React.Fragment key={m}>
                {i > 0 && '  '}
                <span className={m.endsWith('/') ? 'terminal__dir' : ''}>{m}</span>
              </React.Fragment>
            ))}
          </span>
        );
        setHistory(prev => [...prev, { type: 'output', content: output }]);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="terminal" onClick={focusInput} ref={terminalRef}>
      <div className="terminal__content">
        {history.map((entry, i) => (
          <div
            key={i}
            className={`terminal__line terminal__line--${entry.type}`}
          >
            {typeof entry.content === 'string' ? (
              <pre>{entry.content}</pre>
            ) : (
              <div className="terminal__output">{entry.content}</div>
            )}
          </div>
        ))}
        <div className="terminal__input-line">
          <span className="terminal__prompt">{getPathString()} $</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal__input"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="terminal__hint">
        💡 Type <code>help</code> for commands, or <code>tree</code> to explore
        <span className="terminal__hint-divider">•</span>
        <a href="https://dave-kav.com" className="terminal__hint-link">dave-kav.com</a>
      </div>
    </div>
  );
};
