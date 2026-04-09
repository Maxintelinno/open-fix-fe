import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  StatusBar,
  FlatList
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme';
import { RankingCard } from '../../components/audit/RankingCard';
import { mockProvinces, mockAgencyMetrics } from '../../data/mockData';

const RankingScreen: React.FC = () => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const [tab, setTab] = useState<'province' | 'agency'>('province');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <View>
            <Text style={styles.title}>{t('audit.ranking.title')}</Text>
            <Text style={styles.subTitle}>การจัดลำดับศักยภาพและการดำเนินงานภูมิภาค</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
            <Text style={styles.logoutIcon}>🚪</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabSection}>
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, tab === 'province' && styles.activeTab]}
            onPress={() => setTab('province')}
          >
            <Text style={[styles.tabText, tab === 'province' && styles.activeTabText]}>
              {t('audit.ranking.by_province')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, tab === 'agency' && styles.activeTab]}
            onPress={() => setTab('agency')}
          >
            <Text style={[styles.tabText, tab === 'agency' && styles.activeTabText]}>
              {t('audit.ranking.by_agency')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sortSection}>
         <Text style={styles.sortLabel}>เกณฑ์การวัดผล</Text>
         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortScroll}>
            {['SLA Compliance', 'Response Time', 'Citizen Satisfaction'].map((label, i) => (
              <TouchableOpacity key={i} style={[styles.sortChip, i === 0 && styles.activeSort]}>
                 <Text style={[styles.sortChipText, i === 0 && styles.activeSortText]}>{label} ▾</Text>
              </TouchableOpacity>
            ))}
         </ScrollView>
      </View>

      <FlatList
        data={tab === 'province' ? mockProvinces : mockAgencyMetrics}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <RankingCard 
            rank={index + 1}
            name={item.name}
            score={tab === 'province' ? (item as any).slaCompliance + '%' : (item as any).slaCompliance + '%'}
            subValue={tab === 'province' ? `${(item as any).totalComplaints.toLocaleString()} เรื่อง` : (item as any).province}
            trend={(item as any).trend}
            onPress={() => {}}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 24,
    backgroundColor: theme.colors.surface,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.text.primary,
    letterSpacing: -0.5,
  },
  subTitle: {
    fontSize: 12,
    color: theme.colors.text.muted,
    marginTop: 4,
    fontWeight: '600',
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.danger.bg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.1)',
  },
  logoutIcon: {
    fontSize: 18,
  },
  tabSection: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.gray[50],
    padding: 4,
    borderRadius: 14,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: 'white',
    ...theme.shadows.sm,
  },
  tabText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: '800',
  },
  sortSection: {
    padding: 20,
  },
  sortLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.text.muted,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  sortScroll: {
    gap: 8,
  },
  sortChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
    backgroundColor: theme.colors.surface,
  },
  activeSort: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '08',
  },
  sortChipText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    fontWeight: '600',
  },
  activeSortText: {
    color: theme.colors.primary,
    fontWeight: '800',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
});

export default RankingScreen;
