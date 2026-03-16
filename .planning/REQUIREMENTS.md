# REQUIREMENTS: the-defrag

## 🎯 Functional Requirements

### FR-1: Defrag Engine (The Simulator)
- **Grid-based rendering:** Blocks arranged in a grid (configurable density).
- **Block states:** Free space, Allocated, Reading, Writing, Moving (Defragmenting), Bad Block.
- **Simulation logic:** A basic algorithm that "cleans up" a fragmented drive (moving blocks to the start of the grid).
- **Performance:** Handle 1000+ blocks at 60fps.

### FR-2: Skinning System
- **Theme support:** JSON-based skin definitions.
- **Visual properties:** Block colors, stroke, shadows, grid spacing.
- **Nostalgic modes:**
  - `Windows 9x` (Classic blue/red/white)
  - `Norton Utilities` (Green/Amber)
  - `Modern Glass` (Translucent/Gradients)
  - `Dark Matrix` (Green on black)

### FR-3: User Interface (UI)
- **Dashboard:** Show "Progress (%)", "Clusters scanned", "Elapsed time", "Remaining time" (fake/calculated).
- **Controls:** Start/Pause/Reset buttons.
- **Settings:** Adjust speed, block size, and theme.

## 🎨 Design Requirements (Cosplay Focus)
- **Fidelity:** Must look and feel like an authentic defragmenter.
- **Interactions:** Subtle hover states on blocks to show "Cluster info" (fake metadata).
- **Audio (Optional):** Clicky/Whirring disk sounds (toggleable).

## 🛠️ Non-Functional Requirements
- **Responsive:** Fluid layout for different screen sizes (fit the "grid").
- **Zero Dependencies (Mostly):** Use lightweight libraries (p5.js).
- **Accessibility:** Keyboard shortcuts for controls.

## 🛣️ Success Criteria (Verifiable)
- [ ] Simulation runs without lag on standard browsers.
- [ ] At least 3 distinct skins are available and switchable.
- [ ] UI reflects the state of the simulation accurately.
- [ ] Single-page HTML artifact is self-contained.
