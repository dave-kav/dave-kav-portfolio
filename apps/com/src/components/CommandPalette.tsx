import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './CommandPalette.css';

interface Command {
  id: string;
  label: string;
  icon: string;
  action: () => void;
}

const HISTORY_KEY = 'command-palette-history';
const MAX_HISTORY = 10;

const CommandPalette: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const baseCommands: Command[] = [
    {
      id: 'blogs',
      label: 'Read Blog',
      icon: '✎',
      action: () => navigate('/blogs'),
    },
    {
      id: 'terminal',
      label: 'Open Terminal',
      icon: '>_',
      action: () => window.open('https://dave-kav.dev', '_blank'),
    },
    {
      id: 'github',
      label: 'View GitHub',
      icon: '{}',
      action: () => window.open('https://github.com/dave-kav', '_blank'),
    },
    {
      id: 'linkedin',
      label: 'View LinkedIn',
      icon: 'in',
      action: () => window.open('https://linkedin.com/in/dave-kav', '_blank'),
    },
    {
      id: 'email',
      label: 'Send Email',
      icon: '@',
      action: () => window.location.href = 'mailto:work@dave-kav.com',
    },
    {
      id: 'cv',
      label: 'Download CV',
      icon: '↓',
      action: () => {
        window.open('https://pub-6c7cf0c817ad49ecaa8fa77083a1a590.r2.dev/resume.pdf', '_blank');
      },
    },
  ];

  // Sort commands by recent usage and filter by query
  const commands = useMemo(() => {
    let filtered = baseCommands;

    // Filter by query
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = baseCommands.filter(cmd =>
        cmd.label.toLowerCase().includes(lowerQuery) ||
        cmd.id.toLowerCase().includes(lowerQuery)
      );
    }

    // Sort by recent usage
    if (history.length === 0) return filtered;

    const sorted = [...filtered].sort((a, b) => {
      const aIndex = history.indexOf(a.id);
      const bIndex = history.indexOf(b.id);
      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
    return sorted;
  }, [history, query]);

  const addToHistory = useCallback((commandId: string) => {
    setHistory(prev => {
      const filtered = prev.filter(id => id !== commandId);
      const updated = [commandId, ...filtered].slice(0, MAX_HISTORY);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't trigger shortcuts when typing in an input
    const target = e.target as HTMLElement;
    const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsOpen((prev) => {
        if (!prev) {
          setQuery('');
          setSelectedIndex(0);
        }
        return !prev;
      });
    }

    // `.` shortcut to open terminal (only when not typing and palette closed)
    if (e.key === '.' && !isTyping && !isOpen) {
      window.open('https://dave-kav.dev', '_blank');
      return;
    }

    if (!isOpen) return;

    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % commands.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + commands.length) % commands.length);
    }
    if (e.key === 'Enter' && commands.length > 0) {
      e.preventDefault();
      addToHistory(commands[selectedIndex].id);
      commands[selectedIndex].action();
      setIsOpen(false);
      setQuery('');
    }
  }, [isOpen, selectedIndex, commands, addToHistory]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset selection when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleCommand = (command: Command) => {
    addToHistory(command.id);
    command.action();
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile trigger button */}
      <button
        className="command-palette__mobile-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        ⌘
      </button>

      <AnimatePresence>
        {isOpen && (
        <>
          <motion.div
            className="command-palette__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            className="command-palette"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
          >
            <div className="command-palette__header">
              <span className="command-palette__search-icon">⌘</span>
              <input
                ref={inputRef}
                type="text"
                className="command-palette__input"
                placeholder="Search actions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <kbd>esc</kbd>
            </div>
            <ul className="command-palette__list">
              {commands.length === 0 ? (
                <li className="command-palette__empty">No matching commands</li>
              ) : (
                commands.map((cmd, index) => (
                  <li key={cmd.id}>
                    <button
                      onClick={() => handleCommand(cmd)}
                      className={index === selectedIndex ? 'selected' : ''}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <span className="command-palette__icon">{cmd.icon}</span>
                      <span>{cmd.label}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
};

export default CommandPalette;
