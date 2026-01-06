import { useEffect, useState } from "react";
import {
  getScreenDimensions,
  ScreenDimensions,
  subscribeToDimensionChanges,
} from "./scaling";

/**
 * Device orientation based on screen dimensions.
 */
export type Orientation = "portrait" | "landscape";

/**
 * Derive orientation from screen dimensions.
 * Square screens default to portrait.
 */
function deriveOrientation(dimensions: ScreenDimensions): Orientation {
  return dimensions.width > dimensions.height ? "landscape" : "portrait";
}

/**
 * Get the current device orientation based on screen dimensions.
 *
 * @returns The orientation: "portrait" or "landscape"
 *
 * @example
 * ```ts
 * import { getOrientation } from 'react-native-responsive-ui';
 *
 * const orientation = getOrientation();
 * if (orientation === 'landscape') {
 *   // Landscape-specific logic
 * }
 * ```
 */
export function getOrientation(): Orientation {
  return deriveOrientation(getScreenDimensions());
}

/**
 * React hook that returns the current device orientation.
 * Updates reactively when the device rotates.
 *
 * @returns The orientation: "portrait" or "landscape"
 *
 * @example
 * ```tsx
 * import { useOrientation } from 'react-native-responsive-ui';
 *
 * function MyComponent() {
 *   const orientation = useOrientation();
 *
 *   return (
 *     <View style={{ flexDirection: orientation === 'landscape' ? 'row' : 'column' }}>
 *       <Content />
 *     </View>
 *   );
 * }
 * ```
 */
export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(() =>
    deriveOrientation(getScreenDimensions())
  );

  useEffect(() => {
    const unsubscribe = subscribeToDimensionChanges((dimensions) => {
      setOrientation(deriveOrientation(dimensions));
    });
    return unsubscribe;
  }, []);

  return orientation;
}
