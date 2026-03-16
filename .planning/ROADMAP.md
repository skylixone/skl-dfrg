# ROADMAP: the-defrag

## 🏁 Phase 1: Core Engine & Basic Rendering (Complete)
- **Goal:** Get a grid of blocks on the screen with basic "defrag" movement logic.
- [x] Initialize project (Vite + React + Tailwind + p5.js).
- [x] Implement `DefragEngine` (Grid data structure, movement logic).
- [x] Basic Canvas/p5.js renderer for blocks.
- [x] Simple "Start/Pause" controls.

## 🏁 Phase 2: Skinning System & Themes (Complete)
- **Goal:** Implement the ability to change the look and feel via JSON themes.
- [x] Build the `SkinProvider` and theme loader.
- [x] Create at least 3 initial themes (Windows 9x, Norton, Modern).
- [x] Add skin-specific background colors, grid layouts, and block shapes.

## 📊 Phase 3: Dashboard & Controls
- **Goal:** Build the UI wrapper (dashboard) that displays metrics.
- [ ] Create the `Dashboard` component (Progress, Scanning, Time).
- [ ] Add settings panel (Speed, Block density, Theme selector).
- [ ] Synchronize engine state with the UI.

## ✨ Phase 4: Polish & Refinement
- **Goal:** Add extra visual effects and "cosplay" details.
- [ ] Add "Cluster info" hover effect (fake metadata).
- [ ] Implement "Bad block" simulation.
- [ ] Optimize rendering for large grids (offscreen canvas if needed).
- [ ] Final UI/UX tweaks (all-caps spacing, rhythm of entry).

## 🚀 Phase 5: Deployment
- **Goal:** Deploy the single-page application.
- [ ] Prepare static build.
- [ ] Deploy to Vercel/GitHub Pages.
