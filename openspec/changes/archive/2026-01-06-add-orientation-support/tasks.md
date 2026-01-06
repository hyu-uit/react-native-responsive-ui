## 1. Core Orientation Support

- [x] 1.1 Create `src/orientation.ts` with `Orientation` type and `getOrientation()` utility
- [x] 1.2 Add `useOrientation()` hook that subscribes to dimension changes
- [x] 1.3 Export orientation utilities from `src/index.ts`

## 2. Dynamic Dimension Updates

- [x] 2.1 Update `src/scaling.ts` to support dynamic screen width updates
- [x] 2.2 Add dimension change listener that updates cached screen width

## 3. Reactive Provider

- [x] 3.1 Update `ResponsiveProvider` to listen to dimension changes
- [x] 3.2 Update provider context value to include orientation
- [x] 3.3 Ensure provider re-renders consumers on dimension change

## 4. Reactive Hooks

- [x] 4.1 Update `useDeviceType()` to use context when in provider
- [x] 4.2 Update `useResponsiveConfig()` to include orientation in return value
- [x] 4.3 Add fallback dimension listener for hooks used outside provider

## 5. Demo & Documentation

- [x] 5.1 Update demo to display current orientation
- [x] 5.2 Add rotation indicator to show real-time updates working
