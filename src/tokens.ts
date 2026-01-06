import { s } from "./scaling";

/**
 * Spacing design tokens using the scaling system.
 *
 * Base values (at 375pt screen width):
 * - xs: 4pt
 * - sm: 8pt
 * - md: 16pt
 * - lg: 24pt
 * - xl: 32pt
 * - xxl: 48pt
 *
 * @example
 * ```ts
 * import { space } from 'react-native-responsive-ui';
 *
 * const styles = {
 *   padding: space.md,      // 16pt scaled
 *   marginBottom: space.lg, // 24pt scaled
 *   gap: space.sm,          // 8pt scaled
 * };
 * ```
 */
export const space = {
  /** 4pt base - Extra small spacing */
  get xs() {
    return s(4);
  },
  /** 8pt base - Small spacing */
  get sm() {
    return s(8);
  },
  /** 16pt base - Medium spacing (default) */
  get md() {
    return s(16);
  },
  /** 24pt base - Large spacing */
  get lg() {
    return s(24);
  },
  /** 32pt base - Extra large spacing */
  get xl() {
    return s(32);
  },
  /** 48pt base - Extra extra large spacing */
  get xxl() {
    return s(48);
  },
} as const;

/**
 * Font size design tokens using the scaling system.
 *
 * Base values (at 375pt screen width):
 * - caption: 12pt
 * - body: 16pt
 * - subtitle: 18pt
 * - title: 24pt
 * - headline: 32pt
 *
 * @example
 * ```ts
 * import { font } from 'react-native-responsive-ui';
 *
 * const styles = {
 *   fontSize: font.body,    // 16pt scaled
 *   titleSize: font.title,  // 24pt scaled
 * };
 * ```
 */
export const font = {
  /** 12pt base - Caption text, labels */
  get caption() {
    return s(12);
  },
  /** 16pt base - Body text (default) */
  get body() {
    return s(16);
  },
  /** 18pt base - Subtitle, emphasized body */
  get subtitle() {
    return s(18);
  },
  /** 24pt base - Section titles */
  get title() {
    return s(24);
  },
  /** 32pt base - Page headlines */
  get headline() {
    return s(32);
  },
} as const;

/**
 * Border radius design tokens using the scaling system.
 *
 * Base values (at 375pt screen width):
 * - none: 0 (not scaled)
 * - sm: 4pt
 * - md: 8pt
 * - lg: 16pt
 * - full: 9999 (not scaled, for pill shapes)
 *
 * @example
 * ```ts
 * import { radius } from 'react-native-responsive-ui';
 *
 * const styles = {
 *   borderRadius: radius.md,   // 8pt scaled
 *   pillRadius: radius.full,   // 9999 for pill shape
 * };
 * ```
 */
export const radius = {
  /** No border radius */
  none: 0,
  /** 4pt base - Subtle rounding */
  get sm() {
    return s(4);
  },
  /** 8pt base - Standard rounding */
  get md() {
    return s(8);
  },
  /** 16pt base - Prominent rounding */
  get lg() {
    return s(16);
  },
  /** Maximum radius for pill/circle shapes */
  full: 9999,
} as const;
