import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Orientation } from "./orientation";
import {
  Breakpoints,
  configure,
  getConfig,
  getScreenDimensions,
  ScreenDimensions,
  subscribeToDimensionChanges,
} from "./scaling";

/**
 * Derive orientation from screen dimensions.
 */
function deriveOrientation(dimensions: ScreenDimensions): Orientation {
  return dimensions.width > dimensions.height ? "landscape" : "portrait";
}

/**
 * Configuration values available in the responsive context.
 */
export interface ResponsiveConfigValue {
  baseWidth: number;
  breakpoints: Breakpoints;
  screenWidth: number;
  screenHeight: number;
  scaleFactor: number;
  orientation: Orientation;
}

/**
 * Props for the ResponsiveProvider component.
 */
export interface ResponsiveProviderProps {
  children: ReactNode;
  baseWidth?: number;
  breakpoints?: Partial<Breakpoints>;
}

const ResponsiveContext = createContext<ResponsiveConfigValue | null>(null);

/**
 * Export the context for use by hooks that need reactive updates.
 */
export { ResponsiveContext };

/**
 * Provider component for declarative configuration of the responsive system.
 * Wrapping your app in ResponsiveProvider allows you to configure baseWidth
 * and breakpoints via props instead of calling configure() imperatively.
 *
 * The provider listens to dimension changes and re-renders consumers when
 * the screen size changes (e.g., on device rotation).
 *
 * The provider is optional - the library works without it using defaults.
 *
 * @example
 * ```tsx
 * import { ResponsiveProvider } from 'react-native-responsive-ui';
 *
 * export default function App() {
 *   return (
 *     <ResponsiveProvider
 *       baseWidth={414}
 *       breakpoints={{ tablet: 600, desktop: 900 }}
 *     >
 *       <MyApp />
 *     </ResponsiveProvider>
 *   );
 * }
 * ```
 */
export function ResponsiveProvider({
  children,
  baseWidth,
  breakpoints,
}: ResponsiveProviderProps) {
  // Configure the scaling system with provider values
  useMemo(() => {
    configure({
      ...(baseWidth !== undefined && { baseWidth }),
      ...(breakpoints !== undefined && { breakpoints }),
    });
  }, [baseWidth, breakpoints]);

  // Track screen dimensions reactively
  const [dimensions, setDimensions] =
    useState<ScreenDimensions>(getScreenDimensions);

  // Subscribe to dimension changes
  useEffect(() => {
    const unsubscribe = subscribeToDimensionChanges((newDimensions) => {
      setDimensions(newDimensions);
    });
    return unsubscribe;
  }, []);

  const config = getConfig();

  const value = useMemo<ResponsiveConfigValue>(
    () => ({
      baseWidth: config.baseWidth,
      breakpoints: config.breakpoints,
      screenWidth: dimensions.width,
      screenHeight: dimensions.height,
      scaleFactor: dimensions.width / config.baseWidth,
      orientation: deriveOrientation(dimensions),
    }),
    [config.baseWidth, config.breakpoints, dimensions]
  );

  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  );
}

/**
 * Hook to access the current responsive configuration.
 * Can be used with or without ResponsiveProvider.
 *
 * When used within ResponsiveProvider, the hook responds to dimension changes
 * and triggers re-renders when the screen size changes.
 *
 * When used outside ResponsiveProvider, the hook uses a fallback dimension
 * listener to still respond to dimension changes.
 *
 * @returns The current responsive configuration including baseWidth, breakpoints,
 *          screenWidth, screenHeight, scaleFactor, and orientation
 *
 * @example
 * ```tsx
 * import { useResponsiveConfig } from 'react-native-responsive-ui';
 *
 * function MyComponent() {
 *   const { scaleFactor, screenWidth, orientation } = useResponsiveConfig();
 *
 *   return (
 *     <Text>
 *       Screen: {screenWidth}px, Scale: {scaleFactor.toFixed(2)}x, {orientation}
 *     </Text>
 *   );
 * }
 * ```
 */
export function useResponsiveConfig(): ResponsiveConfigValue {
  const context = useContext(ResponsiveContext);

  // Track dimensions for fallback when outside provider
  const [fallbackDimensions, setFallbackDimensions] =
    useState<ScreenDimensions>(getScreenDimensions);

  // Subscribe to dimension changes when outside provider
  useEffect(() => {
    if (context !== null) return; // Don't subscribe if inside provider
    const unsubscribe = subscribeToDimensionChanges((newDimensions) => {
      setFallbackDimensions(newDimensions);
    });
    return unsubscribe;
  }, [context]);

  // If inside provider, use context
  if (context !== null) {
    return context;
  }

  // Fallback: compute values from module-level config
  const config = getConfig();
  return {
    baseWidth: config.baseWidth,
    breakpoints: config.breakpoints,
    screenWidth: fallbackDimensions.width,
    screenHeight: fallbackDimensions.height,
    scaleFactor: fallbackDimensions.width / config.baseWidth,
    orientation: deriveOrientation(fallbackDimensions),
  };
}
