import React, { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { FILES } from '@/data/cv.js';

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
  const [openTabs, setOpenTabs] = useState(FILES.map((f) => f.id));
  const [activeId, setActiveId] = useState(FILES[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const scrollerRef = useRef(null);
  const lockScrollSpyRef = useRef(0);

  const openFile = useCallback((id) => {
    if (!FILES.some((f) => f.id === id)) return;
    setOpenTabs((tabs) => (tabs.includes(id) ? tabs : [...tabs, id]));
    setActiveId(id);
    const el = document.getElementById(`file-${id}`);
    const scroller = scrollerRef.current;
    if (el && scroller) {
      lockScrollSpyRef.current = Date.now() + 700;
      scroller.scrollTo({ top: el.offsetTop - 8, behavior: 'smooth' });
    }
  }, []);

  const closeTab = useCallback(
    (id) => {
      setOpenTabs((tabs) => {
        const next = tabs.filter((t) => t !== id);
        if (activeId === id && next.length) setActiveId(next[0]);
        return next;
      });
    },
    [activeId],
  );

  const reopenAll = useCallback(() => {
    setOpenTabs(FILES.map((f) => f.id));
  }, []);

  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);
  const toggleTerminal = useCallback(() => setTerminalOpen((v) => !v), []);
  const togglePalette = useCallback(() => setPaletteOpen((v) => !v), []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const onScroll = () => {
      if (Date.now() < lockScrollSpyRef.current) return;
      const center = scroller.scrollTop + scroller.clientHeight * 0.25;
      let current = openTabs[0] || FILES[0].id;
      for (const id of openTabs) {
        const el = document.getElementById(`file-${id}`);
        if (el && el.offsetTop <= center) current = id;
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [openTabs]);

  const activeFile = useMemo(
    () => FILES.find((f) => f.id === activeId) || FILES[0],
    [activeId],
  );

  const value = {
    files: FILES,
    openTabs,
    activeId,
    activeFile,
    openFile,
    closeTab,
    reopenAll,
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    terminalOpen,
    setTerminalOpen,
    toggleTerminal,
    paletteOpen,
    setPaletteOpen,
    togglePalette,
    scrollerRef,
  };

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspace must be used within WorkspaceProvider');
  return ctx;
}