# Plan: Phase 1 - Core Engine & Basic Rendering

```yaml
wave: 1
depends_on: []
files_modified:
  - package.json
  - src/engine/DefragEngine.ts
  - src/components/DefragSketch.tsx
  - src/components/SettingsSidebar.tsx
  - src/App.tsx
  - src/index.css
  - src/engine/DefragEngine.test.ts
autonomous: true
```

## 🎯 Goal
Implement the core simulation engine and a highly customizable visual grid that mimics 90s-era defragmentation tools using p5.js and Preact, with a modern "aerospace-ui" aesthetic.

## 🛠️ Tasks

<task id="T-001" name="Project Initialization">
Initialize the Vite + Preact + TypeScript environment with Tailwind CSS and p5.js.

- [ ] Scaffolding: `npm create vite@latest . -- --template preact-ts` (if not already present).
- [ ] Install dependencies: `p5`, `lucide-react` (for icons), `clsx`, `tailwind-merge`.
- [ ] Setup Tailwind CSS v4 with "aerospace-ui" config (Geist Mono, 0px radius, amber accents).
- [ ] Create directory structure: `src/engine`, `src/components`, `src/types`.

**Verification:** `npm run dev` starts successfully; Tailwind styles follow the aerospace-ui guidelines.
</task>

<task id="T-002" name="Implement DefragEngine Logic">
Build a standalone `DefragEngine` class that is completely decoupled from rendering.

- [ ] Define `BlockState` enum and `DefragConfig` interface (for timings, sizes, etc.).
- [ ] Implement `DefragEngine` class that accepts a `config` object.
- [ ] Add `initializeRandomGrid()` and `nextStep()` with adjustable "Read/Write" timings.
- [ ] Ensure all engine logic is unit-testable.

**Verification:** Unit tests in `DefragEngine.test.ts` pass for state transitions and timing logic.
</task>

<task id="T-003" name="Implement p5.js Sketch Renderer">
Create a Preact component that integrates p5.js in Instance Mode to render the grid.

- [ ] Build `DefragSketch.tsx` using `useRef` for p5 instance management.
- [ ] Implement reactive updates: the sketch should respond immediately to configuration changes (paddings, colors, etc.).
- [ ] Map engine states to customizable visual themes.

**Verification:** A grid of blocks appears; changes in config (via props) are reflected in real-time.
</task>

<task id="T-004" name="Runtime Settings Sidebar (aerospace-ui)">
Build a high-density settings panel to tweak the simulation in real-time.

- [ ] Create `SettingsSidebar.tsx` using aerospace-ui aesthetic (hard borders, Geist Mono, tracked all-caps).
- [ ] Add sliders for: Block Size, Gap/Padding, Simulation Speed, Timing Delay.
- [ ] Add color pickers for each `BlockState`.
- [ ] Implement a "Theme Presets" selector (e.g., "Win9x", "Modern Amber").

**Verification:** Tweaking a slider in the sidebar instantly updates the canvas rendering or simulation speed.
</task>

<task id="T-005" name="Phase Validation & Screenshot">
Perform a final visual and functional check of the core engine.

- [ ] Run the simulation until completion to ensure no infinite loops.
- [ ] Verify aerospace-ui alignment: check spacing, strike-lines, and all-caps tracking.
- [ ] Capture a screenshot using `get_screenshot` to confirm "aerospace-ui" fidelity.

**Verification:** Simulation completes successfully; UI strictly adheres to the visual directives.
</task>

## 📏 Verification Criteria
- **Simulation Accuracy:** Blocks move correctly according to the "Defrag" logic.
- **Visual Fidelity:** aerospace-ui aesthetic is strictly enforced (0px radius, Geist Mono).
- **Customizability:** Every visual aspect (colors, sizes, paddings) is adjustable at runtime.
- **Performance:** Rendering 1000+ blocks remains steady at 60fps.

## 🏁 Must Haves (Goal-Backward)
- [ ] `DefragEngine` must be decoupled and accept a configuration object.
- [ ] `DefragSketch` must support real-time visual property updates.
- [ ] `SettingsSidebar` must use the aerospace-ui aesthetic for all controls.
- [ ] The simulation must be able to reach a "Finished" state.
