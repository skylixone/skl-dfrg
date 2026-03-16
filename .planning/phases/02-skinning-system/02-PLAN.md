# Phase 2: Skinning System & Themes - Plan

**Status:** Implementation
**Phase:** 02-skinning-system

## 🎯 Goals
- Implement a skinning system that supports switching between multiple "vintage OS" themes.
- Support real-time theme switching.
- Define a extensible `Theme` interface.

## 🛠️ Step 1: Define `Theme` Interface & Create Initial Themes
- **Action:** Update `src/types.ts` to include `Theme` and `ThemeColors`.
- **Action:** Create `src/themes.ts` with initial `WIN9X`, `MODERN`, and `NORTON` themes.
- **Verification:** Ensure types match current `DefragConfig` structure.

## 🛠️ Step 2: Create `SkinProvider`
- **Action:** Implement `src/components/SkinProvider.tsx` using Preact's `createContext`.
- **Action:** Wrap the application in `App.tsx` with `SkinProvider`.
- **Verification:** Verify that the active theme is accessible via a `useSkin()` hook.

## 🛠️ Step 3: Update Rendering to Support Themes
- **Action:** Modify `DefragSketch.tsx` to use theme properties (colors, borderRadius).
- **Action:** Update `SettingsSidebar.tsx` to include a theme selector.
- **Verification:** Switch themes in the sidebar and verify the visual change in the grid.

## 🛠️ Step 4: Refine Aesthetics (Visual Spacing & Ryhthm)
- **Action:** Apply the "Rhythm of Entry" principle for padding/gaps in the UI.
- **Action:** Ensure all-caps text has proper letter-spacing.
- **Verification:** Visual inspection of the UI components.

## 🚀 Final Validation
- Run `npm test` to ensure `DefragEngine` is still functionally correct.
- Manually test theme transitions while the engine is running.
