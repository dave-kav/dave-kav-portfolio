import React from 'react';
import { Command, FileSystem } from './types';

export const lsCommand: Command = {
  name: 'ls',
  aliases: ['dir'],
  description: 'List files in directory',
  usage: 'ls [path]',
  handler: ({ args, resolvePath, addOutput }) => {
    const resolved = resolvePath(args);
    if (!resolved) {
      addOutput(`ls: ${args}: No such file or directory`);
      return;
    }

    if (typeof resolved.item === 'object') {
      const keys = Object.keys(resolved.item);
      const dir = resolved.item;
      const output = React.createElement('span', null,
        keys.map((name, i) => {
          const isDir = typeof dir[name] === 'object';
          return React.createElement(React.Fragment, { key: name },
            i > 0 && '  ',
            React.createElement('span', { className: isDir ? 'terminal__dir' : '' },
              isDir ? `${name}/` : name
            )
          );
        })
      );
      addOutput(output);
    } else {
      addOutput(resolved.name);
    }
  },
};

export const llCommand: Command = {
  name: 'll',
  aliases: ['ls -l', 'la'],
  description: 'List files in long format',
  usage: 'll [path]',
  handler: ({ args, resolvePath, addOutput }) => {
    const resolved = resolvePath(args);
    if (!resolved) {
      addOutput(`ll: ${args}: No such file or directory`);
      return;
    }

    if (typeof resolved.item === 'object') {
      const keys = Object.keys(resolved.item);
      const dir = resolved.item;
      const lines = keys.map(name => {
        const isDir = typeof dir[name] === 'object';
        const type = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
        const icon = isDir ? '📁' : '📄';
        return `${type}  ${icon}  ${name}${isDir ? '/' : ''}`;
      });
      addOutput(lines.join('\n'));
    } else {
      addOutput(resolved.name);
    }
  },
};

export const cdCommand: Command = {
  name: 'cd',
  description: 'Change directory',
  usage: 'cd <dir>',
  handler: ({ args, currentPath, filesystem, setCurrentPath, addOutput }) => {
    if (!args || args === '~') {
      setCurrentPath([]);
      return;
    }

    const cleanPath = args.replace(/\/+$/, '');
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
      addOutput(`cd: no such directory: ${args}`);
    }
  },
};

export const catCommand: Command = {
  name: 'cat',
  aliases: ['less', 'more', 'open'],
  description: 'Display file contents',
  usage: 'cat <file>',
  handler: ({ args, resolvePath, getCurrentDir, addOutput }) => {
    if (!args) {
      addOutput('cat: missing file argument');
      return;
    }

    // Try exact path resolution first
    const resolved = resolvePath(args);
    if (resolved && typeof resolved.item === 'string') {
      addOutput(resolved.item);
      return;
    }

    // Try partial match in current dir (convenience feature)
    const dir = getCurrentDir();
    if (typeof dir === 'object') {
      const match = Object.keys(dir).find(k =>
        k.toLowerCase().includes(args.toLowerCase()) && typeof dir[k] === 'string'
      );
      if (match) {
        addOutput(dir[match] as string);
        return;
      }
    }

    addOutput(`cat: ${args}: No such file`);
  },
};

export const pwdCommand: Command = {
  name: 'pwd',
  description: 'Print working directory',
  handler: ({ currentPath, addOutput }) => {
    addOutput('/' + currentPath.join('/') || '/');
  },
};

export const treeCommand: Command = {
  name: 'tree',
  description: 'Show directory structure',
  handler: ({ filesystem, addOutput }) => {
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
  },
};
