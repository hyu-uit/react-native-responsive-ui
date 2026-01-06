import React, { ComponentType, ReactElement } from "react";
import { DeviceType, getDeviceType } from "./breakpoints";

/**
 * Component variants for each device type.
 * Mobile is required; tablet and desktop are optional with mobile-first fallback.
 */
export interface ResponsiveComponentVariants<P> {
  mobile: ComponentType<P>;
  tablet?: ComponentType<P>;
  desktop?: ComponentType<P>;
}

/**
 * Create a component that renders different implementations based on device type.
 * Uses mobile-first fallback: if a device variant isn't specified, falls back to smaller breakpoints.
 *
 * @param variants - Object mapping device types to component implementations
 * @returns A component that renders the appropriate variant based on current device type
 *
 * @example
 * ```tsx
 * import { responsiveComponent } from 'react-native-responsive-ui';
 *
 * // Define different implementations
 * const ProductCardMobile = ({ title, price }) => (
 *   <View style={{ flexDirection: 'column' }}>
 *     <Text>{title}</Text>
 *     <Text>${price}</Text>
 *   </View>
 * );
 *
 * const ProductCardTablet = ({ title, price }) => (
 *   <View style={{ flexDirection: 'row' }}>
 *     <Image source={...} />
 *     <Text>{title}</Text>
 *     <Text>${price}</Text>
 *   </View>
 * );
 *
 * // Create responsive component
 * const ProductCard = responsiveComponent({
 *   mobile: ProductCardMobile,
 *   tablet: ProductCardTablet,
 * });
 *
 * // Use like a normal component - props are forwarded
 * <ProductCard title="iPhone 15" price={999} />
 * ```
 */
export function responsiveComponent<P extends object>(
  variants: ResponsiveComponentVariants<P>
): ComponentType<P> {
  const ResponsiveWrapper = (props: P) => {
    const deviceType = getDeviceType();
    const Component = selectVariant(variants, deviceType);
    return <Component {...props} />;
  };

  // Set display name for debugging
  ResponsiveWrapper.displayName = "ResponsiveComponent";

  return ResponsiveWrapper;
}

/**
 * Select the appropriate component variant based on device type.
 * Uses mobile-first fallback pattern.
 */
function selectVariant<P>(
  variants: ResponsiveComponentVariants<P>,
  deviceType: DeviceType
): ComponentType<P> {
  switch (deviceType) {
    case "desktop":
      return variants.desktop ?? variants.tablet ?? variants.mobile;
    case "tablet":
      return variants.tablet ?? variants.mobile;
    case "mobile":
    default:
      return variants.mobile;
  }
}

/**
 * Props for the ResponsiveSwitch component.
 * Mobile is required; tablet and desktop are optional with mobile-first fallback.
 */
export interface ResponsiveSwitchProps {
  mobile: ReactElement;
  tablet?: ReactElement;
  desktop?: ReactElement;
}

/**
 * Component for declarative layout splitting in JSX.
 * Renders different content based on the current device type.
 * Uses mobile-first fallback: if a device variant isn't specified, falls back to smaller breakpoints.
 *
 * @example
 * ```tsx
 * import { ResponsiveSwitch } from 'react-native-responsive-ui';
 *
 * function Navigation() {
 *   return (
 *     <ResponsiveSwitch
 *       mobile={<BottomTabNavigation />}
 *       tablet={<SidebarNavigation />}
 *       desktop={<TopNavigation />}
 *     />
 *   );
 * }
 *
 * // Fallback example - tablet and desktop will use mobile content
 * <ResponsiveSwitch
 *   mobile={<CompactView />}
 * />
 *
 * // Two variants - desktop falls back to tablet
 * <ResponsiveSwitch
 *   mobile={<MobileLayout />}
 *   tablet={<WideLayout />}
 * />
 * ```
 */
export function ResponsiveSwitch({
  mobile,
  tablet,
  desktop,
}: ResponsiveSwitchProps): ReactElement {
  const deviceType = getDeviceType();

  switch (deviceType) {
    case "desktop":
      return desktop ?? tablet ?? mobile;
    case "tablet":
      return tablet ?? mobile;
    case "mobile":
    default:
      return mobile;
  }
}
