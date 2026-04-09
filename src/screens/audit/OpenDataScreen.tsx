import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  StatusBar,
  TextInput
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme';
import { SectionHeader } from '../../components/SectionHeader';
import { mockDatasets } from '../../data/mockData';

const OpenDataScreen: React.FC = () => {
  const { t } = useTranslation();
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.headerMain}>
          <View>
            <Text style={styles.title}>{t('audit.open_data.title')}</Text>
            <Text style={styles.subTitle}>คลังข้อมูลสาธารณะและความโปร่งใสภาครัฐ</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
            <Text style={styles.logoutIcon}>🚪</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput 
            style={styles.searchInput}
            placeholder="ค้นหาชุดข้อมูล..."
            placeholderTextColor={theme.colors.text.muted}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.categories}>
           <Text style={styles.sectionTitle}>หมวดหมู่ยอดนิยม</Text>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
              {['โครงสร้างพื้นฐาน', 'การบริหารจัดการ', 'ความปลอดภัย', 'สิ่งแวดล้อม'].map((cat, i) => (
                <TouchableOpacity key={i} style={styles.categoryChip}>
                   <Text style={styles.categoryText}>{cat}</Text>
                </TouchableOpacity>
              ))}
           </ScrollView>
        </View>

        <SectionHeader title="ชุดข้อมูลล่าสุด" />
        {mockDatasets.map((dataset) => (
          <TouchableOpacity key={dataset.id} style={styles.datasetCard}>
            <View style={styles.datasetHeader}>
               <View style={styles.iconBox}>
                  <Text style={styles.datasetIcon}>📊</Text>
               </View>
               <View style={styles.datasetMainInfo}>
                  <Text style={styles.datasetTitle} numberOfLines={2}>{dataset.title}</Text>
                  <Text style={styles.datasetAgency}>{dataset.agency}</Text>
               </View>
            </View>
            
            <View style={styles.metadata}>
               <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>ฟอร์แมต:</Text>
                  <View style={styles.formatBadge}>
                    <Text style={styles.formatText}>{dataset.format}</Text>
                  </View>
               </View>
               <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>อัปเดตเมื่อ:</Text>
                  <Text style={styles.metaValue}>{new Date(dataset.lastUpdated).toLocaleDateString('th-TH')}</Text>
               </View>
               <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>ดาวน์โหลด:</Text>
                  <Text style={styles.metaValue}>{(dataset.downloadCount ?? 0).toLocaleString()} ครั้ง</Text>
               </View>
            </View>

            <TouchableOpacity style={styles.downloadButton}>
               <Text style={styles.downloadText}>ดาวน์โหลดชุดข้อมูล</Text>
               <Text style={styles.downloadIcon}>📥</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        
        <View style={styles.apiPromo}>
           <View style={styles.apiIconBox}>
              <Text style={styles.apiIcon}>⚙️</Text>
           </View>
           <View style={styles.apiContent}>
              <Text style={styles.apiTitle}>OpenFix Developer API</Text>
              <Text style={styles.apiDesc}>เชื่อมต่อข้อมูลเรียลไทม์ผ่าน REST API สำหรับนักพัฒนา</Text>
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
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[50],
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  categories: {
    marginBottom: 24,
  },
  categoryScroll: {
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
    ...theme.shadows.sm,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.text.secondary,
  },
  datasetCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    ...theme.shadows.sm,
  },
  datasetHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: theme.colors.info.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datasetIcon: {
    fontSize: 24,
  },
  datasetMainInfo: {
    flex: 1,
  },
  datasetTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.text.primary,
    lineHeight: 22,
    marginBottom: 4,
  },
  datasetAgency: {
    fontSize: 12,
    color: theme.colors.text.muted,
    fontWeight: '600',
  },
  metadata: {
    backgroundColor: theme.colors.gray[50],
    borderRadius: 16,
    padding: 16,
    gap: 10,
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 12,
    color: theme.colors.text.muted,
    fontWeight: '600',
  },
  metaValue: {
    fontSize: 12,
    color: theme.colors.text.primary,
    fontWeight: '700',
  },
  formatBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  formatText: {
    fontSize: 10,
    fontWeight: '900',
    color: 'white',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary + '10',
    height: 48,
    borderRadius: 16,
    gap: 8,
  },
  downloadText: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  downloadIcon: {
    fontSize: 16,
  },
  apiPromo: {
    marginTop: 20,
    backgroundColor: theme.colors.text.primary,
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    ...theme.shadows.md,
  },
  apiIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  apiIcon: {
    fontSize: 20,
  },
  apiContent: {
    flex: 1,
  },
  apiTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    marginBottom: 4,
  },
  apiDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 18,
  },
});

export default OpenDataScreen;
