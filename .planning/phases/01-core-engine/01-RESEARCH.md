# RESEARCH: Phase 1 - Core Engine & Basic Rendering

## 🛠️ p5.js + React Integration
To ensure high performance and prevent memory leaks, we will use **p5 Instance Mode** instead of Global Mode.

### 1. The React Component Pattern
- **Reference Management:** Use `useRef` to store the p5 instance and the container DIV.
- **Lifecycle:** Use `useEffect` with an empty dependency array to initialize p5 on mount and `p5.remove()` on unmount.
- **Prop Updates:** Implement a custom `updateProps(newProps)` method within the p5 sketch to handle changes (like Start/Pause) without re-instantiating the entire canvas.

### 2. Performance Optimizations
- **Disable Friendly Error System (FES):** Setting `p5.disableFriendlyErrors = true` saves CPU cycles.
- **Batch Rendering:** Instead of calling `fill()` and `stroke()` for every block (1,000+ calls), we will group blocks by state and draw them in batches to minimize WebGL/Canvas context switching.
- **Native Math:** Use `Math.random()` and `Math.floor()` instead of p5's wrappers for slight performance gains in the logic loop.

## 💾 Simulation Logic (The "Cosplay" Engine)
The core of "the-defrag" is the visual state machine that mimics 90s-era disk tools.

### 1. Data Structure
- **1D Disk Array:** The "disk" is represented as a 1D array of integers, where each index maps to a grid cell.
- **Block States:**
  - `0`: Empty (White)
  - `1`: Allocated/Contiguous (Light Blue)
  - `2`: Fragmented (Dark Blue)
  - `3`: Unmovable/System (Red)
  - `4`: Reading (Yellow - Transient)
  - `5`: Writing (Green - Transient)

### 2. The Defragmentation Algorithm
A "Linear Sweep" approach will be used for visual satisfaction:
1. **Target:** Find the first `Empty` (0) block from the start.
2. **Source:** Search forward for the next `Fragmented` (2) or `Allocated` (1) block.
3. **Transition:** 
   - Mark Source as `Reading` (Yellow).
   - Delay ~100ms.
   - Mark Target as `Writing` (Green) and Source as `Empty` (0).
   - Delay ~100ms.
   - Mark Target as `Allocated` (1).
4. **Iterate:** Move the "Target" pointer forward.

### 3. "Authenticity" Features
- **The "Head" Pointer:** A subtle visual indicator (or just the active Reading/Writing flashes) showing where the "drive head" is.
- **Frustration Logic:** Occasionally trigger a "Disk change detected" event that resets the scan pointer to the beginning, simulating the background file writes that plagued old OSs.

## 🎨 Visual Specs
- **Grid Size:** Initial 40x25 (1000 blocks).
- **Block Rendering:** Square blocks with a 1-2px gap.
- **Colors (Win9x Palette):**
  - Background: `#C0C0C0` (Classic Gray)
  - Empty: `#FFFFFF`
  - Fragmented: `#000080` (Navy)
  - Contiguous: `#0000FF` (Blue)
  - Unmovable: `#FF0000` (Red)
  - Reading: `#FFFF00` (Yellow)
  - Writing: `#00FF00` (Green)

## 🏗️ Technical Architecture
- `DefragEngine.ts`: Pure JS class managing the disk array and state transitions.
- `DefragSketch.tsx`: React component wrapping the p5 instance.
- `Dashboard.tsx`: React/Tailwind UI for stats (Progress, Cluster count).

---
*Research completed: 2026-03-16*
