# Napkin

## Corrections
| Date | Source | What Went Wrong | What To Do Instead |
|------|--------|----------------|-------------------|
| 2026-03-16 | user | Claimed Phase 1 was complete and ready for testing without verifying the visual output, resulting in a blank page for the user. | **Mandatory:** Always use `dev-browser` to perform a visual check of claims before presenting them as "complete" or "ready" to the user. |
| 2026-03-16 | self | Case sensitivity issue with `App.tsx` vs `app.tsx` caused import failures in `main.tsx`. | Always verify file case sensitivity on the FS before writing imports, especially when scaffolding with Vite templates that might differ from expected naming. |

## User Preferences
- **Lightweight First**: Avoid React if possible; use Preact or Vanilla TS.
- **Aesthetic**: `aerospace-ui` (Geist Mono, 0px radius, hard borders, amber accents, high-density, no shadows).
- **Customization**: Every visual parameter (sizes, paddings, colors, timings) must be adjustable at runtime.
- **Tone**: Professional, direct, senior engineer peer. No conversational filler.

## Patterns That Work
- **p5.js Instance Mode**: Better for React/Preact integration and memory management.
- **Decoupled Engine**: Keeping `DefragEngine` as a pure TS class makes it unit-testable and framework-agnostic.

## Domain Notes
- Project is a nostalgic "cosplay" of 90s defrag tools but with a modern dev-tool aesthetic.
- "Rhythm of Entry": Internal padding must equal external gap to synchronize strike lines.
- All-caps text must be letter-spaced (tracked) by 0.05em to 0.1em.
