import React, { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';

const fileColors = {
  md: 'text-sky-300',
  json: 'text-amber-300',
  yml: 'text-rose-300',
  ts: 'text-blue-300',
  tsx: 'text-cyan-300',
  sh: 'text-emerald-300',
};

const FileIcon = ({ ext }) => (
  <span
    className={`inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold rounded-sm bg-[var(--chrome-tab-bg)] ${fileColors[ext] || 'text-zinc-300'}`}
  >
    {ext.slice(0, 2).toUpperCase()}
  </span>
);

export default function CodeView({ id, file, children, footer }) {
  const lines = useMemo(() => React.Children.toArray(children), [children]);
  const ext = file.icon;
  const breadcrumbs = file.path.split('/');

  return (
    <section id={`file-${id}`} className="scroll-mt-2">
      <div className="flex items-center gap-1.5 px-4 h-7 text-[11px] text-[var(--chrome-fg-muted)] border-b border-[var(--chrome-border)] bg-[var(--chrome-bg)]">
        {breadcrumbs.map((b, i) => (
          <React.Fragment key={i}>
            {i > 0 && <ChevronRight className="w-3 h-3 opacity-60" />}
            <span className={i === breadcrumbs.length - 1 ? 'text-[var(--chrome-fg)]' : ''}>
              {b}
            </span>
          </React.Fragment>
        ))}
      </div>

      <div className="font-mono text-[13px] leading-[22px] py-3 bg-[var(--syntax-bg)]">
        {lines.map((node, idx) => (
          <div
            key={idx}
            className="group flex items-start hover:bg-[var(--syntax-line-hover)] transition-colors"
          >
            <span className="select-none w-12 pr-3 pl-4 text-right text-[var(--syntax-line-number)] tabular-nums shrink-0">
              {idx + 1}
            </span>
            <span className="flex-1 whitespace-pre-wrap break-words pr-6 text-[var(--syntax-fg)]">
              {node || '\u00A0'}
            </span>
          </div>
        ))}
      </div>

      {footer && (
        <div className="px-4 py-2 text-[11px] text-[var(--chrome-fg-muted)] border-t border-[var(--chrome-border)] flex items-center gap-3">
          <FileIcon ext={ext} />
          <span>{footer}</span>
        </div>
      )}
    </section>
  );
}