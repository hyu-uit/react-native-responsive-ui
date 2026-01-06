# Change: Add Layout Split

## Why

When mobile and tablet UX fundamentally diverge (different navigation patterns, completely different layouts, or distinct user flows), the `responsive()` helper isn't enough. Developers need a way to define entirely separate component implementations per device type without duplicating logic or creating complex conditional trees.

## What Changes

- Add `responsiveComponent()` higher-order function to render different components based on device type
- Add `ResponsiveSwitch` component for declarative layout splitting in JSX
- Enable opt-in layout splitting while keeping `responsive()` as the preferred approach for simpler cases

## Impact

- Affected specs: `layout-split` (new capability)
- Affected code:
  - New `src/layout-split.ts` - responsiveComponent HOC and ResponsiveSwitch component
  - Update `src/index.ts` - export new APIs
