# Change: Add DX Improvements

## Why

While the library is functional, the current API requires wrapping every value with `s()` and calling `configure()` imperatively. Phase 4 focuses on developer experience improvements to reduce boilerplate and provide more ergonomic APIs.

## What Changes

- Add `ResponsiveProvider` component for React context-based configuration
- Add `useResponsiveConfig()` hook for accessing configuration in components
- Add `createScaledStyles()` function as a drop-in `StyleSheet.create` replacement that auto-scales all numeric values
- Update documentation with complete API reference

## Impact

- Affected specs: `dx-improvements` (new capability)
- Affected code:
  - New `src/provider.tsx` - ResponsiveProvider and context hooks
  - New `src/scaled-styles.ts` - createScaledStyles utility
  - Update `src/index.ts` - export new APIs

