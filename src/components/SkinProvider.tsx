import { createContext } from 'preact';
import { useContext, useState, useEffect } from 'preact/hooks';

export enum BlockState {
  EMPTY = 0,
  ALLOCATED = 1,
  FRAGMENTED = 2,
  UNMOVABLE = 3,
  READING = 4,
  WRITING = 5
}

export interface ThemeColors {
  [key in BlockState]: string;
}

export class Theme {
  id: string = '';
  name: string = '';
  colors!: ThemeColors;
  backgroundColor: string = '';
  borderRadius: number = 0;
  blockGap: number = 0;
}

export const WIN9X_THEME: Theme = {
  id: 'win9x',
  name: 'Windows 9x',
  colors: {
    [BlockState.EMPTY]: "#18181b", // zinc-900
    [BlockState.ALLOCATED]: "#3b82f6", // blue-500
    [BlockState.FRAGMENTED]: "#1e40af", // blue-800
    [BlockState.UNMOVABLE]: "#ef4444", // red-500
    [BlockState.READING]: "#f59e0b", // amber-500
    [BlockState.WRITING]: "#10b981", // emerald-500
  },
  backgroundColor: "#000000",
  borderRadius: 0,
  blockGap: 2,
};

export const MODERN_THEME: Theme = {
  id: 'modern',
  name: 'Modern UI',
  colors: {
    [BlockState.EMPTY]: "#27272a", // zinc-800
    [BlockState.ALLOCATED]: "#60a5fa", // blue-400
    [BlockState.FRAGMENTED]: "#3f3f46", // zinc-700
    [BlockState.UNMOVABLE]: "#f43f5e", // rose-500
    [BlockState.READING]: "#fbbf24", // amber-400
    [BlockState.WRITING]: "#34d399", // emerald-400
  },
  backgroundColor: "#09090b", // zinc-950
  borderRadius: 4,
  blockGap: 4,
};

export const NORTON_THEME: Theme = {
  id: 'norton',
  name: 'Norton Disk Doctor',
  colors: {
    [BlockState.EMPTY]: "#000000",
    [BlockState.ALLOCATED]: "#ffffff",
    [BlockState.FRAGMENTED]: "#888888",
    [BlockState.UNMOVABLE]: "#ff0000",
    [BlockState.READING]: "#ffff00",
    [BlockState.WRITING]: "#00ff00",
  },
  backgroundColor: "#000088", // Classic blue
  borderRadius: 0,
  blockGap: 1,
};

export const THEMES: Theme[] = [WIN9X_THEME, MODERN_THEME, NORTON_THEME];

interface SkinContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
}

const SkinContext = createContext<SkinContextType | undefined>(undefined);

export function SkinProvider({ children }: { children: preact.ComponentChildren }) {
  const [theme, setTheme] = useState<Theme>(WIN9X_THEME);

  // Sync theme to document body for global styling if needed
  useEffect(() => {
    document.body.style.backgroundColor = theme.backgroundColor;
  }, [theme]);

  return (
    <SkinContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </SkinContext.Provider>
  );
}

export function useSkin() {
  const context = useContext(SkinContext);
  if (context === undefined) {
    throw new Error('useSkin must be used within a SkinProvider');
  }
  return context;
}
