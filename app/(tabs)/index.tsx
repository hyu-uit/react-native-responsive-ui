import { ScrollView, Text, View } from "react-native";

import {
  createScaledStyles,
  responsive,
  ResponsiveSwitch,
  s,
  space,
  useDeviceType,
  useOrientation,
  useResponsiveConfig,
  useScaledValue,
  useScaleFactor,
} from "react-native-responsive-ui";
import { SafeAreaView } from "react-native-safe-area-context";

// Sample data for the dashboard
const stats = [
  { label: "Users", value: "12.5K", change: "+12%", color: "#10B981" },
  { label: "Revenue", value: "$45.2K", change: "+8%", color: "#6366F1" },
  { label: "Orders", value: "1,234", change: "+23%", color: "#F59E0B" },
  // { label: "Growth", value: "18.2%", change: "+5%", color: "#EC4899" },
];

const features = [
  {
    icon: "📐",
    title: "Auto Scaling",
    desc: "Scale values proportionally across all screen sizes",
  },
  {
    icon: "📱",
    title: "Breakpoints",
    desc: "Detect mobile, tablet, and desktop automatically",
  },
  {
    icon: "🎯",
    title: "Responsive",
    desc: "Choose different values per device type",
  },
];

// Mobile layout - stacked vertical cards
function MobileLayoutDemo() {
  return (
    <View style={layoutStyles.mobileContainer}>
      <View style={layoutStyles.mobileCard}>
        <Text style={layoutStyles.cardIcon}>📱</Text>
        <View style={layoutStyles.cardContent}>
          <Text style={layoutStyles.cardTitle}>Mobile Layout</Text>
          <Text style={layoutStyles.cardDesc}>
            Stacked vertical cards optimized for narrow screens
          </Text>
        </View>
      </View>
      <View style={layoutStyles.mobileCard}>
        <Text style={layoutStyles.cardIcon}>👆</Text>
        <View style={layoutStyles.cardContent}>
          <Text style={layoutStyles.cardTitle}>Touch First</Text>
          <Text style={layoutStyles.cardDesc}>
            Large tap targets and swipe gestures
          </Text>
        </View>
      </View>
    </View>
  );
}

// Tablet layout - side by side with sidebar
function TabletLayoutDemo() {
  return (
    <View style={layoutStyles.tabletContainer}>
      <View style={layoutStyles.sidebar}>
        <Text style={layoutStyles.sidebarIcon}>📋</Text>
        <Text style={layoutStyles.sidebarText}>Menu</Text>
        <View style={layoutStyles.sidebarDivider} />
        <Text style={layoutStyles.sidebarItem}>Home</Text>
        <Text style={layoutStyles.sidebarItem}>Search</Text>
        <Text style={layoutStyles.sidebarItem}>Settings</Text>
      </View>
      <View style={layoutStyles.mainContent}>
        <Text style={layoutStyles.tabletTitle}>Tablet Layout</Text>
        <Text style={layoutStyles.tabletDesc}>
          Master-detail pattern with persistent sidebar navigation. This layout
          is completely different from mobile - not just responsive values!
        </Text>
        <View style={layoutStyles.tabletBadge}>
          <Text style={layoutStyles.badgeText}>ResponsiveSwitch</Text>
        </View>
      </View>
    </View>
  );
}

