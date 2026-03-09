import { ReactNode } from 'react';

export interface FileSystem {
  [key: string]: string | FileSystem;
}

export interface CommandContext {
  args: string;
  currentPath: string[];
  filesystem: FileSystem;
  commandHistory: string[];
  addOutput: (content: string | ReactNode) => void;
  setCurrentPath: (path: string[]) => void;
  clearHistory: () => void;
  getCurrentDir: () => FileSystem | string;
  resolvePath: (path: string) => { item: FileSystem | string; parentDir: FileSystem | null; name: string } | null;
  getPathCompletions: (partial: string) => string[];
}

export interface Command {
  name: string;
  aliases?: string[];
  description: string;
  usage?: string;
  handler: (ctx: CommandContext) => void;
}
