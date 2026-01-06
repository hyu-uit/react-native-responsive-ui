import { Dimensions } from "react-native";

/**
 * Default base width for scaling calculations.
 * Based on iPhone SE/Mini width (375pt) - most common mobile-first design baseline.
 */
const DEFAULT_BASE_WIDTH = 375;

/**
 * Default breakpoint thresholds for device type detection.
 */
const DEFAULT_BREAKPOINTS = {
  tablet: 768,
  desktop: 1024,
};

/**
 * Breakpoint thresholds for device type detection.
 */
export interface Breakpoints {
  tablet: number;
  desktop: number;
}

/**
 * Configuration for the scaling and breakpoint system.
 */
export interface ScalingConfig {
  baseWidth: number;
  breakpoints: Breakpoints;
}

// Module-level state
let config: ScalingConfig = {
  baseWidth: DEFAULT_BASE_WIDTH,
  breakpoints: { ...DEFAULT_BREAKPOINTS },
};

// Cache screen width at module load time for performance
const screenWidth = Dimensions.get("window").width;

/**
 * Configure the scaling and breakpoint system.
 * Call this once at app startup before using scaling functions.
 *
 * @param options - Configuration options
 * @param options.baseWidth - The design baseline width (default: 375)
 * @param options.breakpoints - Custom breakpoint thresholds
 *
 * @example
 * ```ts
 * import { configure } from 'react-native-responsive-ui';
 *
 * configure({ baseWidth: 414 }); // Use iPhone 11 Pro as baseline
 *
 * // Or with custom breakpoints
 * configure({
 *   baseWidth: 375,
 *   breakpoints: { tablet: 600, desktop: 900 }
 * });
 * ```
 */
export function configure(
  options: Partial<Omit<ScalingConfig, "breakpoints">> & {
    breakpoints?: Partial<Breakpoints>;
  }
): void {
  const { breakpoints, ...rest } = options;
  config = {
    ...config,
    ...rest,
    breakpoints: {
      ...config.breakpoints,
      ...(breakpoints ?? {}),
    },
  };
}

/**
 * Get the current configuration.
 * Useful for breakpoint detection.
 */
export function getConfig(): ScalingConfig {
  return config;
}

/**
 * Get the cached screen width.
 */
export function getScreenWidth(): number {
  return screenWidth;
}

/**
 * Get the current scale factor based on screen width and base width.
 * Useful for debugging and testing.
 *
 * @returns The scale multiplier (screenWidth / baseWidth)
 *
 * @example
 * ```ts
 * const factor = getScaleFactor();
 * console.log(`Current scale: ${factor}x`);
 * ```
 */
export function getScaleFactor(): number {
  return screenWidth / config.baseWidth;
}

/**
 * Scale a numeric value based on screen width relative to the base width.
 *
 * Formula: scaledValue = value × (screenWidth / baseWidth)
 *
 * @param value - The numeric value to scale (based on design at baseWidth)
 * @returns The scaled value for the current screen width
 *
 * @example
 * ```ts
 * import { s } from 'react-native-responsive-ui';
 *
 * const styles = {
 *   padding: s(16),    // 16pt on 375pt screen, 32pt on 750pt screen
 *   fontSize: s(14),
 *   margin: s(-8),     // Negative values are supported
 * };
 * ```
 */
export function s(value: number): number {
  if (value === 0) return 0;
  return value * getScaleFactor();
}

/**
 * Style object type for createScaledStyle.
 */
type StyleObject = Record<string, unknown>;

/**
 * Create a scaled style object where all numeric values are automatically scaled.
 * Non-numeric values (strings, booleans, etc.) are preserved as-is.
 *
 * @param styles - A style object with numeric values to scale
 * @returns A new style object with all numeric values scaled
 *
 * @example
 * ```ts
 * import { createScaledStyle } from 'react-native-responsive-ui';
 *
 * const styles = createScaledStyle({
 *   padding: 16,
 *   fontSize: 14,
 *   flexDirection: 'row', // Preserved as-is
 * });
 * ```
 */
export function createScaledStyle<T extends StyleObject>(styles: T): T {
  const scaled: StyleObject = {};

  for (const key in styles) {
    const value = styles[key];
    if (typeof value === "number") {
      scaled[key] = s(value);
    } else {
      scaled[key] = value;
    }
  }

  return scaled as T;
}
