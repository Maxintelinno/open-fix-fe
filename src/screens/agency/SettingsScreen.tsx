import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme';
import { useAuth } from '../../context/AuthContext';
import { mockAgencyUser } from '../../data/mockData';

const SettingsItem: React.FC<{ icon: string; label: string; note?: string; color?: string; onPress?: () => void }> = ({ icon, label, note, color, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIconContainer}>
      <Text style={{ fontSize: 18 }}>{icon}</Text>
    </View>
    <View style={styles.menuContent}>
      <Text style={[styles.menuLabel, color ? { color } : null]}>{label}</Text>
      {note && <Text style={styles.menuNote}>{note}</Text>}
    </View>
    <Text style={styles.menuArrow}>→</Text>
  </TouchableOpacity>
);

const SettingsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('agency.nav.settings')}</Text>
        </View>

        {/* Agency Profile Card */}
        <View style={[styles.profileCard, theme.shadows.sm]}>
          <View style={styles.profileInfo}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.secondary }]}>
              <Text style={styles.avatarText}>G</Text>
            </View>
            <View style={styles.profileTextContainer}>
              <Text style={styles.agencyName}>สำนักงานเขตพระนคร</Text>
              <Text style={styles.userName}>{mockAgencyUser.name}</Text>
              <Text style={styles.userRole}>เจ้าหน้าที่บริหารจัดการ (Admin)</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>การจัดการองค์กร</Text>
          <View style={styles.card}>
            <SettingsItem icon="👥" label="จัดการผู้ใช้งาน" note="12 เจ้าหน้าที่" />
            <SettingsItem icon="⏱️" label="ตั้งค่า SLA" note="กำหนดเวลาดำเนินการ" />
            <SettingsItem icon="🏢" label="เขตพื้นที่รับผิดชอบ" note="พระนคร, สัมพันธวงศ์" />
            <SettingsItem icon="📂" label="ประเภทปัญหา" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ระบบ</Text>
          <View style={styles.card}>
            <SettingsItem icon="🔔" label="การแจ้งเตือน" note="เปิดใช้งาน" />
            <SettingsItem icon="📜" label="ประวัติการดำเนินงาน" />
            <SettingsItem icon="ℹ️" label="เกี่ยวกับ OpenFix" />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.card}>
            <SettingsItem 
              icon="🚪" 
              label={t('profile.menu.logout')} 
              color={theme.colors.danger.base} 
              onPress={() => signOut()}
            />
          </View>
        </View>

        <Text style={styles.versionText}>OpenFix Agency v1.0.0 (Alpha)</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  profileCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileTextContainer: {
    flex: 1,
  },
  agencyName: {
    fontSize: 14,
    color: theme.colors.secondary,
    fontWeight: '700',
    marginBottom: 2,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  userRole: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.text.muted,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginLeft: 4,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[50],
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: theme.colors.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  menuNote: {
    fontSize: 12,
    color: theme.colors.text.muted,
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 16,
    color: theme.colors.gray[300],
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: theme.colors.text.muted,
    marginTop: 24,
  },
});

export default SettingsScreen;
