import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Minus, Square, X } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme.jsx';
import { useWorkspace } from '@/hooks/use-workspace.jsx';
import { cv } from '@/data/cv.js';

const TrafficLight = ({ color }) => (
  <span
    className="w-3 h-3 rounded-full inline-block"
    style={{ backgroundColor: color }}
  />
);

export default function TitleBar() {
  const { theme, setTheme, themes } = useTheme();
  const { activeFile, togglePalette } = useWorkspace();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="h-9 shrink-0 flex items-center justify-between px-3 bg-[var(--chrome-titlebar)] border-b border-[var(--chrome-border)] text-[12px] text-[var(--chrome-fg-muted)] select-none">
      <div className="flex items-center gap-2 w-44">
        <TrafficLight color="#FF5F57" />
        <TrafficLight color="#FEBC2E" />
        <TrafficLight color="#28C840" />
      </div>

      <button
        onClick={togglePalette}
        className="flex-1 max-w-md mx-4 h-6 px-3 rounded-md bg-[var(--chrome-bg)] border border-[var(--chrome-border)] hover:border-[var(--chrome-border-strong)] transition flex items-center justify-between text-[11px] text-[var(--chrome-fg-muted)]"
      >
        <span className="truncate">
          {cv.identity.handle} / portfolio &nbsp;—&nbsp; {activeFile.name}
        </span>
        <span className="ml-3 hidden sm:inline-flex items-center gap-1 text-[10px] text-[var(--chrome-fg-faint)]">
          <kbd className="px-1.5 py-0.5 rounded bg-[var(--chrome-titlebar)] border border-[var(--chrome-border)]">⌘</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-[var(--chrome-titlebar)] border border-[var(--chrome-border)]">K</kbd>
        </span>
      </button>

      <div className="flex items-center gap-1 w-44 justify-end" ref={ref}>
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="h-6 px-2 rounded-md hover:bg-[var(--chrome-hover)] flex items-center gap-1.5 text-[11px]"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="capitalize">{themes.find((t) => t.id === theme)?.label}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>
          {open && (
            <div className="absolute right-0 top-7 min-w-[180px] py-1 rounded-md bg-[var(--chrome-bg)] border border-[var(--chrome-border)] shadow-lg z-50">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setOpen(false);
                  }}
                  className="w-full px-3 py-1.5 text-left text-[12px] hover:bg-[var(--chrome-hover)] flex items-center justify-between"
                >
                  <span>{t.label}</span>
                  {theme === t.id && <Check className="w-3.5 h-3.5 text-[var(--accent)]" />}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 ml-2 opacity-60">
          <Minus className="w-3.5 h-3.5" />
          <Square className="w-3 h-3" />
          <X className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}