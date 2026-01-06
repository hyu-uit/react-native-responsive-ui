import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6366F1",
        tabBarInactiveTintColor: "#64748B",
        tabBarStyle: {
          backgroundColor: "#1E293B",
          borderTopColor: "#334155",
          height: 80,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
          marginTop: 4,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Scaling",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor:
                  color === "#6366F1" ? "#6366F120" : "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>📐</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="responsive"
        options={{
          title: "Responsive",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor:
                  color === "#6366F1" ? "#6366F120" : "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>📱</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="layout-split"
        options={{
          title: "Layout Split",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor:
                  color === "#6366F1" ? "#6366F120" : "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>🔀</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
