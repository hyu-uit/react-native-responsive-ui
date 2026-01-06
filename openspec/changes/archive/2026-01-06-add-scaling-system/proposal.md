# Change: Add Scaling System

## Why

React Native developers need to scale design values (fonts, spacing, padding) automatically across different screen sizes without manual calculations. Currently, hardcoded pixel values result in inconsistent UIs between mobile and tablet devices.

## What Changes

- Add `s()` function to scale numeric values based on screen width relative to a design baseline
- Add design tokens (`space`, `font`, `radius`) using the scaling system for consistent, pre-defined values
- Add `createScaledStyle()` utility to create StyleSheet-compatible scaled styles
- Establish library source structure under `src/`

## Impact

- Affected specs: `scaling` (new capability)
- Affected code:
  - New `src/scaling.ts` - core scaling function
  - New `src/tokens.ts` - design tokens
  - New `src/index.ts` - library exports
  - Update `package.json` - add library entry point

