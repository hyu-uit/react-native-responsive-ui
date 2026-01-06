import { getConfig, getScreenWidth } from "./scaling";

/**
 * Device type based on screen width breakpoints.
 */
export type DeviceType = "mobile" | "tablet" | "desktop";

/**
 * Get the current device type based on screen width and configured breakpoints.
 *
 * @returns The device type: "mobile", "tablet", or "desktop"
 *
 * @example
 * ```ts
 * import { getDeviceType } from 'react-native-responsive-ui';
 *
 * const device = getDeviceType();
 * if (device === 'tablet') {
 *   // Tablet-specific logic
 * }
 * ```
 */
export function getDeviceType(): DeviceType {
  const screenWidth = getScreenWidth();
  const { breakpoints } = getConfig();

  if (screenWidth >= breakpoints.desktop) {
    return "desktop";
  }
  if (screenWidth >= breakpoints.tablet) {
    return "tablet";
  }
  return "mobile";
}

/**
 * React hook that returns the current device type.
 * Use this in components for conditional rendering or styling.
 *
 * @returns The device type: "mobile", "tablet", or "desktop"
 *
 * @example
 * ```tsx
 * import { useDeviceType } from 'react-native-responsive-ui';
 *
 * function MyComponent() {
 *   const device = useDeviceType();
 *
 *   return (
 *     <View style={{ flexDirection: device === 'mobile' ? 'column' : 'row' }}>
 *       {device !== 'mobile' && <Sidebar />}
 *       <Content />
 *     </View>
 *   );
 * }
 * ```
 */
export function useDeviceType(): DeviceType {
  // For v1, we return the static device type since we don't listen to dimension changes.
  // This will be enhanced in Phase 5 with orientation support.
  return getDeviceType();
}

/**
 * Values for each breakpoint in the responsive helper.
 */
export interface ResponsiveValues<T> {
  mobile: T;
  tablet?: T;
  desktop?: T;
}

/**
 * Select a value based on the current device type.
 * Uses mobile-first fallback: if a breakpoint value is not specified,
 * falls back to the next smaller breakpoint.
 *
 * @param values - Object with values for each breakpoint
 * @returns The value for the current device type
 *
 * @example
 * ```ts
 * import { responsive } from 'react-native-responsive-ui';
 *
 * // Numeric values
 * const columns = responsive({ mobile: 1, tablet: 2, desktop: 3 });
 *
 * // String values
 * const direction = responsive({ mobile: 'column', tablet: 'row' });
 *
 * // Boolean values
 * const showSidebar = responsive({ mobile: false, tablet: true });
 *
 * // Fallback behavior: desktop uses tablet value if not specified
 * const padding = responsive({ mobile: 16, tablet: 24 }); // desktop = 24
 * ```
 */
export function responsive<T>(values: ResponsiveValues<T>): T {
  const deviceType = getDeviceType();

  switch (deviceType) {
    case "desktop":
      // Fall back to tablet, then mobile
      return values.desktop ?? values.tablet ?? values.mobile;
    case "tablet":
      // Fall back to mobile
      return values.tablet ?? values.mobile;
    case "mobile":
    default:
      return values.mobile;
  }
}
