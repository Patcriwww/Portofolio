import React from 'react';
import { X, SplitSquareHorizontal, MoreHorizontal } from 'lucide-react';
import { useWorkspace } from '@/hooks/use-workspace.jsx';

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

export default function EditorTabs() {
  const { files, openTabs, activeId, openFile, closeTab } = useWorkspace();
  const tabs = openTabs.map((id) => files.find((f) => f.id === id)).filter(Boolean);

  return (
    <div className="h-9 shrink-0 flex items-stretch bg-[var(--chrome-tabbar)] border-b border-[var(--chrome-border)] overflow-x-auto no-scrollbar">
      {tabs.map((file) => {
        const active = activeId === file.id;
        return (
          <div
            key={file.id}
            className={`group relative flex items-center gap-2 pl-3 pr-2 min-w-[140px] cursor-pointer border-r border-[var(--chrome-border)] text-[12px] transition ${
              active
                ? 'bg-[var(--chrome-tab-active)] text-[var(--chrome-fg)]'
                : 'bg-[var(--chrome-tab-bg)] text-[var(--chrome-fg-muted)] hover:text-[var(--chrome-fg)] hover:bg-[var(--chrome-hover)]'
            }`}
            onClick={() => openFile(file.id)}
          >
            {active && (
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent)]" />
            )}
            <FileIcon ext={file.icon} />
            <span className="truncate">{file.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(file.id);
              }}
              className="ml-1 w-4 h-4 flex items-center justify-center rounded hover:bg-[var(--chrome-hover-strong)] opacity-0 group-hover:opacity-100 transition"
              aria-label={`Close ${file.name}`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      })}
      <div className="flex-1" />
      <div className="flex items-center gap-1 px-2 text-[var(--chrome-fg-muted)]">
        <button className="p-1 rounded hover:bg-[var(--chrome-hover)]" title="Split editor">
          <SplitSquareHorizontal className="w-4 h-4" />
        </button>
        <button className="p-1 rounded hover:bg-[var(--chrome-hover)]" title="More actions">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}