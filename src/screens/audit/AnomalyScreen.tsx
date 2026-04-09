import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  StatusBar,
  FlatList
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme';
import { AnomalyCard } from '../../components/audit/AnomalyCard';
import { mockAnomalies } from '../../data/mockData';

const AnomalyScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.headerMain}>
          <View>
            <Text style={styles.title}>{t('audit.anomaly.title')}</Text>
            <Text style={styles.subTitle}>ตรวจพบโดยระบบ AI และการวิเคราะห์แพทเทิร์น</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.badgeCount}>
               <Text style={styles.badgeText}>🔥 7 ใหม่</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
               <Text style={styles.logoutIcon}>🚪</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.summaryGrid}>
         <View style={[styles.summaryCard, { borderBottomColor: theme.colors.danger.base, borderBottomWidth: 3 }]}>
            <Text style={[styles.summaryValue, { color: theme.colors.danger.base }]}>2</Text>
            <Text style={styles.summaryLabel}>{t('audit.anomaly.severity.high')}</Text>
         </View>
         <View style={[styles.summaryCard, { borderBottomColor: theme.colors.warning.base, borderBottomWidth: 3 }]}>
            <Text style={[styles.summaryValue, { color: theme.colors.warning.base }]}>5</Text>
            <Text style={styles.summaryLabel}>{t('audit.anomaly.severity.medium')}</Text>
         </View>
         <View style={[styles.summaryCard, { borderBottomColor: theme.colors.info.base, borderBottomWidth: 3 }]}>
            <Text style={[styles.summaryValue, { color: theme.colors.info.base }]}>12</Text>
            <Text style={styles.summaryLabel}>{t('audit.anomaly.severity.low')}</Text>
         </View>
      </View>

      <View style={styles.filterSection}>
         <FlatList
           horizontal
           showsHorizontalScrollIndicator={false}
           data={['all', 'high', 'medium', 'low']}
           contentContainerStyle={styles.filterList}
           renderItem={({ item }) => (
             <TouchableOpacity style={[styles.filterTab, item === 'all' && styles.activeTab]}>
                <Text style={[styles.filterTabText, item === 'all' && styles.activeTabText]}>
                  {item === 'all' ? t('cases.all') : t(`audit.anomaly.severity.${item}`)}
                </Text>
             </TouchableOpacity>
           )}
         />
      </View>

      <FlatList
        data={mockAnomalies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AnomalyCard 
            item={item} 
            onPress={() => navigation.navigate('AnomalyDetail', { anomalyId: item.id })}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
             <Text style={styles.emptyIcon}>✅</Text>
             <Text style={styles.emptyText}>ไม่พบสัญญาณผิดปกติเพิ่มเติมในขณะนี้</Text>
          </View>
        }
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
  headerMain: {
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  badgeCount: {
    backgroundColor: theme.colors.danger.bg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.danger.text,
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
  summaryGrid: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '900',
  },
  summaryLabel: {
    fontSize: 10,
    color: theme.colors.text.muted,
    marginTop: 4,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  filterSection: {
    marginBottom: 8,
  },
  filterList: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  activeTab: {
    backgroundColor: theme.colors.danger.base,
    borderColor: theme.colors.danger.base,
  },
  filterTabText: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    fontWeight: '700',
  },
  activeTabText: {
    color: 'white',
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  emptyState: {
    padding: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    color: theme.colors.text.muted,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default AnomalyScreen;
