import { Dimensions } from "react-native";

/**
 * Default base width for scaling calculations.
 * Based on iPhone SE/Mini width (375pt) - most common mobile-first design baseline.
 */
const DEFAULT_BASE_WIDTH = 375;

/**
 * Configuration for the scaling system.
 */
interface ScalingConfig {
  baseWidth: number;
}

// Module-level state
let config: ScalingConfig = {
  baseWidth: DEFAULT_BASE_WIDTH,
};

// Cache screen width at module load time for performance
const screenWidth = Dimensions.get("window").width;

/**
 * Configure the scaling system.
 * Call this once at app startup before using scaling functions.
 *
 * @param options - Configuration options
 * @param options.baseWidth - The design baseline width (default: 375)
 *
 * @example
 * ```ts
 * import { configure } from 'react-native-responsive-ui';
 *
 * configure({ baseWidth: 414 }); // Use iPhone 11 Pro as baseline
 * ```
 */
export function configure(options: Partial<ScalingConfig>): void {
  config = { ...config, ...options };
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
