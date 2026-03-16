# Phase 2: Skinning System & Themes - Context

**Gathered:** 2026-03-16
**Status:** Ready for planning
**Source:** Phase 1 Completion & Road Map

<domain>
## Phase Boundary
This phase introduces the skinning system, allowing the application to switch between different "OS" aesthetics (Windows 9x, Modern/Win10, Norton Disk Doctor). It involves defining a theme schema that extends the current `DefragConfig`.

</domain>

<decisions>
## Implementation Decisions

### Theme Schema
- **Colors:** Extend the current `colors` mapping for each `BlockState`.
- **Styling:** Add properties for `borderRadius` (for Modern vs. 9x), `strokeWeight` (if any), and `background`.
- **Animations:** Maybe some themes have faster or slower visual transitions?

### Theme Provider
- Use React Context (via Preact's `createContext`) to share the active theme across components.
- Store themes as JSON objects in a `themes/` directory or a consolidated `themes.ts` file.

### Themes to Implement
1. **Windows 9x:** Solid blue/red/white blocks, no border radius, gray background.
2. **Modern:** Rounded blocks, softer colors, dark mode support.
3. **Norton:** The "Dr. Norton" classic look (green/white).

</decisions>

<specifics>
## Specific Ideas
- The `DefragSketch` should listen to the `SkinProvider` to update its rendering logic in real-time.
- Use CSS variables for some global UI elements (sidebar) to match the theme.

</specifics>

<deferred>
## Deferred Ideas
- Sound effects (Phase 4).
- Custom user themes via UI (Phase 3).
- Bad block simulation (Phase 4).

</deferred>

---

*Phase: 02-skinning-system*
*Context gathered: 2026-03-16 via Phase 1 completion*
