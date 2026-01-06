## Context

Phase 2 of the responsive library. Builds on the scaling system (Phase 1) to add breakpoint-based value selection.

**Stakeholders**: React Native / Expo developers

**Constraints**:

- Must integrate with existing `configure()` API
- Minimal runtime overhead (<1-2ms per render)
- No external dependencies

## Goals / Non-Goals

**Goals**:

- Provide `useDeviceType()` hook for React components
- Provide `responsive()` function for breakpoint-based value selection
- Support configurable breakpoint thresholds
- Work with both numeric and non-numeric values

**Non-Goals**:

- Orientation-based breakpoints (Phase 5)
- Real-time dimension change listeners (out of scope v1)
- Layout splitting / component variations (Phase 3)

## Decisions

### Decision 1: Three device types (mobile, tablet, desktop)

**What**: Support exactly three breakpoints: mobile (default), tablet (≥768), desktop (≥1024)

**Why**: Matches common design patterns and keeps API simple. Most React Native apps only need mobile vs tablet distinction; desktop is included for future web support.

**Alternatives considered**:

- Custom named breakpoints: More flexible but adds complexity
- Numeric breakpoints only: Less semantic, harder to read

### Decision 2: Width-based detection only

**What**: Use `screenWidth` to determine device type, ignoring height and orientation

**Why**: Simpler implementation, consistent with Phase 1 scaling. Orientation support deferred to Phase 5.

### Decision 3: Hook + utility function pattern

**What**: Provide both `useDeviceType()` hook and `responsive()` helper

**Why**:

- `useDeviceType()` - for conditional rendering in JSX
- `responsive()` - for selecting values in styles or logic

Both share the same breakpoint detection internally.

### Decision 4: Fallback to smaller breakpoints

**What**: `responsive({ mobile: 1, tablet: 2 })` on desktop returns `2` (falls back to tablet)

**Why**: Mobile-first approach. Developers only specify what changes, smaller breakpoints cascade up.

## Risks / Trade-offs

| Risk | Mitigation |
| ---- | ---------- |
| No real-time updates on dimension change | Document limitation; orientation support in Phase 5 |
| Breakpoint values may need adjustment | Allow configuration via `configure()` |

## Migration Plan

N/A - New capability, no breaking changes to existing code.

## Open Questions

None - straightforward extension of Phase 1 patterns.
