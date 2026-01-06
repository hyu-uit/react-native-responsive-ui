import { StyleSheet, Text, View } from "react-native";

import {
  font,
  getScaleFactor,
  radius,
  s,
  space,
} from "react-native-responsive-ui";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Scaling Demo Section */}
      <View style={styles.stepContainer}>
        <Text style={styles.subtitle}>Scaling Demo</Text>
        <Text style={styles.text}>
          Current scale factor:{" "}
          <Text style={styles.bold}>{getScaleFactor().toFixed(2)}x</Text>
        </Text>

        {/* Demo boxes using s() function */}
        <View style={styles.demoRow}>
          <View style={styles.demoBox}>
            <Text style={{ fontSize: s(12) }}>s(12)</Text>
          </View>
          <View style={styles.demoBox}>
            <Text style={{ fontSize: s(16) }}>s(16)</Text>
          </View>
          <View style={styles.demoBox}>
            <Text style={{ fontSize: s(24) }}>s(24)</Text>
          </View>
        </View>

        {/* Demo using design tokens */}
        <Text style={[styles.text, { marginTop: space.md }]}>
          Using design tokens:
        </Text>
        <View style={styles.demoRow}>
          <View
            style={[
              styles.tokenBox,
              { padding: space.xs, borderRadius: radius.sm },
            ]}
          >
            <Text style={[styles.tokenText, { fontSize: font.caption }]}>
              xs/sm
            </Text>
          </View>
          <View
            style={[
              styles.tokenBox,
              { padding: space.sm, borderRadius: radius.md },
            ]}
          >
            <Text style={[styles.tokenText, { fontSize: font.body }]}>
              sm/md
            </Text>
          </View>
          <View
            style={[
              styles.tokenBox,
              { padding: space.md, borderRadius: radius.lg },
            ]}
          >
            <Text style={[styles.tokenText, { fontSize: font.title }]}>
              md/lg
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  stepContainer: {
    gap: s(8),
    padding: s(16),
  },
  subtitle: {
    fontSize: s(20),
    fontWeight: "600",
    marginBottom: s(8),
  },
  text: {
    fontSize: s(16),
  },
  bold: {
    fontWeight: "600",
  },
  demoRow: {
    flexDirection: "row",
    gap: s(8),
    marginTop: s(8),
    flexWrap: "wrap",
  },
  demoBox: {
    backgroundColor: "#A1CEDC",
    padding: s(12),
    borderRadius: s(8),
    alignItems: "center",
    justifyContent: "center",
  },
  tokenBox: {
    backgroundColor: "#1D3D47",
    alignItems: "center",
    justifyContent: "center",
  },
  tokenText: {
    color: "#fff",
  },
});
