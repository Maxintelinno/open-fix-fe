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
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { theme } from '../../theme';
import { mockProvinces } from '../../data/mockData';
import { RootStackParamList } from '../../types';
import { MetricCard } from '../../components/audit/MetricCard';
import { SectionHeader } from '../../components/SectionHeader';

type ProvinceDetailRouteProp = RouteProp<RootStackParamList, 'ProvinceDetail'>;

const ProvinceDetailScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute<ProvinceDetailRouteProp>();
  const navigation = useNavigation();
  const { provinceId } = route.params;
  
  const item = mockProvinces.find(p => p.id === provinceId) || mockProvinces[0];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{item.name}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
         <View style={styles.kpiGrid}>
            <MetricCard 
              label="เรื่องร้องเรียน" 
              value={item.totalComplaints.toLocaleString()} 
              icon="📥" 
              color={theme.colors.info.base}
            />
            <MetricCard 
              label="SLA Compliance" 
              value={`${item.slaCompliance}%`} 
              icon="⏱️" 
              color={theme.colors.success.base}
            />
            <MetricCard 
              label="เวลาเฉลี่ย" 
              value={`${item.avgResolutionHours} ชม.`} 
              icon="⌛" 
              color={theme.colors.primary}
            />
            <MetricCard 
              label="คะแนนความพึงพอใจ" 
              value={item.satisfactionScore} 
              icon="⭐" 
              color={theme.colors.warning.base}
            />
         </View>

         <SectionHeader title="แนวโน้มการเปลี่ยนแปลง (Trends)" />
         <View style={styles.chartPlaceholder}>
            <View style={styles.lineMock} />
            <Text style={styles.placeholderText}>กราฟแนวโน้มแสดงสถิติย้อนหลัง 6 เดือน</Text>
         </View>

         <SectionHeader 
           title="หน่วยงานในพื้นที่" 
           actionLabel={t('home.view_all')} 
           onAction={() => {}} 
         />
         <View style={styles.listCard}>
            <View style={styles.listItem}>
               <Text style={styles.itemName}>กองช่าง เทศบาลนคร{item.name}</Text>
               <Text style={styles.itemValue}>SLA 94%</Text>
            </View>
            <View style={styles.listItem}>
               <Text style={styles.itemName}>ฝ่ายปกครอง จังหวัด{item.name}</Text>
               <Text style={styles.itemValue}>SLA 91%</Text>
            </View>
            <View style={styles.listItem}>
               <Text style={styles.itemName}>การไฟฟ้าส่วนภูมิภาค ({item.name})</Text>
               <Text style={styles.itemValue}>SLA 85%</Text>
            </View>
         </View>

         <SectionHeader title="ประเภทปัญหาหลักในพื้นที่" />
         <View style={styles.categoryGrid}>
            <View style={styles.catItem}>
               <Text style={styles.catLabel}>ถนน/ทางเท้า</Text>
               <Text style={styles.catValue}>42%</Text>
            </View>
            <View style={styles.catItem}>
               <Text style={styles.catLabel}>ขยะ/ความสะอาด</Text>
               <Text style={styles.catValue}>28%</Text>
            </View>
            <View style={styles.catItem}>
               <Text style={styles.catLabel}>น้ำท่วม</Text>
               <Text style={styles.catValue}>15%</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.surface,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: theme.colors.text.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  chartPlaceholder: {
    height: 180,
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    marginTop: 12,
    marginBottom: 24,
    ...theme.shadows.sm,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  lineMock: {
    width: '100%',
    height: 2,
    backgroundColor: theme.colors.primary + '20',
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 12,
    color: theme.colors.text.muted,
  },
  listCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 16,
    marginTop: 12,
    marginBottom: 24,
    ...theme.shadows.sm,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[50],
  },
  itemName: {
    fontSize: 14,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  itemValue: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.success.text,
  },
  categoryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  catItem: {
    width: '31%',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  catLabel: {
    fontSize: 10,
    color: theme.colors.text.muted,
    marginBottom: 4,
    textAlign: 'center',
  },
  catValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default ProvinceDetailScreen;
