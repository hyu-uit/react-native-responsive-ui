# Change: Add Orientation Support (Phase 5)

## Why

Currently, the responsive system captures screen dimensions once at app startup and never updates. When users rotate their device to landscape mode, the scaling and device type detection continue using stale portrait dimensions, resulting in incorrect layouts.

## What Changes

- Add orientation detection (`portrait` | `landscape`) via `useOrientation()` hook
- Listen to dimension changes using React Native's `Dimensions` API
- Update `ResponsiveProvider` to re-render consumers when dimensions change
- Update `useDeviceType()` to respond to dimension changes in real-time
- Update `useResponsiveConfig()` to return current screen dimensions reactively
- Add `getOrientation()` utility for non-hook contexts

## Impact

- Affected specs: `orientation` (new), `dx-improvements` (modified), `breakpoints` (modified)
- Affected code:
  - New `src/orientation.ts` - orientation detection utilities
  - Update `src/scaling.ts` - dynamic screen width
  - Update `src/provider.tsx` - listen to dimension changes
  - Update `src/breakpoints.ts` - reactive device type detection
  - Update `src/index.ts` - new exports
  - Update demo to showcase orientation changes
