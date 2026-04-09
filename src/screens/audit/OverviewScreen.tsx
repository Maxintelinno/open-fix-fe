import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  StatusBar
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme';
import { MetricCard } from '../../components/audit/MetricCard';
import { SectionHeader } from '../../components/SectionHeader';
import { ChartPlaceholder } from '../../components/audit/ChartPlaceholder';
import { mockAuditKPIs, mockProvinces } from '../../data/mockData';

const { width } = Dimensions.get('window');

const OverviewScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.pageHeader}>
          <View>
            <Text style={styles.pageTitle}>{t('audit.overview.title')}</Text>
            <Text style={styles.pageSubTitle}>สรุปผลการดำเนินงานระดับประเทศ</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.dateSelector}>
               <Text style={styles.dateText}>เมษายน 2569 ▾</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
               <Text style={styles.logoutIcon}>🚪</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero KPI Card */}
        <View style={styles.heroCard}>
           <View style={styles.heroContent}>
              <Text style={styles.heroLabel}>{t('audit.overview.total_complaints')}</Text>
              <Text style={styles.heroValue}>{mockAuditKPIs.totalComplaints.toLocaleString()}</Text>
              <View style={styles.heroFooter}>
                 <View style={styles.heroTrend}>
                    <Text style={styles.heroTrendText}>📈 +12% จากเดือนที่แล้ว</Text>
                 </View>
                 <Text style={styles.heroStatus}>สถานะ: ปกติ</Text>
              </View>
           </View>
           <View style={styles.heroDecoration}>
              <View style={styles.heroCircle} />
           </View>
        </View>

        <View style={styles.kpiGrid}>
           <MetricCard 
             label={t('audit.overview.suspicious')} 
             value={mockAuditKPIs.suspiciousClosures} 
             icon="⚠️" 
             trend="+5"
             color={theme.colors.danger.base}
             onPress={() => navigation.navigate('Anomaly')}
           />
           <MetricCard 
             label={t('agency.dashboard.sla_compliance')} 
             value={`${mockAuditKPIs.slaCompliance}%`} 
             icon="⏱️" 
             color={theme.colors.success.base}
           />
           <MetricCard 
             label={t('agency.dashboard.citizen_rating')} 
             value={mockAuditKPIs.avgSatisfactionScore} 
             icon="⭐️" 
             color={theme.colors.warning.base}
           />
           <MetricCard 
             label={t('audit.overview.resolved')} 
             value={mockAuditKPIs.completedCases.toLocaleString()} 
             icon="✅" 
             color={theme.colors.info.base}
           />
        </View>

        <SectionHeader title={t('audit.overview.nationwide_heatmap')} />
        <ChartPlaceholder label="แผนที่ความหนาแน่นปัญหา (Geospatial Analysis)" />

        <SectionHeader 
          title={t('audit.overview.top_provinces')} 
          actionLabel={t('home.view_all')} 
          onAction={() => navigation.navigate('ProvinceRankingList')} 
        />
        <View style={styles.rankingList}>
          {mockProvinces.slice(0, 3).map((province, index) => (
            <TouchableOpacity 
              key={province.id} 
              style={styles.listItem}
              onPress={() => navigation.navigate('ProvinceDetail', { provinceId: province.id })}
            >
               <View style={[
                 styles.rankBadge, 
                 index === 0 && { backgroundColor: '#FFD70020' },
                 index === 1 && { backgroundColor: '#C0C0C030' },
                 index === 2 && { backgroundColor: '#CD7F3220' },
               ]}>
                  <Text style={styles.rankNumber}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                  </Text>
               </View>
               <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{province.name}</Text>
                  <Text style={styles.itemSubName}>{province.totalComplaints.toLocaleString()} เรื่อง</Text>
               </View>
               <View style={styles.itemMetric}>
                  <Text style={styles.metricValue}>{province.satisfactionScore}</Text>
                  <Text style={styles.metricLabel}>คะแนน</Text>
               </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSection}>
           <TouchableOpacity 
             style={styles.promoCard}
             onPress={() => navigation.navigate('OpenData')}
           >
              <View style={styles.promoContent}>
                <Text style={styles.promoTitle}>การเปิดเผยข้อมูลสาธารณะ</Text>
                <Text style={styles.promoDesc}>OpenFix สนับสนุนความโปร่งใสผ่าน Open Data และ API</Text>
                <View style={styles.promoBadge}>
                  <Text style={styles.promoBadgeText}>ดู 24 ชุดข้อมูลล่าสุด</Text>
                </View>
              </View>
              <Text style={styles.promoIcon}>📂</Text>
           </TouchableOpacity>
        </View>
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
    paddingBottom: 100,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.text.primary,
    letterSpacing: -0.5,
  },
  pageSubTitle: {
    fontSize: 12,
    color: theme.colors.text.muted,
    marginTop: 2,
    fontWeight: '600',
  },
  dateSelector: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
    ...theme.shadows.sm,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  heroCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    flexDirection: 'row',
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  heroContent: {
    flex: 1,
    zIndex: 1,
  },
  heroLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    marginBottom: 8,
  },
  heroValue: {
    fontSize: 36,
    fontWeight: '800',
    color: 'white',
    letterSpacing: -1,
    marginBottom: 16,
  },
  heroFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTrend: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  heroTrendText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  heroStatus: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    fontWeight: '600',
  },
  heroDecoration: {
    position: 'absolute',
    right: -40,
    top: -40,
  },
  heroCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rankingList: {
    marginTop: 4,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
    ...theme.shadows.sm,
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  itemSubName: {
    fontSize: 12,
    color: theme.colors.text.muted,
    marginTop: 2,
    fontWeight: '500',
  },
  itemMetric: {
    alignItems: 'flex-end',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.secondary,
  },
  metricLabel: {
    fontSize: 10,
    color: theme.colors.text.muted,
    fontWeight: '600',
  },
  bottomSection: {
    marginTop: 12,
  },
  promoCard: {
    backgroundColor: theme.colors.text.primary,
    padding: 24,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    ...theme.shadows.md,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: 'white',
    marginBottom: 8,
  },
  promoDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 16,
    lineHeight: 18,
  },
  promoBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  promoBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },
  promoIcon: {
    fontSize: 40,
    opacity: 0.2,
  },
});

export default OverviewScreen;