// Using createScaledStyles - no need to wrap every value with s()!
const layoutStyles = createScaledStyles({
  // Mobile Layout
  mobileContainer: {
    gap: 8,
  },
  mobileCard: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  cardIcon: {
    fontSize: 28,
  },
  cardContent: {
    flex: 1, // flex is NOT scaled (ratio)
  },
  cardTitle: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardDesc: {
    color: "#94A3B8",
    fontSize: 12,
  },

  // Tablet Layout
  tabletContainer: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    borderRadius: 12,
    overflow: "hidden",
  },
  sidebar: {
    width: 100,
    backgroundColor: "#334155",
    padding: 16,
    alignItems: "center",
  },
  sidebarIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  sidebarText: {
    color: "#F8FAFC",
    fontSize: 12,
    fontWeight: "600",
  },
  sidebarDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "#475569",
    marginVertical: 8,
  },
  sidebarItem: {
    color: "#94A3B8",
    fontSize: 12,
    marginVertical: 4,
  },
  mainContent: {
    flex: 1, // flex is NOT scaled (ratio)
    padding: 24,
  },
  tabletTitle: {
    color: "#F8FAFC",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  tabletDesc: {
    color: "#94A3B8",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  tabletBadge: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default function HomeScreen() {
  const deviceType = useDeviceType();
  const orientation = useOrientation();
  const { screenWidth, screenHeight } = useResponsiveConfig();
  const scaleFactor = useScaleFactor(); // Reactive - updates on rotation!

  // Use reactive scaled values for dynamic sizing
  const dynamicPadding = useScaledValue(16);
  const dynamicFontSize = useScaledValue(24);

  // Responsive values that change per breakpoint
  const cardColumns = responsive({ mobile: 2, tablet: 3, desktop: 3 });
  const featureColumns = responsive({ mobile: 1, tablet: 2, desktop: 3 });
  const headerPadding = responsive({ mobile: space.md, tablet: space.xl });
  const showFullStats = responsive({ mobile: false, tablet: true });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Header */}
        <View style={[styles.header, { padding: headerPadding }]}>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{deviceType.toUpperCase()}</Text>
            </View>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor:
                    orientation === "landscape" ? "#10B981" : "#6366F1",
                },
              ]}
            >
              <Text style={styles.badgeText}>
                {orientation === "landscape" ? "🔄 LANDSCAPE" : "📱 PORTRAIT"}
              </Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>react-native-responsive-ui</Text>
          <Text style={styles.heroSubtitle}>
            Build beautiful responsive apps with ease
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{scaleFactor.toFixed(2)}x</Text>
              <Text style={styles.statLabel}>Scale</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{Math.round(screenWidth)}</Text>
              <Text style={styles.statLabel}>Width</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{Math.round(screenHeight)}</Text>
              <Text style={styles.statLabel}>Height</Text>
            </View>
          </View>
        </View>

        {/* Dashboard Cards - responsive grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dashboard</Text>
          <Text style={styles.sectionDesc}>
            Cards adapt from {cardColumns} columns based on screen size
          </Text>
          <View
            style={[
              styles.cardGrid,
              { flexDirection: cardColumns === 1 ? "column" : "row" },
            ]}
          >
            {stats.map((stat, index) => (
              <View
                key={stat.label}
                style={[
                  styles.card,
                  {
                    width:
                      cardColumns === 1 ? "100%" : `${100 / cardColumns - 2}%`,
                    borderLeftColor: stat.color,
                  },
                ]}
              >
                <Text style={styles.cardValue}>{stat.value}</Text>
                <Text style={styles.cardLabel}>{stat.label}</Text>
                {showFullStats && (
                  <View
                    style={[
                      styles.changeBadge,
                      { backgroundColor: stat.color + "20" },
                    ]}
                  >
                    <Text style={[styles.changeText, { color: stat.color }]}>
                      {stat.change}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Features - responsive layout */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <Text style={styles.sectionDesc}>
            Layout changes: {featureColumns} column
            {featureColumns > 1 ? "s" : ""} on {deviceType}
          </Text>
          <View
            style={[
              styles.featureGrid,
              { flexDirection: featureColumns === 1 ? "column" : "row" },
            ]}
          >
            {features.map((feature) => (
              <View
                key={feature.title}
                style={[
                  styles.featureCard,
                  {
                    width:
                      featureColumns === 1
                        ? "100%"
                        : `${100 / featureColumns - 2}%`,
                  },
                ]}
              >
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Code Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Usage</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.code}>
              <Text style={styles.codeKeyword}>const</Text> device ={" "}
              <Text style={styles.codeFunc}>useDeviceType</Text>();{"\n"}
              <Text style={styles.codeComment}>// → "{deviceType}"</Text>
              {"\n\n"}
              <Text style={styles.codeKeyword}>const</Text> cols ={" "}
              <Text style={styles.codeFunc}>responsive</Text>({"{"}
              {"\n"}
              {"  "}mobile: <Text style={styles.codeNum}>1</Text>,{"\n"}
              {"  "}tablet: <Text style={styles.codeNum}>2</Text>,{"\n"}
              {"  "}desktop: <Text style={styles.codeNum}>4</Text>
              {"\n"}
              {"}"});{"\n"}
              <Text style={styles.codeComment}>// → {cardColumns}</Text>
              {"\n\n"}
              <Text style={styles.codeKeyword}>const</Text> padding ={" "}
              <Text style={styles.codeFunc}>s</Text>(
              <Text style={styles.codeNum}>16</Text>);{"\n"}
              <Text style={styles.codeComment}>// → {s(16).toFixed(1)}</Text>
            </Text>
          </View>
        </View>

        {/* Orientation Demo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Orientation</Text>
          <Text style={styles.sectionDesc}>
            Rotate your device to see real-time updates!
          </Text>
          <View style={styles.orientationCard}>
            <View style={styles.orientationRow}>
              <View style={styles.orientationItem}>
                <Text style={styles.orientationIcon}>
                  {orientation === "portrait" ? "📱" : "📱"}
                </Text>
                <Text style={styles.orientationValue}>
                  {orientation.charAt(0).toUpperCase() + orientation.slice(1)}
                </Text>
                <Text style={styles.orientationLabel}>Orientation</Text>
              </View>
              <View style={styles.orientationDivider} />
              <View style={styles.orientationItem}>
                <Text style={styles.orientationIcon}>📐</Text>
                <Text style={styles.orientationValue}>
                  {Math.round(screenWidth)} × {Math.round(screenHeight)}
                </Text>
                <Text style={styles.orientationLabel}>Dimensions</Text>
              </View>
            </View>

            {/* Dynamic scaling demo */}
            <View style={styles.dynamicScaleDemo}>
              <Text style={styles.dynamicScaleLabel}>
                useScaledValue(24) → {dynamicFontSize.toFixed(1)}
              </Text>
              <Text
                style={[styles.dynamicScaleText, { fontSize: dynamicFontSize }]}
              >
                This text scales on rotation!
              </Text>
            </View>

            <View style={styles.orientationHint}>
              <Text style={styles.orientationHintText}>
                💡 Use useScaledValue() for dynamic scaling that updates on
                rotation
              </Text>
            </View>
          </View>
        </View>

        {/* Scaling Demo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scaling Demo</Text>
          <Text style={styles.sectionDesc}>
            Font sizes scale automatically with s()
          </Text>
          <View style={styles.scaleRow}>
            {[12, 16, 20, 24, 32].map((size) => (
              <View key={size} style={styles.scaleItem}>
                <Text style={[styles.scaleText, { fontSize: s(size) }]}>
                  Aa
                </Text>
                <Text style={styles.scaleLabel}>s({size})</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tokens Demo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Design Tokens</Text>
          <Text style={styles.sectionDesc}>
            Pre-built spacing and typography tokens
          </Text>
          <View style={styles.tokenRow}>
            {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
              <View key={size} style={styles.tokenItem}>
                <View
                  style={[
                    styles.tokenBox,
                    { width: space[size], height: space[size] },
                  ]}
                />
                <Text style={styles.tokenLabel}>{size}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Layout Split Demo */}
        <View style={[styles.section, { marginBottom: s(48) }]}>
          <Text style={styles.sectionTitle}>Layout Split</Text>
          <Text style={styles.sectionDesc}>
            Render completely different layouts per device type
          </Text>
          <ResponsiveSwitch
            mobile={<MobileLayoutDemo />}
            tablet={<TabletLayoutDemo />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Main styles using createScaledStyles - clean, no s() wrappers needed!
const styles = createScaledStyles({
  container: {
    flex: 1, // NOT scaled (ratio)
    backgroundColor: "#0F172A",
  },
  scroll: {
    flex: 1, // NOT scaled (ratio)
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Header
  header: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    margin: 16,
    alignItems: "center",
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  heroTitle: {
    color: "#F8FAFC",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  heroSubtitle: {
    color: "#94A3B8",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: "#F8FAFC",
    fontSize: 24,
    fontWeight: "700",
  },
  statLabel: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: "#334155",
  },

  // Sections
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    color: "#F8FAFC",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  sectionDesc: {
    color: "#64748B",
    fontSize: 12,
    marginBottom: 16,
  },

  // Dashboard Cards
  cardGrid: {
    flexWrap: "wrap",
    gap: 8,
  },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 3,
  },
  cardValue: {
    color: "#F8FAFC",
    fontSize: 24,
    fontWeight: "700",
  },
  cardLabel: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 4,
  },
  changeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 8,
  },
  changeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  // Features
  featureGrid: {
    flexWrap: "wrap",
    gap: 8,
  },
  featureCard: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  featureDesc: {
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center",
  },

  // Code Block
  codeBlock: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  code: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#E2E8F0",
    lineHeight: 20,
  },
  codeKeyword: {
    color: "#C084FC",
  },
  codeFunc: {
    color: "#22D3EE",
  },
  codeNum: {
    color: "#F59E0B",
  },
  codeComment: {
    color: "#64748B",
  },

  // Orientation Demo
  orientationCard: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 16,
  },
  orientationRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  orientationItem: {
    alignItems: "center",
    flex: 1,
  },
  orientationIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  orientationValue: {
    color: "#F8FAFC",
    fontSize: 18,
    fontWeight: "700",
  },
  orientationLabel: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 4,
  },
  orientationDivider: {
    width: 1,
    height: 60,
    backgroundColor: "#334155",
  },
  dynamicScaleDemo: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#1E293B",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6366F1",
    alignItems: "center",
  },
  dynamicScaleLabel: {
    color: "#6366F1",
    fontSize: 12,
    fontFamily: "monospace",
    marginBottom: 8,
  },
  dynamicScaleText: {
    color: "#F8FAFC",
    fontWeight: "600",
  },
  orientationHint: {
    marginTop: 16,
    backgroundColor: "#334155",
    borderRadius: 8,
    padding: 12,
  },
  orientationHintText: {
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center",
  },

  // Scaling Demo
  scaleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 16,
  },
  scaleItem: {
    alignItems: "center",
  },
  scaleText: {
    color: "#F8FAFC",
    fontWeight: "600",
  },
  scaleLabel: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 4,
  },

  // Tokens Demo
  tokenRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 16,
  },
  tokenItem: {
    alignItems: "center",
  },
  tokenBox: {
    backgroundColor: "#6366F1",
    borderRadius: 4,
  },
  tokenLabel: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 4,
  },
});
