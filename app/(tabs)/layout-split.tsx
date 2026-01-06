import {
  createScaledStyles,
  responsive,
  ResponsiveSwitch,
  s,
  useDeviceType,
} from "@vincent-huy-uit/react-native-responsive-ui";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * LAYOUT SPLIT DEMO
 *
 * Real use case: Email/Messaging App
 * Shows how ResponsiveSwitch renders completely
 * different component trees per device type.
 */

const emails = [
  {
    id: 1,
    sender: "Sarah Johnson",
    avatar: "👩‍💼",
    subject: "Q4 Marketing Strategy",
    preview:
      "Hi team, I wanted to share the updated marketing strategy for Q4. Please review the attached document...",
    time: "10:32 AM",
    unread: true,
    starred: true,
  },
  {
    id: 2,
    sender: "Dev Team",
    avatar: "👨‍💻",
    subject: "Sprint Review Meeting",
    preview:
      "Reminder: Sprint review meeting tomorrow at 2 PM. Please prepare your updates for the demo...",
    time: "9:15 AM",
    unread: true,
    starred: false,
  },
  {
    id: 3,
    sender: "Alex Chen",
    avatar: "🧑‍🎨",
    subject: "Design System Updates",
    preview:
      "I've finished the new component designs. The Figma file has been updated with all the changes...",
    time: "Yesterday",
    unread: false,
    starred: true,
  },
  {
    id: 4,
    sender: "HR Department",
    avatar: "📋",
    subject: "Benefits Enrollment Reminder",
    preview:
      "This is a reminder that open enrollment for benefits ends this Friday. Please make sure to...",
    time: "Yesterday",
    unread: false,
    starred: false,
  },
  {
    id: 5,
    sender: "Mike Peters",
    avatar: "👨‍🔬",
    subject: "API Documentation",
    preview:
      "The new API documentation is now live. You can find it at docs.example.com. Let me know if...",
    time: "Mon",
    unread: false,
    starred: false,
  },
];

interface EmailItemProps {
  email: (typeof emails)[0];
  selected?: boolean;
  onPress?: () => void;
  compact?: boolean;
}

