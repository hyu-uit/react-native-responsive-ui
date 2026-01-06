import { useContext, useEffect, useState } from "react";
import { ResponsiveContext } from "./provider";
import {
  Breakpoints,
  getConfig,
  getScreenWidth,
  ScreenDimensions,
  subscribeToDimensionChanges,
} from "./scaling";

/**
 * Device type based on screen width breakpoints.
 */
export type DeviceType = "mobile" | "tablet" | "desktop";

/**
 * Derive device type from screen width and breakpoints.
 */
function deriveDeviceType(
  screenWidth: number,
  breakpoints: Breakpoints
): DeviceType {
  if (screenWidth >= breakpoints.desktop) {
    return "desktop";
  }
  if (screenWidth >= breakpoints.tablet) {
    return "tablet";
  }
  return "mobile";
}

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
  return deriveDeviceType(screenWidth, breakpoints);
}

/**
 * React hook that returns the current device type.
 * Updates reactively when screen dimensions change.
 *
 * When used within ResponsiveProvider, uses context for reactive updates.
 * When used outside, subscribes to dimension changes directly.
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
  const context = useContext(ResponsiveContext);

  // Track device type for fallback when outside provider
  const [fallbackDeviceType, setFallbackDeviceType] =
    useState<DeviceType>(getDeviceType);

  // Subscribe to dimension changes when outside provider
  useEffect(() => {
    if (context !== null) return; // Don't subscribe if inside provider
    const unsubscribe = subscribeToDimensionChanges(
      (dimensions: ScreenDimensions) => {
        const { breakpoints } = getConfig();
        setFallbackDeviceType(deriveDeviceType(dimensions.width, breakpoints));
      }
    );
    return unsubscribe;
  }, [context]);

  // If inside provider, derive from context
  if (context !== null) {
    return deriveDeviceType(context.screenWidth, context.breakpoints);
  }

  // Fallback: use local state
  return fallbackDeviceType;
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
 * Note: This is a utility function, not a hook. It uses the current
 * screen dimensions at the time of calling. For reactive updates,
 * use useDeviceType() with conditional logic instead.
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
