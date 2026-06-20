import React, { useEffect, useRef, useState } from 'react';
import { ChevronUp, ChevronDown, Plus, Trash2, X } from 'lucide-react';
import { useWorkspace } from '@/hooks/use-workspace.jsx';
import { cv } from '@/data/cv.js';

const PROMPT = `${cv.identity.handle}@portfolio`;

const buildScript = () => [
  { kind: 'cmd', text: 'whoami' },
  {
    kind: 'out',
    text: `${cv.identity.role} · ${cv.identity.location} · ${cv.identity.availabilityNote}`,
  },
  { kind: 'cmd', text: 'cat skills.ts | head' },
  {
    kind: 'out',
    text: `${cv.skills.languages.slice(0, 3).join(' · ')} · ${cv.skills.frontend.slice(0, 2).join(' · ')} · ${cv.skills.backend.slice(0, 2).join(' · ')}`,
  },
  { kind: 'cmd', text: 'curl -s morgan.dev/availability' },
  {
    kind: 'out',
    text: `{ "status": "${cv.identity.available ? 'open' : 'busy'}", "next": "${cv.identity.availabilityNote}" }`,
  },
  { kind: 'cmd', text: 'echo "Let\'s build something"' },
  { kind: 'out', text: 'reach out → alex@morgan.dev · cal.com/alexmorgan/intro' },
];

const TYPING_SPEED = 22;
const PAUSE_BETWEEN = 350;

export default function Terminal() {
  const { terminalOpen, toggleTerminal } = useWorkspace();
  const [rendered, setRendered] = useState([]);
  const [typingLine, setTypingLine] = useState('');
  const [done, setDone] = useState(false);
  const scriptRef = useRef(buildScript());
  const indexRef = useRef(0);
  const charRef = useRef(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!terminalOpen) return;
    let timer;
    const tick = () => {
      const script = scriptRef.current;
      const i = indexRef.current;
      if (i >= script.length) {
        setDone(true);
        return;
      }
      const item = script[i];
      if (item.kind === 'out') {
        setRendered((r) => [...r, item]);
        indexRef.current += 1;
        timer = setTimeout(tick, PAUSE_BETWEEN);
        return;
      }
      const c = charRef.current;
      if (c < item.text.length) {
        charRef.current = c + 1;
        setTypingLine(item.text.slice(0, c + 1));
        timer = setTimeout(tick, TYPING_SPEED);
      } else {
        setRendered((r) => [...r, item]);
        setTypingLine('');
        charRef.current = 0;
        indexRef.current += 1;
        timer = setTimeout(tick, PAUSE_BETWEEN);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [terminalOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [rendered, typingLine]);

  if (!terminalOpen) {
    return (
      <button
        onClick={toggleTerminal}
        className="h-7 shrink-0 px-3 flex items-center gap-2 bg-[var(--chrome-tabbar)] border-t border-[var(--chrome-border)] text-[11px] text-[var(--chrome-fg-muted)] hover:text-[var(--chrome-fg)]"
      >
        <ChevronUp className="w-3.5 h-3.5" />
        Show terminal
      </button>
    );
  }

  return (
    <div className="h-56 shrink-0 flex flex-col bg-[var(--chrome-terminal)] border-t border-[var(--chrome-border)]">
      <div className="h-8 shrink-0 flex items-center justify-between bg-[var(--chrome-tabbar)] border-b border-[var(--chrome-border)] px-2 text-[11px] text-[var(--chrome-fg-muted)]">
        <div className="flex items-center gap-1">
          {['PROBLEMS', 'OUTPUT', 'TERMINAL', 'PORTS'].map((label) => (
            <button
              key={label}
              className={`px-2.5 h-6 rounded ${
                label === 'TERMINAL'
                  ? 'text-[var(--chrome-fg)] border-b-2 border-[var(--accent)]'
                  : 'hover:text-[var(--chrome-fg)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="hidden md:inline px-2 text-[10px]">zsh — {PROMPT}</span>
          <button className="p-1 hover:bg-[var(--chrome-hover)] rounded" title="New terminal">
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 hover:bg-[var(--chrome-hover)] rounded" title="Kill">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={toggleTerminal}
            className="p-1 hover:bg-[var(--chrome-hover)] rounded"
            title="Hide terminal"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 hover:bg-[var(--chrome-hover)] rounded" title="Close">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-2 font-mono text-[12.5px] leading-[20px]">
        {rendered.map((l, i) =>
          l.kind === 'cmd' ? (
            <div key={i} className="flex">
              <span className="text-[var(--syntax-fn)] shrink-0">{PROMPT}</span>
              <span className="text-[var(--syntax-comment)] mx-1 shrink-0">~</span>
              <span className="text-[var(--syntax-string)] mx-1 shrink-0">%</span>
              <span className="text-[var(--syntax-fg)]">{l.text}</span>
            </div>
          ) : (
            <div key={i} className="text-[var(--syntax-fg)] opacity-90 pl-1">
              {l.text}
            </div>
          ),
        )}
        {!done && typingLine && (
          <div className="flex">
            <span className="text-[var(--syntax-fn)] shrink-0">{PROMPT}</span>
            <span className="text-[var(--syntax-comment)] mx-1 shrink-0">~</span>
            <span className="text-[var(--syntax-string)] mx-1 shrink-0">%</span>
            <span className="text-[var(--syntax-fg)]">{typingLine}</span>
            <span className="ml-0.5 inline-block w-2 h-4 bg-[var(--syntax-fg)] animate-pulse align-middle" />
          </div>
        )}
        {done && (
          <div className="flex">
            <span className="text-[var(--syntax-fn)] shrink-0">{PROMPT}</span>
            <span className="text-[var(--syntax-comment)] mx-1 shrink-0">~</span>
            <span className="text-[var(--syntax-string)] mx-1 shrink-0">%</span>
            <span className="ml-0.5 inline-block w-2 h-4 bg-[var(--syntax-fg)] animate-pulse align-middle" />
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}