function EmailItem({ email, selected, onPress, compact }: EmailItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        mobileStyles.emailItem,
        selected && mobileStyles.emailItemSelected,
        compact && { paddingVertical: s(12) },
      ]}
    >
      <View style={mobileStyles.avatarContainer}>
        <Text style={mobileStyles.avatar}>{email.avatar}</Text>
        {email.unread && <View style={mobileStyles.unreadDot} />}
      </View>
      <View style={mobileStyles.emailContent}>
        <View style={mobileStyles.emailHeader}>
          <Text
            style={[
              mobileStyles.sender,
              email.unread && mobileStyles.senderUnread,
            ]}
            numberOfLines={1}
          >
            {email.sender}
          </Text>
          <Text style={mobileStyles.time}>{email.time}</Text>
        </View>
        <Text
          style={[
            mobileStyles.subject,
            email.unread && mobileStyles.subjectUnread,
          ]}
          numberOfLines={1}
        >
          {email.starred && "⭐ "}
          {email.subject}
        </Text>
        {!compact && (
          <Text style={mobileStyles.preview} numberOfLines={1}>
            {email.preview}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

function EmailDetail({ email }: { email: (typeof emails)[0] | null }) {
  if (!email) {
    return (
      <View style={tabletStyles.emptyState}>
        <Text style={tabletStyles.emptyIcon}>📧</Text>
        <Text style={tabletStyles.emptyTitle}>Select an email</Text>
        <Text style={tabletStyles.emptyText}>
          Choose an email from the list to view its contents
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={tabletStyles.detailScroll}
      contentContainerStyle={tabletStyles.detailScrollContent}
    >
      <View style={tabletStyles.detailHeader}>
        <View style={tabletStyles.detailAvatar}>
          <Text style={tabletStyles.detailAvatarText}>{email.avatar}</Text>
        </View>
        <View style={tabletStyles.detailMeta}>
          <Text style={tabletStyles.detailSender}>{email.sender}</Text>
          <Text style={tabletStyles.detailTime}>{email.time}</Text>
        </View>
        <View style={tabletStyles.detailActions}>
          <Pressable style={tabletStyles.actionButton}>
            <Text style={tabletStyles.actionIcon}>↩️</Text>
          </Pressable>
          <Pressable style={tabletStyles.actionButton}>
            <Text style={tabletStyles.actionIcon}>🗑️</Text>
          </Pressable>
          <Pressable style={tabletStyles.actionButton}>
            <Text style={tabletStyles.actionIcon}>⭐</Text>
          </Pressable>
        </View>
      </View>
      <Text style={tabletStyles.detailSubject}>{email.subject}</Text>
      <View style={tabletStyles.detailBody}>
        <Text style={tabletStyles.detailText}>{email.preview}</Text>
        <Text style={tabletStyles.detailText}>
          {"\n"}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </Text>
        <Text style={tabletStyles.detailText}>
          {"\n"}Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum.
        </Text>
        <Text style={tabletStyles.detailText}>
          {"\n"}Best regards,{"\n"}
          {email.sender}
        </Text>
      </View>
    </ScrollView>
  );
}

// MOBILE LAYOUT - Full screen email list with navigation
function MobileLayout() {
  const [selectedEmail, setSelectedEmail] = useState<(typeof emails)[0] | null>(
    null
  );

  if (selectedEmail) {
    return (
      <SafeAreaView style={mobileStyles.container}>
        <View style={mobileStyles.mobileDetailHeader}>
          <Pressable
            onPress={() => setSelectedEmail(null)}
            style={mobileStyles.backButton}
          >
            <Text style={mobileStyles.backText}>← Back</Text>
          </Pressable>
          <View style={mobileStyles.mobileDetailActions}>
            <Text style={mobileStyles.actionIcon}>↩️</Text>
            <Text style={mobileStyles.actionIcon}>🗑️</Text>
          </View>
        </View>
        <EmailDetail email={selectedEmail} />

        {/* Code Card */}
        <View style={mobileStyles.codeCard}>
          <Text style={mobileStyles.codeLabel}>🔀 Layout Split</Text>
          <Text style={mobileStyles.codeText}>
            {"<ResponsiveSwitch mobile={<Mobile />} />"}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={mobileStyles.container}>
      <View style={mobileStyles.header}>
        <Text style={mobileStyles.headerTitle}>Inbox</Text>
        <View style={mobileStyles.headerBadge}>
          <Text style={mobileStyles.headerBadgeText}>2 new</Text>
        </View>
      </View>
      <ScrollView style={mobileStyles.list}>
        {emails.map((email) => (
          <EmailItem
            key={email.id}
            email={email}
            onPress={() => setSelectedEmail(email)}
          />
        ))}
      </ScrollView>

      {/* Code Card */}
      <View style={mobileStyles.codeCard}>
        <Text style={mobileStyles.codeLabel}>🔀 Layout Split</Text>
        <Text style={mobileStyles.codeText}>
          {"<ResponsiveSwitch mobile={<MobileLayout />} />"}
        </Text>
      </View>
    </SafeAreaView>
  );
}

// TABLET LAYOUT - Master-Detail split view
function TabletLayout() {
  const deviceType = useDeviceType();
  const sidebarWidth = responsive({ mobile: 280, tablet: 300, desktop: 340 });

  const [selectedEmail, setSelectedEmail] = useState<(typeof emails)[0] | null>(
    emails[0]
  );

  return (
    <SafeAreaView style={tabletStyles.container}>
      <View style={tabletStyles.splitView}>
        {/* Sidebar */}
        <View style={[tabletStyles.sidebar, { width: sidebarWidth }]}>
          <View style={tabletStyles.sidebarHeader}>
            <Text style={tabletStyles.sidebarTitle}>Inbox</Text>
            <Pressable style={tabletStyles.composeButton}>
              <Text style={tabletStyles.composeIcon}>✏️</Text>
            </Pressable>
          </View>
          <ScrollView style={tabletStyles.emailList}>
            {emails.map((email) => (
              <EmailItem
                key={email.id}
                email={email}
                selected={selectedEmail?.id === email.id}
                onPress={() => setSelectedEmail(email)}
                compact
              />
            ))}
          </ScrollView>
        </View>

        {/* Detail Panel */}
        <View style={tabletStyles.detailPanel}>
          <EmailDetail email={selectedEmail} />
        </View>
      </View>

      {/* Bottom Status Bar */}
      <View style={tabletStyles.statusBar}>
        <View style={tabletStyles.statusLeft}>
          <Text style={tabletStyles.statusIcon}>🔀</Text>
          <Text style={tabletStyles.statusText}>
            {deviceType === "desktop" ? "Desktop" : "Tablet"}: Master-detail
            split view
          </Text>
        </View>
        <View style={tabletStyles.codeSnippet}>
          <Text style={tabletStyles.codeSnippetText}>
            {"<"}
            <Text style={tabletStyles.codeTag}>ResponsiveSwitch</Text>
            {" tablet={<"}
            <Text style={tabletStyles.codeTag}>TabletLayout</Text>
            {" />} />"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function LayoutSplitScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#0F172A" }}>
      <ResponsiveSwitch
        mobile={<MobileLayout />}
        tablet={<TabletLayout />}
        desktop={<TabletLayout />}
      />
    </View>
  );
}

const mobileStyles = createScaledStyles({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F8FAFC",
  },
  headerBadge: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  headerBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  list: {
    flex: 1,
  },
  emailItem: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
    gap: 14,
  },
  emailItemSelected: {
    backgroundColor: "#1E293B",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    fontSize: 36,
    width: 48,
    height: 48,
    textAlign: "center",
    lineHeight: 48,
    backgroundColor: "#334155",
    borderRadius: 24,
    overflow: "hidden",
  },
  unreadDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: "#6366F1",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#0F172A",
  },
  emailContent: {
    flex: 1,
  },
  emailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  sender: {
    fontSize: 15,
    color: "#94A3B8",
    flex: 1,
  },
  senderUnread: {
    color: "#F8FAFC",
    fontWeight: "600",
  },
  time: {
    fontSize: 13,
    color: "#64748B",
  },
  subject: {
    fontSize: 15,
    color: "#94A3B8",
    marginBottom: 4,
  },
  subjectUnread: {
    color: "#F8FAFC",
    fontWeight: "500",
  },
  preview: {
    fontSize: 14,
    color: "#64748B",
  },
  mobileDetailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  backButton: {
    paddingVertical: 8,
  },
  backText: {
    color: "#6366F1",
    fontSize: 16,
    fontWeight: "500",
  },
  mobileDetailActions: {
    flexDirection: "row",
    gap: 16,
  },
  actionIcon: {
    fontSize: 20,
  },
  codeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  codeLabel: {
    color: "#F8FAFC",
    fontSize: 13,
    fontWeight: "600",
  },
  codeText: {
    flex: 1,
    color: "#64748B",
    fontSize: 11,
    fontFamily: "monospace",
  },
});

const tabletStyles = createScaledStyles({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  splitView: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    borderRightWidth: 1,
    borderRightColor: "#1E293B",
  },
  sidebarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F8FAFC",
  },
  composeButton: {
    width: 36,
    height: 36,
    backgroundColor: "#6366F1",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  composeIcon: {
    fontSize: 16,
  },
  emailList: {
    flex: 1,
  },
  detailPanel: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  detailScroll: {
    flex: 1,
  },
  detailScrollContent: {
    padding: 20,
  },
  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },
  detailAvatar: {
    width: 48,
    height: 48,
    backgroundColor: "#334155",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  detailAvatarText: {
    fontSize: 24,
  },
  detailMeta: {
    flex: 1,
  },
  detailSender: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F8FAFC",
  },
  detailTime: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  detailActions: {
    flexDirection: "row",
    gap: 6,
  },
  actionButton: {
    width: 36,
    height: 36,
    backgroundColor: "#1E293B",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  actionIcon: {
    fontSize: 16,
  },
  detailSubject: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 16,
  },
  detailBody: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 16,
  },
  detailText: {
    fontSize: 14,
    color: "#CBD5E1",
    lineHeight: 22,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F8FAFC",
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E293B",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusIcon: {
    fontSize: 16,
  },
  statusText: {
    color: "#94A3B8",
    fontSize: 13,
  },
  codeSnippet: {
    backgroundColor: "#0F172A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  codeSnippetText: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#94A3B8",
  },
  codeTag: {
    color: "#22D3EE",
  },
});
