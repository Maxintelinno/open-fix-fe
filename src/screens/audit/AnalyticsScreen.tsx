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
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme';
import { SectionHeader } from '../../components/SectionHeader';
import { ChartPlaceholder } from '../../components/audit/ChartPlaceholder';
import { mockProvinces, mockAgencyMetrics } from '../../data/mockData';

const { width } = Dimensions.get('window');

const FilterChip: React.FC<{ label: string, active?: boolean }> = ({ label, active }) => (
  <TouchableOpacity style={[styles.filterChip, active && styles.activeChip]}>
    <Text style={[styles.filterChipText, active && styles.activeChipText]}>{label}</Text>
  </TouchableOpacity>
);

const AnalyticsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <View>
            <Text style={styles.title}>{t('audit.analytics.title')}</Text>
            <Text style={styles.subTitle}>การวิเคราะห์เชิงลึกและเกณฑ์มาตรฐาน</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
            <Text style={styles.logoutIcon}>🚪</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
           <FilterChip label="ทั้งหมด" active />
           <FilterChip label="จังหวัด" />
           <FilterChip label="หน่วยงาน" />
           <FilterChip label="ประเภทปัญหา" />
           <FilterChip label="ไตรมาส" />
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
         <View style={styles.mainInsights}>
            <View style={styles.insightCard}>
               <View style={styles.insightHeader}>
                  <Text style={styles.insightIcon}>⚡️</Text>
                  <Text style={styles.insightLabel}>{t('audit.analytics.fastest_provinces')}</Text>
               </View>
               <Text style={styles.insightValue}>ชลบุรี</Text>
               <View style={styles.barContainer}>
                  <View style={[styles.bar, { width: '94%', backgroundColor: theme.colors.success.base }]} />
               </View>
               <Text style={styles.insightSub}>เฉลี่ย 42 ชั่วโมง (SLA 94%)</Text>
            </View>

            <View style={[styles.insightCard, { backgroundColor: theme.colors.danger.bg + '30' }]}>
               <View style={styles.insightHeader}>
                  <Text style={styles.insightIcon}>🐢</Text>
                  <Text style={styles.insightLabel}>{t('audit.analytics.highest_avg_time')}</Text>
               </View>
               <Text style={styles.insightValue}>กฟผ. (เชียงใหม่)</Text>
               <View style={styles.barContainer}>
                  <View style={[styles.bar, { width: '82%', backgroundColor: theme.colors.danger.base }]} />
               </View>
               <Text style={styles.insightSub}>เฉลี่ย 72 ชั่วโมง (SLA 82%)</Text>
            </View>
         </View>

         <SectionHeader title="เปรียบเทียบเวลาดำเนินการเฉลี่ย (ชั่วโมง)" />
         <View style={styles.chartBlock}>
            {mockProvinces.slice(0, 5).map((p, i) => (
              <View key={p.id} style={styles.chartRow}>
                 <Text style={styles.rowLabel}>{p.name}</Text>
                 <View style={styles.rowBarArea}>
                    <View style={styles.rowBarBg}>
                       <View style={[styles.rowBar, { width: `${(p.avgResolutionHours / 80) * 100}%` }]} />
                    </View>
                    <Text style={styles.rowValue}>{p.avgResolutionHours}h</Text>
                 </View>
              </View>
            ))}
         </View>

         <SectionHeader title="แนวโน้มระยะยาว (Monthly Trends)" />
         <ChartPlaceholder label="เทรนด์ระยะเวลาดำเนินการรายเดือน (Year-to-Date)" />

         <SectionHeader title="หน่วยงานที่มี SLA Compliance ต่ำสุด" />
         <View style={styles.listSection}>
           {mockAgencyMetrics.slice(0, 4).map((item) => (
             <View key={item.id} style={styles.metricItem}>
                <View style={[styles.indicator, { backgroundColor: item.slaCompliance < 85 ? theme.colors.danger.base : theme.colors.warning.base }]} />
                <View style={styles.itemMain}>
                   <Text style={styles.itemName}>{item.name}</Text>
                   <Text style={styles.itemSub}>{item.province}</Text>
                </View>
                <View style={styles.itemValueArea}>
                   <Text style={[styles.itemValue, { color: item.slaCompliance < 85 ? theme.colors.danger.text : theme.colors.warning.text }]}>
                     {item.slaCompliance}%
                   </Text>
                   <Text style={styles.itemValueLabel}>SLA Compliance</Text>
                </View>
             </View>
           ))}
         </View>

         <View style={styles.benchmarkingCard}>
            <View style={styles.benchHeader}>
               <Text style={styles.benchTitle}>เกณฑ์มาตรฐาน (Benchmarking)</Text>
               <View style={styles.targetBadge}>
                  <Text style={styles.targetBadgeText}>เป้าหมาย: 48 ชม.</Text>
               </View>
            </View>
            <View style={styles.benchContent}>
               <View style={styles.benchStats}>
                  <Text style={styles.benchMainVal}>67.2 ชม.</Text>
                  <Text style={styles.benchDelta}>+40% ABOVE TARGET</Text>
               </View>
               <Text style={styles.benchDesc}>ปัจจุบันภาพรวมประเทศใช้เวลาเฉลี่ยสูงกว่าเกณฑ์มาตรฐาน จำเป็นต้องลดลง 19.2 ชม. เพื่อบรรลุเป้าหมายตามยุทธศาสตร์</Text>
            </View>
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
  filterSection: {
    backgroundColor: theme.colors.surface,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  filterScroll: {
    paddingHorizontal: 24,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: theme.colors.gray[50],
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  activeChip: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipText: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    fontWeight: '600',
  },
  activeChipText: {
    color: 'white',
    fontWeight: '800',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  mainInsights: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  insightCard: {
    width: '48%',
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    ...theme.shadows.sm,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  insightIcon: {
    fontSize: 14,
  },
  insightLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.text.muted,
    textTransform: 'uppercase',
  },
  insightValue: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  barContainer: {
    height: 6,
    backgroundColor: theme.colors.gray[100],
    borderRadius: 3,
    marginBottom: 8,
  },
  bar: {
    height: '100%',
    borderRadius: 3,
  },
  insightSub: {
    fontSize: 10,
    color: theme.colors.text.secondary,
    fontWeight: '600',
  },
  chartBlock: {
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: 24,
    marginTop: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
    ...theme.shadows.sm,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  rowLabel: {
    width: 65,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.text.secondary,
  },
  rowBarArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  rowBarBg: {
    flex: 1,
    height: 14,
    backgroundColor: theme.colors.gray[50],
    borderRadius: 7,
    overflow: 'hidden',
  },
  rowBar: {
    height: '100%',
    backgroundColor: theme.colors.secondary,
    borderRadius: 7,
  },
  rowValue: {
    marginLeft: 10,
    width: 35,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.primary,
    textAlign: 'right',
  },
  listSection: {
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: 16,
    marginTop: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
    ...theme.shadows.sm,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[50],
  },
  indicator: {
    width: 5,
    height: 40,
    borderRadius: 3,
    marginRight: 16,
  },
  itemMain: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.text.primary,
  },
  itemSub: {
    fontSize: 11,
    color: theme.colors.text.muted,
    marginTop: 4,
    fontWeight: '600',
  },
  itemValueArea: {
    alignItems: 'flex-end',
  },
  itemValue: {
    fontSize: 18,
    fontWeight: '900',
  },
  itemValueLabel: {
    fontSize: 10,
    color: theme.colors.text.muted,
    fontWeight: '600',
  },
  benchmarkingCard: {
    backgroundColor: theme.colors.primary,
    padding: 24,
    borderRadius: 24,
    ...theme.shadows.md,
  },
  benchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  benchTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
  },
  targetBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  targetBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },
  benchContent: {
    gap: 12,
  },
  benchStats: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
  },
  benchMainVal: {
    fontSize: 32,
    fontWeight: '900',
    color: 'white',
    letterSpacing: -1,
  },
  benchDelta: {
    fontSize: 11,
    fontWeight: '900',
    color: theme.colors.danger.bg,
  },
  benchDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 20,
    fontWeight: '500',
  },
});

export default AnalyticsScreen;
