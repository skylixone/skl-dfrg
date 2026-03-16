# Phase 1: Core Engine & Basic Rendering - Validation

**Created:** 2026-03-16
**Status:** Pending
**Phase:** 01-core-engine

## 🏁 Phase Goal
Get a grid of blocks on the screen with basic "defrag" movement logic.

## 📐 Validation Dimensions

### Dimension 1: Engine Logic (Behavioral)
- [ ] `DefragEngine` correctly initializes a randomized grid (fragmented state).
- [ ] `DefragEngine.nextStep()` correctly identifies the next block to move.
- [ ] `DefragEngine.nextStep()` updates block states (Reading -> Writing -> Idle).
- [ ] Algorithm completes when all allocated blocks are contiguous at the start.

### Dimension 2: Rendering (Visual)
- [ ] `p5.js` canvas renders a grid of 1000+ blocks.
- [ ] Blocks reflect their `DefragEngine` states with correct colors.
- [ ] Animation is smooth (60fps) and updates in real-time.
- [ ] No flickering or layout shifts during rendering.

### Dimension 3: Controls (Interactive)
- [ ] "Start" begins the simulation.
- [ ] "Pause" stops the simulation state updates.
- [ ] "Reset" re-initializes the engine with a new random fragmented state.

### Dimension 4: Performance (Technical)
- [ ] CPU usage remains stable during 1000+ block simulation.
- [ ] Memory leaks are not present (p5.js instance is cleaned up on unmount).

## 🧪 Verification Tasks

### V-001: Unit Test for DefragEngine
**Goal:** Verify the core logic independently of UI.
- [ ] Create `src/engine/DefragEngine.test.ts`.
- [ ] Test grid initialization.
- [ ] Test step-by-step state transitions.
- [ ] Test completion condition.

### V-002: Visual Inspection (Browser)
**Goal:** Verify the rendering and aesthetics.
- [ ] Launch development server.
- [ ] Verify grid layout and block colors.
- [ ] Verify "Reading/Writing" visual feedback.
- [ ] Use `dev-browser` skill to take a screenshot and confirm "cosplay" fidelity.

### V-003: Integration Test
**Goal:** Verify controls interact correctly with the engine.
- [ ] Test Start/Pause functionality in the browser.
- [ ] Verify metrics (Progress %, blocks moved) update in UI.
