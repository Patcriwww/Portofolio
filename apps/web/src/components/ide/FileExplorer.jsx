import React, { useState } from 'react';
import { ChevronRight, ChevronDown, FileText, MoreHorizontal } from 'lucide-react';
import { useWorkspace } from '@/hooks/use-workspace.jsx';
import { cv } from '@/data/cv.js';

const extColors = {
  md: 'text-sky-400',
  json: 'text-amber-400',
  yml: 'text-rose-400',
  ts: 'text-blue-400',
  tsx: 'text-cyan-400',
  sh: 'text-emerald-400',
};

const FileIcon = ({ ext }) => (
  <span
    className={`inline-flex items-center justify-center w-4 h-4 text-[8.5px] font-bold rounded-[3px] bg-[var(--chrome-bg)] ${extColors[ext] || 'text-zinc-300'} shrink-0`}
  >
    {ext.slice(0, 2).toUpperCase()}
  </span>
);

const FolderRow = ({ open, onClick, label, depth = 0 }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-1 h-[22px] px-2 hover:bg-[var(--chrome-hover)] text-[12px] text-[var(--chrome-fg)] uppercase tracking-wide font-semibold"
    style={{ paddingLeft: 8 + depth * 12 }}
  >
    {open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
    <span className="truncate">{label}</span>
  </button>
);

const FileRow = ({ file, active, onClick, depth = 1 }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2 h-[22px] text-left text-[13px] transition ${
      active
        ? 'bg-[var(--chrome-active)] text-[var(--chrome-fg)]'
        : 'text-[var(--chrome-fg-muted)] hover:bg-[var(--chrome-hover)] hover:text-[var(--chrome-fg)]'
    }`}
    style={{ paddingLeft: 8 + depth * 12, paddingRight: 8 }}
  >
    <FileIcon ext={file.icon} />
    <span className="truncate">{file.name}</span>
  </button>
);

export default function FileExplorer() {
  const { files, activeId, openFile, sidebarOpen } = useWorkspace();
  const [rootOpen, setRootOpen] = useState(true);
  const [srcOpen, setSrcOpen] = useState(true);

  if (!sidebarOpen) return null;

  const repo = cv.meta.repo.split('/').pop();

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col bg-[var(--chrome-sidebar)] border-r border-[var(--chrome-border)] text-[var(--chrome-fg)]">
      <div className="h-9 flex items-center justify-between px-4 text-[11px] uppercase tracking-wider text-[var(--chrome-fg-muted)] border-b border-[var(--chrome-border)]">
        <span>Explorer</span>
        <MoreHorizontal className="w-4 h-4 opacity-60" />
      </div>

      <div className="flex-1 overflow-y-auto py-1">
        <FolderRow
          open={rootOpen}
          onClick={() => setRootOpen((v) => !v)}
          label={repo}
          depth={0}
        />
        {rootOpen && (
          <>
            <FolderRow
              open={srcOpen}
              onClick={() => setSrcOpen((v) => !v)}
              label="src"
              depth={1}
            />
            {srcOpen &&
              files.map((f) => (
                <FileRow
                  key={f.id}
                  file={f}
                  active={activeId === f.id}
                  onClick={() => openFile(f.id)}
                  depth={2}
                />
              ))}
            <button
              className="w-full flex items-center gap-2 h-[22px] pl-5 pr-2 text-left text-[13px] text-[var(--chrome-fg-muted)] hover:bg-[var(--chrome-hover)]"
              style={{ paddingLeft: 8 + 1 * 12 }}
            >
              <FileText className="w-3.5 h-3.5 opacity-70" />
              <span>README.md</span>
            </button>
            <button
              className="w-full flex items-center gap-2 h-[22px] pl-5 pr-2 text-left text-[13px] text-[var(--chrome-fg-muted)] hover:bg-[var(--chrome-hover)]"
              style={{ paddingLeft: 8 + 1 * 12 }}
            >
              <FileText className="w-3.5 h-3.5 opacity-70" />
              <span>package.json</span>
            </button>
            <button
              className="w-full flex items-center gap-2 h-[22px] pl-5 pr-2 text-left text-[13px] text-[var(--chrome-fg-muted)] hover:bg-[var(--chrome-hover)]"
              style={{ paddingLeft: 8 + 1 * 12 }}
            >
              <FileText className="w-3.5 h-3.5 opacity-70" />
              <span>LICENSE</span>
            </button>
          </>
        )}
      </div>

      <div className="border-t border-[var(--chrome-border)] px-4 py-3 text-[11px] text-[var(--chrome-fg-muted)] space-y-1">
        <div className="flex items-center justify-between">
          <span>v{cv.meta.version}</span>
          <span>{cv.meta.license}</span>
        </div>
        <div className="truncate">last edit · {cv.meta.lastUpdated}</div>
      </div>
    </aside>
  );
}