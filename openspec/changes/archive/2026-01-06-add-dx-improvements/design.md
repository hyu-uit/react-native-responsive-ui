## Context

Phase 4 of the responsive library. Focuses on developer experience improvements to reduce boilerplate and make the library easier to adopt.

**Stakeholders**: React Native / Expo developers

**Constraints**:

- Must be backwards compatible with existing `configure()` API
- Provider should be optional - library works without it
- No performance regression

## Goals / Non-Goals

**Goals**:

- Provide `ResponsiveProvider` for declarative configuration
- Provide `createScaledStyles()` as ergonomic alternative to `StyleSheet.create`
- Make configuration accessible via React context
- Reduce boilerplate for common use cases

**Non-Goals**:

- Replacing existing imperative API (configure still works)
- Dynamic runtime reconfiguration (static config is fine for v1)
- SSR/server-side support

## Decisions

### Decision 1: Provider is optional

**What**: `ResponsiveProvider` enhances but doesn't replace `configure()`

**Why**: Library should work out-of-box without wrapping app in provider. Provider is for those who prefer declarative React patterns.

**Behavior**:

- Without provider: Uses `configure()` values or defaults
- With provider: Provider values override defaults

### Decision 2: createScaledStyles wraps StyleSheet.create

**What**: `createScaledStyles()` calls `StyleSheet.create()` internally after scaling values

**Why**: Maintains StyleSheet optimizations while adding auto-scaling.

**Example**:

```tsx
// Instead of:
const styles = StyleSheet.create({
  container: { padding: s(16), fontSize: s(14) }
});

// Write:
const styles = createScaledStyles({
  container: { padding: 16, fontSize: 14 }
});
```

### Decision 3: Nested object support in createScaledStyles

**What**: Recursively scale numeric values in nested style objects

**Why**: StyleSheet supports nested objects for things like shadows, transforms. These should also be scaled.

### Decision 4: Exclude specific properties from scaling

**What**: Properties like `flex`, `opacity`, `zIndex` should NOT be scaled

**Why**: These are ratios or indices, not dimensional values. Scaling them would break layouts.

**Excluded properties**:

- `flex`, `flexGrow`, `flexShrink`
- `opacity`
- `zIndex`
- `aspectRatio`
- `scale`, `scaleX`, `scaleY`

## Risks / Trade-offs

| Risk | Mitigation |
| ---- | ---------- |
| Developers confused about configure vs Provider | Document that both work; provider is optional |
| Performance of recursive scaling in createScaledStyles | Only runs once at style creation time, not per render |
| Missing excluded properties | Document the list; allow escape hatch with `s()` |

## Migration Plan

N/A - Additive changes, no breaking changes.

## Open Questions

None - straightforward DX improvements.
