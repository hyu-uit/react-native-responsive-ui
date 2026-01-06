import {
  createScaledStyles,
  useResponsiveConfig,
} from "@vincent-huy-uit/react-native-responsive-ui";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * SCALING SYSTEM DEMO
 *
 * Real use case: E-commerce Marketplace
 * Shows how the scaling system automatically adapts
 * UI elements across different screen sizes.
 */

const categories = ["All", "Tech", "Audio", "Accessories"];

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    subtitle: "Premium Sound",
    price: 299.0,
    tag: "NEW",
    tagColor: "#3B82F6",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    subtitle: "Tactile Switch",
    price: 149.5,
    tag: null,
    tagColor: null,
    image:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80",
  },
  {
    id: 3,
    name: "Smart Watch Series 7",
    subtitle: "Fitness Tracker",
    price: 399.0,
    tag: "SALE",
    tagColor: "#EF4444",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
  },
  {
    id: 4,
    name: "Ergonomic Mouse",
    subtitle: "Wireless",
    price: 89.99,
    tag: null,
    tagColor: null,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80",
  },
  {
    id: 5,
    name: "VR Headset Pro",
    subtitle: "Immersive 3D",
    price: 599.0,
    tag: null,
    tagColor: null,
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&q=80",
  },
  {
    id: 6,
    name: "Portable Speaker",
    subtitle: "Waterproof",
    price: 79.99,
    tag: null,
    tagColor: null,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80",
  },
];

function ProductCard({ product }: { product: (typeof products)[0] }) {
  return (
    <View style={styles.card}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          contentFit="cover"
        />
        {product.tag && (
          <View style={[styles.tag, { backgroundColor: product.tagColor }]}>
            <Text style={styles.tagText}>{product.tag}</Text>
          </View>
        )}
      </View>

      {/* Product Info */}
      <View style={styles.cardContent}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.productSubtitle}>{product.subtitle}</Text>

        {/* Price Row */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function ScalingScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { screenWidth, scaleFactor } = useResponsiveConfig();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.headerButton}>
          <Text style={styles.headerButtonText}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Responsive Grid</Text>
        <Pressable style={styles.headerButton}>
          <Text style={styles.headerButtonText}>👁</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Marketplace Demo</Text>
          <Text style={styles.subtitle}>Scaling typography & layouts</Text>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[
                styles.categoryChip,
                activeCategory === cat && styles.categoryChipActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Product Grid */}
        <View style={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.statusIcon}>📐</Text>
        <Text style={styles.statusText}>
          Width: {Math.round(screenWidth)}dp | Scale: {scaleFactor.toFixed(1)}x
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = createScaledStyles({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#334155",
    justifyContent: "center",
    alignItems: "center",
  },
  headerButtonText: {
    fontSize: 18,
    color: "#94A3B8",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F8FAFC",
  },

  // Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Title Section
  titleSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
  },

  // Categories
  categoriesScroll: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#1E293B",
    borderRadius: 24,
  },
  categoryChipActive: {
    backgroundColor: "#3B82F6",
  },
  categoryText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "#fff",
  },

  // Grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 16,
  },

  // Card
  card: {
    width: "47%",
    backgroundColor: "#1E293B",
    borderRadius: 16,
    overflow: "hidden",
  },
  imageContainer: {
    height: 160,
    backgroundColor: "#334155",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  tag: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  tagText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  cardContent: {
    padding: 14,
  },
  productName: {
    color: "#F8FAFC",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
    marginBottom: 2,
  },
  productSubtitle: {
    color: "#64748B",
    fontSize: 13,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    color: "#3B82F6",
    fontSize: 17,
    fontWeight: "700",
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#334155",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#94A3B8",
    fontSize: 20,
    fontWeight: "400",
    marginTop: -2,
  },

  // Status Bar
  statusBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E293B",
    paddingVertical: 14,
    gap: 8,
    marginHorizontal: 40,
    marginBottom: 8,
    borderRadius: 24,
  },
  statusIcon: {
    fontSize: 14,
  },
  statusText: {
    color: "#94A3B8",
    fontSize: 13,
    fontFamily: "monospace",
  },
});
