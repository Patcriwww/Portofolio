import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Search,
  FileText,
  Palette,
  PanelLeft,
  Terminal as TerminalIcon,
  Mail,
  Calendar,
  Github,
  Linkedin,
  ExternalLink,
  CornerDownLeft,
} from 'lucide-react';
import { useWorkspace } from '@/hooks/use-workspace.jsx';
import { useTheme } from '@/hooks/use-theme.jsx';
import { cv, FILES } from '@/data/cv.js';

const socialIcon = (label) => {
  const l = label.toLowerCase();
  if (l.includes('git')) return Github;
  if (l.includes('linked')) return Linkedin;
  return ExternalLink;
};

export default function CommandPalette() {
  const { paletteOpen, setPaletteOpen, openFile, toggleSidebar, toggleTerminal } = useWorkspace();
  const { setTheme, themes, theme } = useTheme();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (paletteOpen) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [paletteOpen]);

  const items = useMemo(() => {
    const list = [];
    FILES.forEach((f) =>
      list.push({
        id: `open-${f.id}`,
        label: `Open ${f.name}`,
        hint: f.path,
        icon: FileText,
        run: () => openFile(f.id),
      }),
    );
    themes.forEach((t) =>
      list.push({
        id: `theme-${t.id}`,
        label: `Theme: ${t.label}`,
        hint: theme === t.id ? 'active' : 'switch',
        icon: Palette,
        run: () => setTheme(t.id),
      }),
    );
    list.push({
      id: 'toggle-sidebar',
      label: 'Toggle Explorer',
      hint: '⌘B',
      icon: PanelLeft,
      run: toggleSidebar,
    });
    list.push({
      id: 'toggle-terminal',
      label: 'Toggle Terminal',
      hint: '⌘J',
      icon: TerminalIcon,
      run: toggleTerminal,
    });
    list.push({
      id: 'email',
      label: `Email — ${cv.contact.email}`,
      hint: 'mailto',
      icon: Mail,
      run: () => window.open(`mailto:${cv.contact.email}`),
    });
    list.push({
      id: 'cal',
      label: 'Book a 20-min intro call',
      hint: 'cal.com',
      icon: Calendar,
      run: () => window.open(cv.contact.calendar, '_blank'),
    });
    cv.social.forEach((s) =>
      list.push({
        id: `social-${s.label}`,
        label: `${s.label} — ${s.handle}`,
        hint: s.url.replace(/^https?:\/\//, ''),
        icon: socialIcon(s.label),
        run: () => window.open(s.url, '_blank'),
      }),
    );
    return list;
  }, [openFile, toggleSidebar, toggleTerminal, setTheme, themes, theme]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((i) => i.label.toLowerCase().includes(q) || i.hint?.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    if (active >= filtered.length) setActive(0);
  }, [filtered, active]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(filtered.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = filtered[active];
      if (item) {
        item.run();
        setPaletteOpen(false);
      }
    }
  };

  return (
    <Dialog.Root open={paletteOpen} onOpenChange={setPaletteOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-[18%] z-[70] w-[min(640px,92vw)] -translate-x-1/2 rounded-xl bg-[var(--chrome-bg)] border border-[var(--chrome-border-strong)] shadow-2xl overflow-hidden"
        >
          <Dialog.Title className="sr-only">Command Palette</Dialog.Title>
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--chrome-border)]">
            <Search className="w-4 h-4 text-[var(--chrome-fg-muted)]" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type a command, file, or theme…"
              className="flex-1 bg-transparent outline-none text-[14px] text-[var(--chrome-fg)] placeholder:text-[var(--chrome-fg-faint)]"
            />
            <kbd className="text-[10px] text-[var(--chrome-fg-faint)] px-1.5 py-0.5 border border-[var(--chrome-border)] rounded">
              ESC
            </kbd>
          </div>
          <ul className="max-h-[60vh] overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-4 py-8 text-center text-[13px] text-[var(--chrome-fg-muted)]">
                No matches.
              </li>
            )}
            {filtered.map((item, i) => {
              const Icon = item.icon;
              const isActive = i === active;
              return (
                <li key={item.id}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => {
                      item.run();
                      setPaletteOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-left text-[13px] transition ${
                      isActive
                        ? 'bg-[var(--chrome-active)] text-[var(--chrome-fg)]'
                        : 'text-[var(--chrome-fg-muted)] hover:text-[var(--chrome-fg)]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 opacity-80" />
                    <span className="flex-1 truncate">{item.label}</span>
                    <span className="text-[11px] text-[var(--chrome-fg-faint)] truncate max-w-[180px]">
                      {item.hint}
                    </span>
                    {isActive && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-[var(--accent)]" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="px-4 py-2 border-t border-[var(--chrome-border)] flex items-center gap-4 text-[10.5px] text-[var(--chrome-fg-faint)]">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 border border-[var(--chrome-border)] rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 border border-[var(--chrome-border)] rounded">↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 border border-[var(--chrome-border)] rounded">↵</kbd>
              select
            </span>
            <span className="ml-auto">{filtered.length} results</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}