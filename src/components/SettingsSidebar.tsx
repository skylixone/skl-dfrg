import { BlockState, Theme, THEMES } from './SkinProvider';

export interface DefragConfig {
  gridWidth: number;
  gridHeight: number;
  blockSize: number;
  blockGap: number;
  readDelay: number;
  writeDelay: number;
  theme: Theme;
}

interface Props {
  config: DefragConfig;
  onConfigChange: (newConfig: Partial<DefragConfig>) => void;
  onReset: () => void;
  onStart: () => void;
  onPause: () => void;
  onThemeChange: (theme: Theme) => void;
  status: string;
  progress: number;
}

export function SettingsSidebar({ 
  config, 
  onConfigChange, 
  onReset, 
  onStart, 
  onPause, 
  onThemeChange,
  status, 
  progress 
}: Props) {
  const handleChange = (key: keyof DefragConfig, value: any) => {
    onConfigChange({ [key]: value });
  };

  const handleColorChange = (state: BlockState, color: string) => {
    onConfigChange({
      theme: {
        ...config.theme,
        colors: {
          ...config.theme.colors,
          [state]: color,
        },
      },
    });
  };

  return (
    <div class="w-80 hard-border bg-[#09090b] flex flex-col h-full overflow-y-auto z-10">
      {/* Header */}
      <div class="p-4 border-b border-[#27272a]">
        <h1 class="font-bold text-amber-500 tracking-widest text-lg">THE-DEFRAG</h1>
        <p class="label-tracked mt-1">v1.1.0 (SKINNED)</p>
      </div>

      {/* Stats Section */}
      <div class="p-4 border-b border-[#27272a] strike-line space-y-4">
        <div>
          <label class="label-tracked block mb-1">Status</label>
          <div class="text-xl font-bold text-[#fafafa]">{status}</div>
        </div>
        <div>
          <label class="label-tracked block mb-1">Progress</label>
          <div class="flex items-center gap-2">
            <div class="flex-1 h-4 bg-zinc-900 border border-zinc-800">
              <div 
                class="h-full bg-amber-500 transition-all duration-300" 
                style={{ width: `${progress}%` }} 
              />
            </div>
            <span class="text-sm font-bold min-w-[3ch]">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div class="p-4 border-b border-[#27272a] space-y-2">
        <label class="label-tracked block mb-2">Simulation</label>
        <div class="grid grid-cols-2 gap-2">
          {status === 'PAUSED' ? (
            <button onClick={onStart} class="hard-border px-3 py-2 bg-amber-500 text-black font-bold hover:bg-amber-400">START</button>
          ) : (
            <button onClick={onPause} class="hard-border px-3 py-2 bg-zinc-800 text-[#fafafa] font-bold hover:bg-zinc-700">PAUSE</button>
          )}
          <button onClick={onReset} class="hard-border px-3 py-2 bg-zinc-900 text-[#fafafa] font-bold hover:bg-zinc-800">RESET</button>
        </div>
      </div>

      {/* Config Sections */}
      <div class="p-4 space-y-6 flex-1">
        {/* Theme Selection */}
        <section class="space-y-4">
          <label class="label-tracked block border-b border-[#27272a] pb-1">Skin / OS</label>
          <div class="grid grid-cols-1 gap-2">
            {THEMES.map(t => (
              <button 
                key={t.id}
                onClick={() => onThemeChange(t)}
                class={`text-left px-3 py-2 text-xs font-bold border ${config.theme.id === t.id ? 'bg-amber-500 text-black border-amber-500' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'}`}
              >
                {t.name.toUpperCase()}
              </button>
            ))}
          </div>
        </section>

        {/* Geometry */}
        <section class="space-y-4">
          <label class="label-tracked block border-b border-[#27272a] pb-1">Geometry</label>
          
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-xs text-zinc-400">Block Size</span>
              <span class="text-xs font-bold text-amber-500">{config.blockSize}px</span>
            </div>
            <input 
              type="range" min="4" max="32" step="2"
              value={config.blockSize}
              onInput={(e) => handleChange('blockSize', parseInt(e.currentTarget.value))}
              class="w-full accent-amber-500"
            />
          </div>

          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-xs text-zinc-400">Block Gap</span>
              <span class="text-xs font-bold text-amber-500">{config.blockGap}px</span>
            </div>
            <input 
              type="range" min="0" max="8" step="1"
              value={config.blockGap}
              onInput={(e) => handleChange('blockGap', parseInt(e.currentTarget.value))}
              class="w-full accent-amber-500"
            />
          </div>
        </section>

        {/* Timings */}
        <section class="space-y-4">
          <label class="label-tracked block border-b border-[#27272a] pb-1">Timings</label>
          
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-xs text-zinc-400">Read Delay</span>
              <span class="text-xs font-bold text-amber-500">{config.readDelay}ms</span>
            </div>
            <input 
              type="range" min="0" max="500" step="10"
              value={config.readDelay}
              onInput={(e) => handleChange('readDelay', parseInt(e.currentTarget.value))}
              class="w-full accent-amber-500"
            />
          </div>

          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-xs text-zinc-400">Write Delay</span>
              <span class="text-xs font-bold text-amber-500">{config.writeDelay}ms</span>
            </div>
            <input 
              type="range" min="0" max="500" step="10"
              value={config.writeDelay}
              onInput={(e) => handleChange('writeDelay', parseInt(e.currentTarget.value))}
              class="w-full accent-amber-500"
            />
          </div>
        </section>

        {/* Colors */}
        <section class="space-y-4 pb-8">
          <label class="label-tracked block border-b border-[#27272a] pb-1">Palette Override</label>
          <div class="grid grid-cols-2 gap-3">
            {Object.entries(config.theme.colors).map(([state, color]) => (
              <div key={state} class="flex items-center gap-2">
                <input 
                  type="color" 
                  value={color}
                  onInput={(e) => handleColorChange(parseInt(state) as BlockState, e.currentTarget.value)}
                  class="w-6 h-6 bg-transparent border-none cursor-pointer"
                />
                <span class="text-[10px] uppercase text-zinc-500">
                  {Object.keys(BlockState).find(key => (BlockState as any)[key] === parseInt(state))}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
