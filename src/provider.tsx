import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { Breakpoints, configure, getConfig, getScreenWidth } from "./scaling";

/**
 * Configuration values available in the responsive context.
 */
export interface ResponsiveConfigValue {
  baseWidth: number;
  breakpoints: Breakpoints;
  screenWidth: number;
  scaleFactor: number;
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
 * Provider component for declarative configuration of the responsive system.
 * Wrapping your app in ResponsiveProvider allows you to configure baseWidth
 * and breakpoints via props instead of calling configure() imperatively.
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

  const config = getConfig();
  const screenWidth = getScreenWidth();

  const value = useMemo<ResponsiveConfigValue>(
    () => ({
      baseWidth: config.baseWidth,
      breakpoints: config.breakpoints,
      screenWidth,
      scaleFactor: screenWidth / config.baseWidth,
    }),
    [config.baseWidth, config.breakpoints, screenWidth]
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
 * @returns The current responsive configuration including baseWidth, breakpoints,
 *          screenWidth, and scaleFactor
 *
 * @example
 * ```tsx
 * import { useResponsiveConfig } from 'react-native-responsive-ui';
 *
 * function MyComponent() {
 *   const { scaleFactor, screenWidth, baseWidth } = useResponsiveConfig();
 *
 *   return (
 *     <Text>
 *       Screen: {screenWidth}px, Scale: {scaleFactor.toFixed(2)}x
 *     </Text>
 *   );
 * }
 * ```
 */
export function useResponsiveConfig(): ResponsiveConfigValue {
  const context = useContext(ResponsiveContext);

  // If not in a provider, return values from the module-level config
  if (context === null) {
    const config = getConfig();
    const screenWidth = getScreenWidth();
    return {
      baseWidth: config.baseWidth,
      breakpoints: config.breakpoints,
      screenWidth,
      scaleFactor: screenWidth / config.baseWidth,
    };
  }

  return context;
}
