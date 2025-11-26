# Copilot Instructions for Bingle Codebase

## Architecture Overview

**Bingle** is a sentiment-driven bingo goal tracker built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Zustand**. The app lets users fill a 3×3 grid with personal goals and mark them complete to experience bingo line completions.

### Data Flow
1. **User creates board** → `useBingoControl.createNewBoardAndStart()` → Route to `/bingo/[id]`
2. **User interacts with board** → `BingoBoard` displays items via `useBingoBoard(boardId)`
3. **State updates** → `useBingoStore` persists to localStorage, recomputes bingo lines
4. **Bingo detected** → `checkBingo()` identifies completed lines → `useBingoListener` triggers confetti modal
5. **Theme applied** → `useThemeEffect()` applies CSS variables from `themeConfig.ts`

## Key Components & Patterns

### State Management (Zustand)
- **`useBingoStore`** (`store/useBingoStore.tsx`) - Single source of truth for all boards/items
  - Persists to localStorage with `zustand/persist` middleware
  - Board array structure: `{ id, size, items[], theme, bingoLines }`
  - Item structure: `{ id, order, content, isCompleted, disabled, timestamps }`
  - Use `updateBingoItem()` helper to safely update nested item arrays

### Hooks Pattern (Composition over Context)
- **`useBingoBoard(boardId)`** - Wraps store methods with board-specific convenience functions
  - Exports: `board`, `addItem()`, `editItem()`, `deleteItem()`, `toggleCompleted()`, `updateBoard()`
  - Example: `useBingoBoard()` → calls `useBingoStore()` internally, not circular
- **`useBingoListener()`** - Watches board state for all-clear condition → triggers modal
- **`useThemeEffect()`** - Applies theme CSS variables when theme changes
- **`useModalStore`** - Modal state (title, description, children) - completely separate from bingo logic

### Components
- **`BingoBoard`** - Main grid container, orchestrates item rendering and event handling
  - Opens modal via `openBingoInputModal()` for add/edit, calls store methods
  - Does NOT hold bingo item state - uses `useBingoBoard(boardId)` hook
- **`BingoBoardItem`** - Single grid cell with visual states (empty, filled, completed, bingo-line)
  - Accepts `theme` prop to determine colors
  - Triggered states: `onAdd`, `onEdit`, `onDelete`, `onToggleComplete`
- **`BingoInputForm`** - Modal form for adding/editing item content
  - Enforces character limits in real-time (see README troubleshooting)

### Bingo Logic
- **`checkBingo(items, size)`** (`lib/bingo/checkBingo.ts`) - Returns `{ completedLines: number[][], totalLines }`
  - Called after every `toggleComplete()` → sets `disabled` flag on completed line items
  - `getBingoLines(size)` generates all possible winning line indices (rows, cols, diagonals)
  - Index-based logic: `items[0-8]` for 3×3 → track by order, not ID

### Theming System
- **Theme config** (`config/themeConfig.ts`) - 7 themes (default, moss, pinkbeige, etc.)
- CSS variables applied at root level via `useThemeEffect()`
- Themes affect: board background, text, item styling, confetti colors
- Add new theme: Update `THEME_CONFIG` object + add CSS class in `styles/themes.css`

## Developer Workflows

### Local Development
```bash
npm run dev              # Start Next.js dev server (localhost:3000)
npm run build            # Production build
npm run lint             # ESLint check
```

### Data Persistence
- Zustand auto-saves to `localStorage` key: `bingle-storage`
- No backend API - all state client-side
- First visit creates default 3×3 board via `ensureBingoBoard()`

### Adding Features
1. **New store action** → Add to `useBingoStore` interface + implementation
2. **New hook** → Create in `hooks/` wrapping store methods
3. **New component** → Use `"use client"` directive, consume via hooks
4. **New theme** → Add to `THEME_CONFIG`, update `themes.css`

## Project-Specific Conventions

### File Structure
- `store/` - Zustand stores (single file per concept)
- `hooks/` - Custom React hooks (bind store to UI logic)
- `components/` → `bingo/`, `common/`, `ui/` (ui = shadcn components)
- `lib/bingo/` - Pure utility functions (checkBingo, getBingoLines)
- `types/bingo.ts` - Single source of type definitions

### Naming
- Store files: `use<Concept>Store.tsx` (e.g., `useBingoStore`)
- Hooks: `use<Action>.tsx` (e.g., `useBingoBoard`, `useBingoListener`)
- Components: `<Noun>.tsx` or `<NounAdjective>.tsx` (e.g., `BingoBoard`, `BingoBoardItem`)

### State Management Rules
- ✅ Use hooks to wrap store methods (prefer `useBingoBoard()` over direct `useBingoStore()`)
- ✅ Lift board state to store only (components remain mostly presentational)
- ✅ Modal state separate from bingo state (`useModalStore` ≠ `useBingoStore`)
- ❌ Avoid prop-drilling - use hooks for state access
- ❌ Don't hold bingo data in component state - it won't persist

### TypeScript
- Strict mode enabled (`tsconfig.json`)
- All components + hooks must be typed
- `BingoBoard` interface in `types/bingo.ts` is the contract for board shape

## Integration Points

- **Next.js routing** - Dynamic route `[id]` maps to `useParams()` in `BingoBoardPage`
- **Sonner toast library** - Already imported; use for notifications (see `components/common/sonner.tsx`)
- **Framer Motion** - Available for animations (used by Confetti component)
- **Lucide icons** - Available for UI icons
- **Shadcn/ui** - Button, Dialog components in `components/ui/`; use `clsx` + Tailwind for styling

## Common Pitfalls

1. **Editing board items** - Always use `updateBingoItem()` helper to avoid shallow copy bugs
2. **Theme changes** - Must call `useThemeEffect()` after theme updates (see `BingoBoardPage`)
3. **Component re-renders** - React 19 with StrictMode causes double renders in dev (not a bug)
4. **Character limits** - Handle in both `handleChange` AND button disabled state (see `BingoInputForm`)
5. **Index vs ID** - `checkBingo()` works on item indices (0-8), not IDs; order matters
