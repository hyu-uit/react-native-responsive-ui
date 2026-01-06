## Context

This is the foundational feature of the `react-native-responsive-ui` library. The scaling system provides automatic size adjustments based on screen width, eliminating manual responsive calculations.

**Stakeholders**: React Native / Expo developers using the library

**Constraints**:

- Must work with Expo and bare React Native (iOS, Android)
- Minimal runtime overhead (<1-2ms per calculation)
- No external dependencies beyond React Native core

## Goals / Non-Goals

**Goals**:

- Provide a simple `s(value)` function that scales any numeric value
- Support configurable base width (design baseline, e.g., 375px for iPhone)
- Provide pre-defined design tokens for common spacing, font sizes, and radii
- Integrate with React Native's StyleSheet pattern

**Non-Goals**:

- Breakpoint-aware scaling (Phase 2)
- Orientation-based adjustments (out of scope v1)
- Web support (out of scope v1)

## Decisions

### Decision 1: Linear scaling formula

**What**: Use `scaledValue = value * (screenWidth / baseWidth)`

**Why**: Simple, predictable, and widely understood. No magic breakpoints or non-linear curves that confuse developers.

**Alternatives considered**:

- Logarithmic scaling: More complex, harder to reason about
- Clamped scaling: Could prevent values from getting too large/small, but adds config complexity

### Decision 2: Module-level initialization via Dimensions API

**What**: Read screen dimensions once at module load time using `Dimensions.get('window').width`

**Why**: Avoids re-reading dimensions on every `s()` call. Screen size rarely changes during app lifecycle (orientation changes are out of scope for v1).

**Trade-off**: If screen dimensions change (orientation), values won't update until app restart. This is acceptable for v1.

### Decision 3: Default base width of 375

**What**: Use iPhone SE/Mini width (375pt) as default baseline

**Why**: Most common design baseline for mobile-first apps. Designs scale up naturally on larger devices.

### Decision 4: Token structure with semantic names

**What**: Tokens use semantic names (`space.sm`, `font.body`) rather than numeric scales (`space.4`, `font.14`)

**Why**: Encourages consistent usage and makes refactoring easier. Semantic names communicate intent.

## Risks / Trade-offs

| Risk | Mitigation |
| ---- | ---------- |
| Orientation changes invalidate cached width | Document limitation; add orientation support in Phase 5 |
| Over-scaling on tablets makes UI too large | Future: add max scale factor option; for v1, document recommended baseWidth for tablet-focused apps |
| TypeScript types need maintenance | Keep types simple and co-located with implementation |

## Migration Plan

N/A - This is a greenfield feature. No existing code to migrate.

## Open Questions

1. Should `s()` accept negative values? **Proposed**: Yes, scale them the same way (useful for negative margins).
2. Should tokens be customizable? **Proposed**: Not in v1; keep it simple with fixed token values.
