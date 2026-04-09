import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { theme } from '../../theme';
import { mockUser } from '../../data/mockData';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

const MenuItem: React.FC<{ icon: string; label: string; note?: string; color?: string; onPress?: () => void }> = ({ icon, label, note, color, onPress }) => (
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

const ProfileScreen: React.FC = () => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  
  // Use user from context
  const displayUser = user || mockUser;

  const handleLogout = () => {
    signOut();
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'CITIZEN': return '👤';
      case 'AGENCY': return '🏢';
      case 'AUDITOR': return '🔍';
      default: return '👤';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'CITIZEN': return 'ประชาชน';
      case 'AGENCY': return 'หน่วยงาน';
      case 'AUDITOR': return 'ผู้ตรวจสอบ';
      default: return '';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
             <View style={[styles.avatar, { backgroundColor: theme.colors.secondary, alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>
                  {displayUser.name.charAt(0)}
                </Text>
             </View>
             <View style={styles.roleBadgeContainer}>
                <Text style={styles.roleBadgeIcon}>{getRoleIcon(displayUser.role)}</Text>
             </View>
          </View>
          <Text style={styles.userName}>{displayUser.name}</Text>
          <View style={styles.roleTag}>
             <Text style={styles.roleTagText}>{getRoleLabel(displayUser.role)}</Text>
          </View>
          <Text style={styles.userEmail}>{displayUser.email}</Text>
          
          <TouchableOpacity style={styles.editProfileButton}>
             <Text style={styles.editProfileText}>{t('profile.edit_profile')}</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
             <Text style={styles.statValue}>{displayUser.stats.totalReports}</Text>
             <Text style={styles.statLabel}>{t('profile.total_cases')}</Text>
          </View>
          <View style={[styles.statBox, styles.statDivider]}>
             <Text style={styles.statValue}>{displayUser.stats.inProgress}</Text>
             <Text style={styles.statLabel}>{t('profile.in_progress')}</Text>
          </View>
          <View style={styles.statBox}>
             <Text style={styles.statValue}>{displayUser.stats.resolved}</Text>
             <Text style={styles.statLabel}>{t('profile.completed')}</Text>
          </View>
        </View>

        {/* Menu Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.sections.account')}</Text>
          <View style={styles.card}>
            <MenuItem icon="👤" label={t('profile.menu.personal_info')} />
            <MenuItem icon="🔔" label={t('profile.menu.notifications')} note="Push, Email" />
            <MenuItem icon="🌐" label={t('profile.menu.language')} note="Thai (ไทย)" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.sections.support')}</Text>
          <View style={styles.card}>
            <MenuItem icon="❓" label={t('profile.menu.help')} />
            <MenuItem icon="📝" label={t('profile.menu.terms')} />
            <MenuItem icon="🛡️" label={t('profile.menu.privacy')} />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.card}>
            <MenuItem 
              icon="🚪" 
              label={t('profile.menu.logout')} 
              color={theme.colors.danger?.base || '#EF4444'} 
              onPress={handleLogout}
            />
          </View>
        </View>

        <Text style={styles.versionText}>{t('app_name')} v1.0.0 (Alpha)</Text>
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
    padding: theme.spacing.md,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: theme.colors.surface,
  },
  roleBadgeContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.surface,
    padding: 6,
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  roleBadgeIcon: {
    fontSize: 14,
  },
  userName: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  roleTag: {
    backgroundColor: theme.colors.secondary + '15',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
  },
  roleTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.secondary,
  },
  userEmail: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: 6,
  },
  editProfileButton: {
    marginTop: theme.spacing.md,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.gray[100],
  },
  editProfileText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  statLabel: {
    fontSize: 10,
    color: theme.colors.text.secondary,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text.muted,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[50],
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  menuNote: {
    fontSize: 11,
    color: theme.colors.text.muted,
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 18,
    color: theme.colors.gray[300],
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: theme.colors.text.muted,
    marginVertical: theme.spacing.lg,
  },
});

export default ProfileScreen;
