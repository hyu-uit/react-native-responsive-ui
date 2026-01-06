# Project Context

## Purpose

React Native Responsive Design Library (`react-native-responsive-ui`) that helps developers build responsive apps across multiple screen sizes and device types (mobile, tablet, desktop).

### Problems Solved

1. Scaling design sizes (font, spacing, icon) automatically without manual calculations
2. Adjusting layouts for different breakpoints without duplicating code
3. Providing an optional mechanism for full layout splitting when mobile and tablet UX diverge
4. Improving developer experience (DX) with minimal boilerplate and intuitive APIs

### Success Metrics

- Reduce boilerplate code for responsive layouts by 50%
- Consistent UI across device sizes with minimal manual adjustments
- Developers can adopt scaling + responsive helpers without creating extra files for most screens
- Library is easy to adopt: <20 min setup, intuitive API
- Minimal runtime overhead (<1–2ms per render for breakpoint switching)

## Tech Stack

- React Native
- Expo
- TypeScript
- iOS and Android platforms

## Project Conventions

### Code Style

- Short aliases preferred: `s()`, `responsive()` for fast adoption
- Minimal boilerplate philosophy
- Tokens first: encourage consistency through design tokens
- Default scaling everywhere

### Architecture Patterns

- **Provider Pattern**: `ResponsiveProvider` for configuration (baseWidth, breakpoints)
- **Hooks**: `useDeviceType()` returning `"mobile" | "tablet" | "desktop"`
- **Utility Functions**: `s()` for scaling, `responsive()` for breakpoint-based values
- **Design Tokens**: Predefined tokens for spacing, font sizes, and radius

### API Design

```typescript
// Scaling
import { s } from "@ui/responsive";
const styles = { padding: s(16), fontSize: s(14) };

// Design Tokens
import { space, font, radius } from "@ui/tokens";
const styles = { padding: space.md, fontSize: font.body, borderRadius: radius.sm };

// Responsive Helper
import { responsive } from "@ui/responsive";
const columns = responsive({ mobile: 1, tablet: 2, desktop: 3 });

// Device Type Hook
import { useDeviceType } from "@ui/responsive";
const device = useDeviceType(); // "mobile" | "tablet" | "desktop"

// Configuration
<ResponsiveProvider baseWidth={760} breakpoints={{ tablet: 768, desktop: 1024 }}>
  <App />
</ResponsiveProvider>
```

### Testing Strategy

[To be defined]

### Git Workflow

[To be defined]

## Domain Context

- **Scaling**: Automatically scale numeric values (font, padding, margin) based on screen width relative to a design baseline
- **Breakpoints**: Detection system using screen width to determine device type (mobile, tablet, desktop)
- **Responsive Helper**: API to choose values per breakpoint within the same component
- **Layout Split**: Optional API to define full component variations per breakpoint for fundamentally different designs
- **Design Tokens**: Predefined values for spacing, font sizes, and border radius using the scaling system

## Important Constraints

### In Scope (v1)

- Scaling system for numeric styles
- Breakpoint detection (mobile, tablet, desktop) using screen width
- Responsive helpers for conditional values within the same component
- Optional layout splitting for screens with fundamentally different designs
- Design tokens for spacing, font sizes, and radius
- Expo + React Native compatibility (iOS, Android)

### Out of Scope (v1)

- Platform-specific file resolution (Metro bundler hacks)
- Automatic orientation-based layouts
- Web support
- Auto-generating responsive components from Figma

### Performance Requirements

- <1–2ms per render for breakpoint switching

## External Dependencies

- Expo SDK
- React Native core
- React Native Dimensions API (for screen measurements)

## Roadmap

| Phase                                     | Description                                                                      | ETA      |
| ----------------------------------------- | -------------------------------------------------------------------------------- | -------- |
| Phase 1 – Scaling system                  | `s()` function, design tokens, `createScaledStyle`                               | 2 weeks  |
| Phase 2 – Breakpoints & responsive helper | `useDeviceType()`, `responsive()`, responsive numeric & boolean values           | 2 weeks  |
| Phase 3 – Layout split                    | `responsiveComponent()`, optional per-screen files                               | 3 weeks  |
| Phase 4 – DX improvements                 | `ResponsiveProvider`, auto-scaled styles, documentation, examples                | 2 weeks  |
| Phase 5 – Optional                        | Orientation support, web support, CLI generator                                  | Future   |

## Deliverables

1. npm package: `react-native-responsive-ui`
2. Documentation / README covering:
   - Installation
   - Scaling & tokens
   - Responsive helper
   - Layout split examples
   - Best practices
3. Example project demonstrating:
   - Mobile-first screen, scaled across devices
   - Screen with responsive helper
   - Screen with layout split
