import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { s } from "./scaling";

/**
 * Properties that should NOT be scaled because they are ratios,
 * indices, or non-dimensional values.
 */
const EXCLUDED_PROPERTIES = new Set([
  // Flex ratios
  "flex",
  "flexGrow",
  "flexShrink",

  // Opacity and visibility
  "opacity",
  "shadowOpacity",

  // Z-ordering
  "zIndex",
  "elevation",

  // Aspect ratio
  "aspectRatio",

  // Transform scales (these are multipliers, not dimensions)
  "scale",
  "scaleX",
  "scaleY",

  // Font weight (numeric values like 400, 700)
  "fontWeight",
]);

type Style = ViewStyle | TextStyle | ImageStyle;
type NamedStyles<T> = { [P in keyof T]: Style };

/**
 * Recursively scale numeric values in a style object.
 * Excludes properties that are ratios or non-dimensional values.
 */
function scaleStyleValue(key: string, value: unknown): unknown {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === "number") {
    return EXCLUDED_PROPERTIES.has(key) ? value : s(value);
  }

  if (typeof value === "object" && !Array.isArray(value)) {
    return scaleStyleObject(value as Record<string, unknown>);
  }

  return value;
}

function scaleStyleObject(
  obj: Record<string, unknown>
): Record<string, unknown> {
  const scaled: Record<string, unknown> = {};

  for (const key in obj) {
    scaled[key] = scaleStyleValue(key, obj[key]);
  }

  return scaled;
}

/**
 * Create scaled styles - a drop-in replacement for StyleSheet.create()
 * that automatically scales all numeric dimension values.
 *
 * Non-dimensional properties like `flex`, `opacity`, `zIndex` are NOT scaled.
 * Nested objects (like `shadowOffset`) ARE recursively scaled.
 *
 * @param styles - Object containing named style definitions
 * @returns Scaled styles compatible with React Native's style prop
 *
 * @example
 * ```tsx
 * import { createScaledStyles } from 'react-native-responsive-ui';
 *
 * // Instead of wrapping every value with s():
 * // const styles = StyleSheet.create({
 * //   container: { padding: s(16), fontSize: s(14) }
 * // });
 *
 * // Just write normal values:
 * const styles = createScaledStyles({
 *   container: {
 *     padding: 16,        // Will be scaled
 *     fontSize: 14,       // Will be scaled
 *     flex: 1,            // NOT scaled (ratio)
 *     opacity: 0.8,       // NOT scaled (0-1 value)
 *     flexDirection: 'row', // Preserved as-is
 *   },
 *   shadow: {
 *     shadowOffset: { width: 2, height: 4 }, // Nested values scaled
 *     shadowRadius: 8,    // Will be scaled
 *     shadowOpacity: 0.2, // NOT scaled
 *   },
 * });
 * ```
 */
export function createScaledStyles<T extends NamedStyles<T>>(
  styles: T | NamedStyles<T>
): T {
  const scaledStyles = {} as Record<string, Style>;

  for (const name in styles) {
    scaledStyles[name] = scaleStyleObject(
      styles[name] as Record<string, unknown>
    ) as Style;
  }

  return StyleSheet.create(scaledStyles as T & NamedStyles<T>) as T;
}
