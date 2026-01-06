import {
  createScaledStyles,
  responsive,
  space,
  useDeviceType,
  useOrientation,
  useResponsiveConfig,
} from "@vincent-huy-uit/react-native-responsive-ui";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * BREAKPOINTS & RESPONSIVE HELPERS DEMO
 *
 * Real use case: Analytics Dashboard
 * Shows how breakpoints detect device type and
 * responsive() helper adapts values per device.
 */

const metrics = [
  {
    label: "Total Users",
    value: "24.5K",
    change: "+12.5%",
    positive: true,
    icon: "👥",
  },
  {
    label: "Revenue",
    value: "$89.2K",
    change: "+8.3%",
    positive: true,
    icon: "💰",
  },
  {
    label: "Orders",
    value: "1,234",
    change: "+23.1%",
    positive: true,
    icon: "📦",
  },
  {
    label: "Conversion",
    value: "3.2%",
    change: "-0.4%",
    positive: false,
    icon: "📊",
  },
];

const recentOrders = [
  {
    id: "#12345",
    customer: "John Doe",
    amount: "$299.00",
    status: "Completed",
    time: "2 min ago",
  },
  {
    id: "#12344",
    customer: "Jane Smith",
    amount: "$149.50",
    status: "Processing",
    time: "15 min ago",
  },
  {
    id: "#12343",
    customer: "Bob Wilson",
    amount: "$89.99",
    status: "Completed",
    time: "1 hr ago",
  },
  {
    id: "#12342",
    customer: "Alice Brown",
    amount: "$459.00",
    status: "Shipped",
    time: "2 hrs ago",
  },
];

const chartData = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88];

