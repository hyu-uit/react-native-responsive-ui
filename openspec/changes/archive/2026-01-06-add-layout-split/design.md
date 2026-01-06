## Context

Phase 3 of the responsive library. Provides a mechanism for complete layout splitting when mobile and tablet UX require fundamentally different component trees.

**Stakeholders**: React Native / Expo developers building apps with divergent mobile/tablet experiences

**Constraints**:

- Must integrate with existing breakpoint detection
- Opt-in only - should not affect apps that don't need it
- No external dependencies

## Goals / Non-Goals

**Goals**:

- Provide `responsiveComponent()` HOC for complete component switching
- Provide `ResponsiveSwitch` for declarative JSX-based layout splitting
- Maintain type safety for component props
- Follow mobile-first fallback pattern (consistent with `responsive()`)

**Non-Goals**:

- File-based routing/resolution (Metro bundler hacks - out of scope v1)
- Automatic component detection or generation
- Lazy loading of device-specific components (future optimization)

## Decisions

### Decision 1: Two APIs - HOC and Component

**What**: Provide both `responsiveComponent()` HOC and `<ResponsiveSwitch>` component

**Why**:

- HOC pattern: Better for module-level component selection, works well with navigation
- Component pattern: Better for inline layout decisions within a single component

**Example HOC**:

```tsx
const ProductCard = responsiveComponent({
  mobile: ProductCardMobile,
  tablet: ProductCardTablet,
});
```

**Example Component**:

```tsx
<ResponsiveSwitch
  mobile={<MobileLayout />}
  tablet={<TabletLayout />}
/>
```

### Decision 2: Props forwarding in HOC

**What**: `responsiveComponent()` forwards all props to the selected component

**Why**: Enables using the resulting component as a drop-in replacement with consistent props interface.

### Decision 3: Mobile-first fallback

**What**: If `tablet` or `desktop` variant isn't provided, fall back to smaller breakpoints

**Why**: Consistent with `responsive()` behavior from Phase 2. Reduces boilerplate - developers only specify what changes.

### Decision 4: No lazy loading in v1

**What**: All component variants are imported/bundled regardless of device type

**Why**: Simpler implementation. Lazy loading optimization can be added in future phases without breaking changes.

## Risks / Trade-offs

| Risk | Mitigation |
| ---- | ---------- |
| Bundle size includes all variants | Document best practice to keep variants small; lazy loading in future |
| Developers overuse layout split | Document that `responsive()` is preferred for simpler cases |
| Type inference complexity | Provide clear TypeScript generics with documentation |

## Migration Plan

N/A - New opt-in capability, no breaking changes.

## Open Questions

None - straightforward extension of existing patterns.
