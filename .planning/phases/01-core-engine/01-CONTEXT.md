# Phase 1: Core Engine & Basic Rendering - Context

**Gathered:** 2026-03-16
**Status:** Ready for planning
**Source:** Project Initialization

<domain>
## Phase Boundary
This phase delivers the core simulation engine and the visual grid of blocks. It includes the logic for block movement (defragmentation) and the basic p5.js rendering loop.

</domain>

<decisions>
## Implementation Decisions

### Engine
- Use **p5.js** for rendering. It provides a simple API for 2D grid-based graphics and is well-suited for this "retro" visual style.
- Framework: **React** (Vite) for the UI wrapper, with p5.js integrated via a custom hook or component.

### Grid Data Structure
- Use a 1D or 2D array to represent the "disk".
- Each element (block) will have a `state` (Free, Allocated, Reading, Writing, Moving).

### Defragmentation Logic
- A simple "linear sweep" algorithm: Find the first free block, find the first allocated block after it, and "move" it to the free spot.
- The movement should be visual (transition states).

### Claude's Discretion
- Initial grid size: 40x25 (1000 blocks) to start.
- Block appearance: Square blocks with slight gaps.
- Color palette: Default "Windows 9x" (Blue, Red, White, Gray).

</decisions>

<specifics>
## Specific Ideas
- The `DefragEngine` should be a standalone JS class/logic module to keep it decoupled from React/p5.js.
- Use `requestAnimationFrame` (via p5.js `draw()`) for smooth updates.

</specifics>

<deferred>
## Deferred Ideas
- Skinning system (Phase 2).
- Full dashboard UI (Phase 3).
- Sound effects (Phase 4).

</deferred>

---

*Phase: 01-core-engine*
*Context gathered: 2026-03-16 via Initialization*