export default function ResponsiveScreen() {
  const deviceType = useDeviceType();
  const orientation = useOrientation();
  const { screenWidth, screenHeight, scaleFactor } = useResponsiveConfig();

  // Responsive values that change based on device type
  const metricColumns = responsive({ mobile: 2, tablet: 4, desktop: 4 });
  const chartHeight = responsive({ mobile: 120, tablet: 160, desktop: 200 });
  const showDetailedStats = responsive({
    mobile: false,
    tablet: true,
    desktop: true,
  });
  const cardPadding = responsive({
    mobile: space.md,
    tablet: space.md,
    desktop: space.lg,
  });

  // Reduce text sizes on tablet when showing 4 columns
  const metricValueSize = responsive({ mobile: 24, tablet: 20, desktop: 22 });
  const metricLabelSize = responsive({ mobile: 13, tablet: 16, desktop: 18 });
  const metricIconSize = responsive({ mobile: 28, tablet: 24, desktop: 29 });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Text style={styles.headerSubtitle}>Welcome back, Admin</Text>
          </View>
          <View style={styles.profileButton}>
            <Text style={styles.profileEmoji}>👤</Text>
          </View>
        </View>

        {/* Device Info Banner */}
        <View style={styles.deviceBanner}>
          <View style={styles.deviceInfo}>
            <View style={styles.deviceBadge}>
              <Text style={styles.deviceBadgeText}>
                {deviceType.toUpperCase()}
              </Text>
            </View>
            <View style={[styles.deviceBadge, styles.orientationBadge]}>
              <Text style={styles.deviceBadgeText}>
                {orientation === "landscape" ? "🔄 LANDSCAPE" : "📱 PORTRAIT"}
              </Text>
            </View>
          </View>
          <Text style={styles.deviceStats}>
            {Math.round(screenWidth)} × {Math.round(screenHeight)} •{" "}
            {scaleFactor.toFixed(2)}x
          </Text>
        </View>

        {/* Metrics Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View
            style={[
              styles.metricsGrid,
              { flexDirection: metricColumns === 2 ? "row" : "row" },
            ]}
          >
            {metrics.map((metric) => (
              <View
                key={metric.label}
                style={[
                  styles.metricCard,
                  {
                    width: metricColumns === 2 ? "48%" : "23%",
                    padding: cardPadding,
                  },
                ]}
              >
                <View style={styles.metricHeader}>
                  <Text
                    style={[styles.metricIcon, { fontSize: metricIconSize }]}
                  >
                    {metric.icon}
                  </Text>
                  {showDetailedStats && (
                    <View
                      style={[
                        styles.changeBadge,
                        !metric.positive && styles.changeBadgeNegative,
                      ]}
                    >
                      <Text
                        style={[
                          styles.changeText,
                          !metric.positive && styles.changeTextNegative,
                        ]}
                      >
                        {metric.change}
                      </Text>
                    </View>
                  )}
                </View>
                <Text
                  style={[styles.metricValue, { fontSize: metricValueSize }]}
                >
                  {metric.value}
                </Text>
                <Text
                  style={[styles.metricLabel, { fontSize: metricLabelSize }]}
                >
                  {metric.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Chart Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Revenue Trend</Text>
            <View style={styles.periodSelector}>
              <Text style={styles.periodText}>Last 12 months</Text>
            </View>
          </View>
          <View style={styles.chartCard}>
            <View style={[styles.chart, { height: chartHeight }]}>
              {chartData.map((value, index) => (
                <View key={index} style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${value}%`,
                        backgroundColor:
                          index === chartData.length - 1
                            ? "#6366F1"
                            : "#334155",
                      },
                    ]}
                  />
                </View>
              ))}
            </View>
            <View style={styles.chartLabels}>
              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ].map((month, i) => (
                <Text key={month} style={styles.chartLabel}>
                  {responsive({ mobile: month.charAt(0), tablet: month })}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <Text style={styles.viewAllText}>View All →</Text>
          </View>
          <View style={styles.ordersCard}>
            {/* Table Header - only on tablet+ */}
            {showDetailedStats && (
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>Order</Text>
                <Text style={[styles.tableHeaderText, { flex: 2 }]}>
                  Customer
                </Text>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>
                  Amount
                </Text>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>
                  Status
                </Text>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>Time</Text>
              </View>
            )}
            {recentOrders.map((order, index) => (
              <View
                key={order.id}
                style={[
                  styles.orderRow,
                  index === recentOrders.length - 1 && styles.orderRowLast,
                ]}
              >
                {showDetailedStats ? (
                  // Tablet/Desktop: Table layout
                  <>
                    <Text style={[styles.orderId, { flex: 1 }]}>
                      {order.id}
                    </Text>
                    <Text style={[styles.orderCustomer, { flex: 2 }]}>
                      {order.customer}
                    </Text>
                    <Text style={[styles.orderAmount, { flex: 1 }]}>
                      {order.amount}
                    </Text>
                    <View style={{ flex: 1 }}>
                      <View
                        style={[
                          styles.statusBadge,
                          order.status === "Processing" &&
                            styles.statusProcessing,
                          order.status === "Shipped" && styles.statusShipped,
                        ]}
                      >
                        <Text style={styles.statusText}>{order.status}</Text>
                      </View>
                    </View>
                    <Text style={[styles.orderTime, { flex: 1 }]}>
                      {order.time}
                    </Text>
                  </>
                ) : (
                  // Mobile: Card layout
                  <View style={styles.orderCardMobile}>
                    <View style={styles.orderCardTop}>
                      <Text style={styles.orderId}>{order.id}</Text>
                      <Text style={styles.orderAmount}>{order.amount}</Text>
                    </View>
                    <View style={styles.orderCardBottom}>
                      <Text style={styles.orderCustomer}>{order.customer}</Text>
                      <View
                        style={[
                          styles.statusBadge,
                          order.status === "Processing" &&
                            styles.statusProcessing,
                          order.status === "Shipped" && styles.statusShipped,
                        ]}
                      >
                        <Text style={styles.statusText}>{order.status}</Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Code Example */}
        <View style={styles.section}>
          <View style={styles.codeCard}>
            <Text style={styles.codeTitle}>📱 Breakpoints & Responsive</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.code}>
                <Text style={styles.codeComment}>
                  // Detect current device type
                </Text>
                {"\n"}
                <Text style={styles.codeKeyword}>const</Text> device ={" "}
                <Text style={styles.codeFunc}>useDeviceType</Text>();
                {"\n"}
                <Text style={styles.codeComment}>// → "{deviceType}"</Text>
                {"\n\n"}
                <Text style={styles.codeComment}>
                  // Responsive values per device
                </Text>
                {"\n"}
                <Text style={styles.codeKeyword}>const</Text> cols ={" "}
                <Text style={styles.codeFunc}>responsive</Text>({"{"}
                {"\n"}
                {"  "}mobile: <Text style={styles.codeNum}>2</Text>,{"\n"}
                {"  "}tablet: <Text style={styles.codeNum}>4</Text>,{"\n"}
                {"  "}desktop: <Text style={styles.codeNum}>4</Text>
                {"\n"}
                {"}"});
                {"\n"}
                <Text style={styles.codeComment}>// → {metricColumns}</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = createScaledStyles({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F8FAFC",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 2,
  },
  profileButton: {
    width: 48,
    height: 48,
    backgroundColor: "#1E293B",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  profileEmoji: {
    fontSize: 24,
  },

  // Device Banner
  deviceBanner: {
    backgroundColor: "#1E293B",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  deviceInfo: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  deviceBadge: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  orientationBadge: {
    backgroundColor: "#10B981",
  },
  deviceBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  deviceStats: {
    color: "#64748B",
    fontSize: 13,
  },

  // Section
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F8FAFC",
    marginBottom: 16,
  },
  viewAllText: {
    color: "#6366F1",
    fontSize: 14,
    fontWeight: "500",
  },

  // Metrics
  metricsGrid: {
    flexWrap: "wrap",
    gap: 12,
  },
  metricCard: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
  },
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  metricIcon: {
    fontSize: 28,
  },
  changeBadge: {
    backgroundColor: "#10B98120",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  changeBadgeNegative: {
    backgroundColor: "#EF444420",
  },
  changeText: {
    color: "#10B981",
    fontSize: 12,
    fontWeight: "600",
  },
  changeTextNegative: {
    color: "#EF4444",
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#F8FAFC",
  },
  metricLabel: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
  },

  // Chart
  chartCard: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 20,
  },
  periodSelector: {
    backgroundColor: "#334155",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  periodText: {
    color: "#94A3B8",
    fontSize: 13,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  barContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
  },
  bar: {
    borderRadius: 4,
    minHeight: 8,
  },
  chartLabels: {
    flexDirection: "row",
    marginTop: 12,
  },
  chartLabel: {
    flex: 1,
    textAlign: "center",
    color: "#64748B",
    fontSize: 11,
  },

  // Orders
  ordersCard: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 16,
  },
  tableHeader: {
    flexDirection: "row",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
    marginBottom: 8,
  },
  tableHeaderText: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  orderRowLast: {
    borderBottomWidth: 0,
  },
  orderId: {
    color: "#F8FAFC",
    fontSize: 14,
    fontWeight: "600",
  },
  orderCustomer: {
    color: "#94A3B8",
    fontSize: 14,
  },
  orderAmount: {
    color: "#10B981",
    fontSize: 14,
    fontWeight: "600",
  },
  orderTime: {
    color: "#64748B",
    fontSize: 13,
  },
  statusBadge: {
    backgroundColor: "#10B98120",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  statusProcessing: {
    backgroundColor: "#F59E0B20",
  },
  statusShipped: {
    backgroundColor: "#3B82F620",
  },
  statusText: {
    color: "#10B981",
    fontSize: 12,
    fontWeight: "500",
  },

  // Mobile order card
  orderCardMobile: {
    flex: 1,
  },
  orderCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderCardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Code
  codeCard: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 20,
  },
  codeTitle: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  codeBlock: {
    backgroundColor: "#0F172A",
    borderRadius: 12,
    padding: 16,
  },
  code: {
    fontFamily: "monospace",
    fontSize: 13,
    color: "#E2E8F0",
    lineHeight: 22,
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
});
