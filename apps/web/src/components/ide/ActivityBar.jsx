import React from 'react';
import { Files, Search, GitBranch, Bug, Package, Settings, User } from 'lucide-react';
import { useWorkspace } from '@/hooks/use-workspace.jsx';
import { cv } from '@/data/cv.js';

const items = [
  { id: 'files', icon: Files, label: 'Explorer', shortcut: '⌘B' },
  { id: 'search', icon: Search, label: 'Search', shortcut: '⌘⇧F' },
  { id: 'git', icon: GitBranch, label: 'Source Control', shortcut: '⌃⇧G' },
  { id: 'debug', icon: Bug, label: 'Run & Debug', shortcut: '⌘⇧D' },
  { id: 'extensions', icon: Package, label: 'Extensions', shortcut: '⌘⇧X' },
];

export default function ActivityBar() {
  const { sidebarOpen, toggleSidebar, togglePalette } = useWorkspace();

  return (
    <aside className="w-12 shrink-0 flex flex-col items-center justify-between bg-[var(--chrome-activitybar)] border-r border-[var(--chrome-border)] py-2">
      <div className="flex flex-col items-center gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isFiles = item.id === 'files';
          const isActive = isFiles && sidebarOpen;
          return (
            <button
              key={item.id}
              title={`${item.label} (${item.shortcut})`}
              onClick={isFiles ? toggleSidebar : togglePalette}
              className={`relative w-10 h-10 flex items-center justify-center text-[var(--chrome-fg-muted)] hover:text-[var(--chrome-fg)] transition group`}
            >
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-[var(--chrome-fg)]" />
              )}
              <Icon className={`w-5 h-5 ${isActive ? 'text-[var(--chrome-fg)]' : ''}`} />
            </button>
          );
        })}
      </div>
      <div className="flex flex-col items-center gap-2">
        <button
          title="Settings"
          onClick={togglePalette}
          className="w-10 h-10 flex items-center justify-center text-[var(--chrome-fg-muted)] hover:text-[var(--chrome-fg)]"
        >
          <Settings className="w-5 h-5" />
        </button>
        <div
          title={`${cv.identity.name} — ${cv.identity.availabilityNote}`}
          className="relative w-7 h-7 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--syntax-string)] flex items-center justify-center text-[10px] font-bold text-[var(--chrome-titlebar)] mb-1"
        >
          {cv.identity.avatarInitials}
          {cv.identity.available && (
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#28C840] border-2 border-[var(--chrome-activitybar)]" />
          )}
        </div>
      </div>
    </aside>
  );
}