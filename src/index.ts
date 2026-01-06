/**
 * react-native-responsive-ui
 *
 * A responsive design library for React Native / Expo applications.
 * Automatically scale design values across different screen sizes.
 */

// Scaling functions
export { configure, createScaledStyle, getScaleFactor, s } from "./scaling";

// Breakpoint detection and responsive helpers
export { getDeviceType, responsive, useDeviceType } from "./breakpoints";

// Layout split
export { responsiveComponent, ResponsiveSwitch } from "./layout-split";

// Types
export type { DeviceType, ResponsiveValues } from "./breakpoints";
export type {
  ResponsiveComponentVariants,
  ResponsiveSwitchProps,
} from "./layout-split";
export type { Breakpoints, ScalingConfig } from "./scaling";

// Design tokens
export { font, radius, space } from "./tokens";
