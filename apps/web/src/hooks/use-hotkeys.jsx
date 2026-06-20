import { useEffect } from 'react';
import { useWorkspace } from '@/hooks/use-workspace.jsx';
import { useTheme } from '@/hooks/use-theme.jsx';

export function useHotkeys() {
  const { togglePalette, setPaletteOpen, toggleSidebar, toggleTerminal } = useWorkspace();
  const { cycleTheme } = useTheme();

  useEffect(() => {
    const onKey = (e) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && (e.key === 'k' || e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        togglePalette();
        return;
      }
      if (mod && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleSidebar();
        return;
      }
      if (mod && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        toggleTerminal();
        return;
      }
      if (mod && (e.key === '\\' || e.key === '|')) {
        e.preventDefault();
        cycleTheme();
        return;
      }
      if (e.key === 'Escape') {
        setPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePalette, setPaletteOpen, toggleSidebar, toggleTerminal, cycleTheme]);
}