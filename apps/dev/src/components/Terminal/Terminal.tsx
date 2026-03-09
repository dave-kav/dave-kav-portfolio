import React, { useState, useRef, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { useConfig, ExperienceData, EducationData, ProjectsData, ExperienceItem, EducationItem, ProjectItem } from '../../hooks/useConfig';
import { executeCommand, FileSystem } from './commands';
import './Terminal.css';

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

  const addOutput = useCallback((content: string | ReactNode) => {
    setHistory(prev => [...prev, { type: 'output', content }]);
  }, []);

  const clearHistoryFn = useCallback(() => {
    setHistory([]);
  }, []);

  const processCommand = useCallback((input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setHistory(prev => [...prev, { type: 'input', content: `${getPathString()} $ ${trimmed}` }]);
    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const [cmd, ...args] = trimmed.split(' ');
    const arg = args.join(' ');

    const found = executeCommand(cmd, {
      args: arg,
      currentPath,
      filesystem,
      commandHistory,
      addOutput,
      setCurrentPath,
      clearHistory: clearHistoryFn,
      getCurrentDir,
      resolvePath,
      getPathCompletions,
    });

    if (!found) {
      addOutput(`${cmd}: command not found. Type 'help' for available commands.`);
    }
  }, [currentPath, filesystem, commandHistory, addOutput, clearHistoryFn, getCurrentDir, resolvePath, getPathCompletions]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;

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
      // Tab completion with path support - only if there's input
      if (!currentInput.trim()) return;

      const parts = currentInput.split(' ');
      const partial = parts[parts.length - 1];
      if (!partial) return; // No partial to complete

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
    } else if (e.ctrlKey) {
      switch (e.key) {
        case 'l':
          // Clear screen
          e.preventDefault();
          setHistory([]);
          break;
        case 'c':
          // Cancel current input
          e.preventDefault();
          setHistory(prev => [...prev, { type: 'input', content: `${getPathString()} $ ${currentInput}^C` }]);
          setCurrentInput('');
          break;
        case 'a':
          // Move to start of line
          e.preventDefault();
          input.setSelectionRange(0, 0);
          break;
        case 'e':
          // Move to end of line
          e.preventDefault();
          input.setSelectionRange(currentInput.length, currentInput.length);
          break;
        case 'u':
          // Clear line before cursor
          e.preventDefault();
          const pos = input.selectionStart || 0;
          setCurrentInput(currentInput.slice(pos));
          setTimeout(() => input.setSelectionRange(0, 0), 0);
          break;
        case 'k':
          // Clear line after cursor
          e.preventDefault();
          const kPos = input.selectionStart || 0;
          setCurrentInput(currentInput.slice(0, kPos));
          break;
        case 'w':
          // Delete word before cursor
          e.preventDefault();
          const wPos = input.selectionStart || 0;
          const beforeCursor = currentInput.slice(0, wPos);
          const afterCursor = currentInput.slice(wPos);
          const newBefore = beforeCursor.replace(/\S+\s*$/, '');
          setCurrentInput(newBefore + afterCursor);
          setTimeout(() => input.setSelectionRange(newBefore.length, newBefore.length), 0);
          break;
      }
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
    <div className="terminal-window">
      {/* Title bar */}
      <div className="terminal-window__titlebar">
        <div className="terminal-window__buttons">
          <a
            href="https://dave-kav.com"
            className="terminal-window__button terminal-window__button--close"
            title="Back to dave-kav.com"
          />
          <span className="terminal-window__button terminal-window__button--minimize" />
          <span className="terminal-window__button terminal-window__button--maximize" />
        </div>
        <div className="terminal-window__title">dave-kav — zsh — 80×24</div>
        <div className="terminal-window__spacer" />
      </div>

      {/* Terminal content */}
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
      </div>

      {/* Status bar */}
      <div className="terminal-window__statusbar">
        <span className="terminal-window__status-left">
          {getPathString()}
        </span>
        <span className="terminal-window__status-right">
          <a href="https://dave-kav.com" className="terminal-window__status-link">dave-kav.com</a>
        </span>
      </div>
    </div>
  );
};
