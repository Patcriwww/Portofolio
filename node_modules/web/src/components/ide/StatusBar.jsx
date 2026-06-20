import React, { useEffect, useState } from 'react';
import { GitBranch, AlertTriangle, AlertCircle, Wifi, Bell, Check, MapPin } from 'lucide-react';
import { useWorkspace } from '@/hooks/use-workspace.jsx';
import { cv } from '@/data/cv.js';

const formatTime = (d) =>
  d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: cv.identity.timezone,
  });

export default function StatusBar() {
  const { activeFile, togglePalette } = useWorkspace();
  const [time, setTime] = useState(formatTime(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 30 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="h-6 shrink-0 flex items-center justify-between px-2 bg-[var(--chrome-statusbar)] text-[var(--chrome-statusbar-fg)] text-[11px] border-t border-[var(--chrome-border)] select-none">
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1 hover:bg-white/10 px-1.5 h-full">
          <GitBranch className="w-3 h-3" />
          <span>main</span>
        </button>
        <span className="flex items-center gap-1 hover:bg-white/10 px-1.5 h-full">
          <AlertCircle className="w-3 h-3" />
          <span>0</span>
          <AlertTriangle className="w-3 h-3 ml-1" />
          <span>0</span>
        </span>
        <span className="flex items-center gap-1 hover:bg-white/10 px-1.5 h-full">
          <Check className="w-3 h-3" />
          <span>build passing</span>
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden md:flex items-center gap-1 px-1.5">
          <MapPin className="w-3 h-3" />
          <span>{cv.identity.location}</span>
        </span>
        <span className="hidden md:inline px-1.5 tabular-nums">{time}</span>
        <span className="hidden lg:inline px-1.5">Ln 1, Col 1</span>
        <span className="hidden lg:inline px-1.5">UTF-8</span>
        <span className="hidden lg:inline px-1.5">LF</span>
        <button
          onClick={togglePalette}
          className="px-1.5 hover:bg-white/10 h-full capitalize"
        >
          {activeFile.language}
        </button>
        <span className="flex items-center gap-1 px-1.5">
          <Wifi className="w-3 h-3" />
        </span>
        <span className="flex items-center gap-1 px-1.5">
          <Bell className="w-3 h-3" />
        </span>
        <span className="hidden sm:flex items-center gap-1 px-1.5 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          LIVE
        </span>
      </div>
    </footer>
  );
}