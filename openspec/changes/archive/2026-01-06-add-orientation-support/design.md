## Context

Phase 5 focuses on making the responsive system react to orientation changes in real-time. Currently, screen dimensions are cached at module load and never updated, causing incorrect layouts when users rotate their devices.

## Goals / Non-Goals

**Goals**:

- Detect and expose current orientation (`portrait` | `landscape`)
- Re-render components when screen dimensions change
- Update scaling factor and device type reactively
- Maintain backward compatibility (apps not using hooks still work, just with static values)

**Non-Goals**:

- Web support (would require different dimension handling)
- Platform-specific orientation locking APIs
- Animated transitions between orientations

## Decisions

### Decision 1: Use Dimensions.addEventListener for change detection

- **What**: Subscribe to React Native's `Dimensions` change events to detect orientation/size changes.
- **Why**: This is the standard React Native API for dimension changes, works on both iOS and Android.
- **Impact**: Requires cleanup of event listeners in useEffect.

### Decision 2: Provider-based reactive updates

- **What**: `ResponsiveProvider` will manage a React state that updates on dimension changes, triggering re-renders for consumers.
- **Why**: Using React Context ensures all consumers (useDeviceType, useResponsiveConfig, useOrientation) update together and consistently.
- **Alternatives considered**:
  - Module-level pub/sub: More complex, doesn't integrate well with React's rendering.
  - Each hook subscribes independently: Potential for inconsistent updates, more memory overhead.

### Decision 3: Orientation derived from dimensions

- **What**: Orientation is derived from `width > height` check, not from native orientation APIs.
- **Why**: Simpler implementation, works consistently across platforms, no additional dependencies.
- **Impact**: "Square" screens (width === height) will default to portrait.

### Decision 4: Maintain static getters for non-hook use cases

- **What**: Keep `getDeviceType()`, `getOrientation()`, and `getScreenWidth()` as static utilities.
- **Why**: Needed for use cases outside React components (e.g., style calculations at module level).
- **Impact**: Static getters update their underlying cached value on dimension change, but components must use hooks for reactivity.

### Decision 5: Backward compatibility

- **What**: The library continues to work without `ResponsiveProvider`. Hooks will use module-level dimension listeners when outside a provider.
- **Why**: Don't break existing apps that don't use the provider.
- **Impact**: Slightly more complex hook implementation.

## Risks / Trade-offs

- **Risk**: Performance overhead from frequent dimension change events (e.g., during animated rotation).
  - **Mitigation**: Dimension events are already debounced by React Native. Consider additional throttling if needed.
- **Risk**: Styles created with `createScaledStyles()` at module level won't update on orientation change.
  - **Mitigation**: Document this limitation. For dynamic scaling, use `s()` inside components or re-create styles.

## Open Questions

- Should we provide a `useDimensions()` hook that returns raw `{ width, height }`?
- Should the library expose a way to force re-calculation of module-level styles?
