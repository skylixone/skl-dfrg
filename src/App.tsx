import { useState, useMemo, useCallback, useEffect } from 'preact/hooks';
import { DefragEngine } from './engine/DefragEngine';
import { DefragSketch } from './components/DefragSketch';
import { SettingsSidebar } from './components/SettingsSidebar';
import { SkinProvider, useSkin, Theme, WIN9X_THEME } from './components/SkinProvider';
import { ChevronRight, Settings2 } from 'lucide-react';

export interface DefragConfig {
  gridWidth: number;
  gridHeight: number;
  blockSize: number;
  blockGap: number;
  readDelay: number;
  writeDelay: number;
  theme: Theme;
}

const DEFAULT_CONFIG: DefragConfig = {
  gridWidth: 40,
  gridHeight: 25,
  blockSize: 16,
  blockGap: 2,
  readDelay: 100,
  writeDelay: 100,
  theme: WIN9X_THEME
};

function DefragApp() {
  const { theme, setTheme } = useSkin();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(true);
  
  // Initialize config state with the active theme from provider
  const [config, setConfig] = useState<DefragConfig>(() => ({
    ...DEFAULT_CONFIG,
    theme: theme
  }));
  
  const [tick, setTick] = useState(0);

  // Initialize engine with initial config
  const engine = useMemo(() => new DefragEngine(config), []);

  const forceUpdate = useCallback(() => {
    setTick(t => t + 1);
  }, []);

  // Auto-start on mount
  useEffect(() => {
    engine.start(forceUpdate);
    return () => engine.stop();
  }, []);

  // Sync config theme when global theme changes
  useEffect(() => {
    setConfig(c => ({ ...c, theme }));
    engine.updateConfig({ theme });
  }, [theme]);

  const handleConfigChange = (newConfig: Partial<DefragConfig>) => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);
    engine.updateConfig(newConfig);
  };

  const handleReset = () => {
    engine.reset();
    forceUpdate();
  };

  const handleStart = () => {
    engine.start(forceUpdate);
  };

  const handlePause = () => {
    engine.stop();
    forceUpdate();
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div class="flex h-screen overflow-hidden transition-colors duration-500" style={{ backgroundColor: theme.backgroundColor }}>
      {/* Sidebar Wrapper */}
      <div 
        className={`flex transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-0' : 'w-80'}`}
        style={{ overflow: 'hidden' }}
      >
        <SettingsSidebar 
          config={config} 
          onConfigChange={handleConfigChange}
          onReset={handleReset}
          onStart={handleStart}
          onPause={handlePause}
          onThemeChange={handleThemeChange}
          status={engine.getStatus()}
          progress={engine.getProgress()}
        />
      </div>

      {/* Collapse Toggle */}
      <button 
        onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
        className="fixed left-4 bottom-4 z-50 p-3 bg-zinc-900 hard-border text-amber-500 hover:bg-zinc-800 transition-colors"
        title={isSidebarCollapsed ? "Show Settings" : "Hide Settings"}
      >
        {isSidebarCollapsed ? <Settings2 size={20} /> : <ChevronRight size={20} className="rotate-180" />}
      </button>

      {/* Main Canvas Area */}
      <main class="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div 
          class="hard-border p-4 transition-colors duration-500" 
          style={{ backgroundColor: theme.backgroundColor === '#000000' ? '#09090b' : theme.backgroundColor }}
        >
          <DefragSketch engine={engine} config={config} />
        </div>
      </main>
    </div>
  );
}

export function App() {
  return (
    <SkinProvider>
      <DefragApp />
    </SkinProvider>
  );
}
