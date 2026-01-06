# Change: Add Breakpoints & Responsive Helper

## Why

Developers need to adjust layouts and values for different device types (mobile, tablet, desktop) without duplicating code or creating separate component files. The scaling system (Phase 1) handles proportional sizing, but breakpoint-based decisions require a different approach.

## What Changes

- Add `useDeviceType()` hook returning `"mobile" | "tablet" | "desktop"` based on screen width
- Add `responsive()` helper function to choose values per breakpoint within the same component
- Add default breakpoint configuration (tablet: 768, desktop: 1024)
- Extend `configure()` to accept custom breakpoint thresholds

## Impact

- Affected specs: `breakpoints` (new capability)
- Affected code:
  - New `src/breakpoints.ts` - breakpoint detection and responsive helper
  - Update `src/scaling.ts` - extend configure() for breakpoints
  - Update `src/index.ts` - export new functions
