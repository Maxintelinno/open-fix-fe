import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Dimensions,
  StatusBar
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme';
import { mockKPIs } from '../../data/mockData';
import { KPIBox } from '../../components/agency/KPIBox';

const { width } = Dimensions.get('window');

const DashboardScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('agency.dashboard.title')}</Text>
          <View style={styles.dateSelector}>
            <Text style={styles.dateText}>เมษายน 2569</Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </View>
        </View>

        <View style={styles.kpiGrid}>
          <View style={styles.kpiRow}>
            <KPIBox 
              label={t('agency.dashboard.total')} 
              value={mockKPIs.totalCases} 
              icon="📊" 
              trend="+12%" 
            />
            <KPIBox 
              label={t('agency.dashboard.completed')} 
              value={mockKPIs.completedCases} 
              icon="✅" 
              trend="+5%"
              color={theme.colors.success.base}
            />
          </View>
          <View style={styles.kpiRow}>
            <KPIBox 
              label={t('agency.dashboard.in_progress')} 
              value={mockKPIs.inProgressCases} 
              icon="⚙️" 
              color={theme.colors.warning.base}
            />
            <KPIBox 
              label={t('agency.dashboard.citizen_rating')} 
              value={`${mockKPIs.citizenRating}/5`} 
              icon="⭐️" 
              color="#F59E0B"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('agency.dashboard.sla_compliance')}</Text>
          <View style={[styles.card, theme.shadows.sm]}>
            <View style={styles.slaHeader}>
              <Text style={styles.slaValue}>{mockKPIs.slaCompliance}%</Text>
              <Text style={styles.slaLabel}>เป้าหมาย: 90%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${mockKPIs.slaCompliance}%` }]} />
            </View>
            <Text style={styles.slaDescription}>
              การจัดการปัญหาภายในเวลาที่กำหนดรักษาระดับได้ดีขึ้นกว่าเดือนที่แล้ว 2.4%
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('agency.dashboard.by_category')}</Text>
          <View style={[styles.card, theme.shadows.sm]}>
            {[
              { label: t('categories.road'), value: 85, color: '#3B82F6' },
              { label: t('categories.lighting'), value: 64, color: '#F59E0B' },
              { label: t('categories.garbage'), value: 42, color: '#10B981' },
              { label: t('categories.drainage'), value: 24, color: '#6366F1' },
            ].map((item, idx) => (
              <View key={idx} style={styles.statRow}>
                <View style={styles.statLabelContainer}>
                   <View style={[styles.statDot, { backgroundColor: item.color }]} />
                   <Text style={styles.statLabelText}>{item.label}</Text>
                </View>
                <Text style={styles.statValueText}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footerSpacing} />
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
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  dateText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text.secondary,
    marginRight: 8,
  },
  calendarIcon: {
    fontSize: 14,
  },
  kpiGrid: {
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  slaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  slaValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
  slaLabel: {
    fontSize: 12,
    color: theme.colors.text.muted,
    marginBottom: 6,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: theme.colors.gray[100],
    borderRadius: 5,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.secondary,
    borderRadius: 5,
  },
  slaDescription: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[50],
  },
  statLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  statLabelText: {
    fontSize: 14,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  statValueText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  footerSpacing: {
    height: 80,
  },
});

export default DashboardScreen;
