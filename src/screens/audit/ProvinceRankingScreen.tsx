import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  StatusBar
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { RankingCard } from '../../components/audit/RankingCard';
import { mockProvinces } from '../../data/mockData';

type SortOption = 'complaints' | 'sla' | 'satisfaction';

const ProvinceRankingScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('complaints');

  const filteredAndSortedProvinces = useMemo(() => {
    let result = [...mockProvinces];
    
    if (searchQuery) {
      result = result.filter(p => p.name.includes(searchQuery));
    }
    
    result.sort((a, b) => {
      if (sortBy === 'complaints') return b.totalComplaints - a.totalComplaints;
      if (sortBy === 'sla') return b.slaCompliance - a.slaCompliance;
      if (sortBy === 'satisfaction') return b.satisfactionScore - a.satisfactionScore;
      return 0;
    });
    
    return result;
  }, [searchQuery, sortBy]);

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="ค้นหาชื่อจังหวัด..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={theme.colors.text.muted}
        />
      </View>
      
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>จัดเรียงตามลำดับ:</Text>
        <View style={styles.sortOptions}>
           <SortChip 
             label="เรื่องร้องเรียน" 
             active={sortBy === 'complaints'} 
             onPress={() => setSortBy('complaints')} 
           />
           <SortChip 
             label="เป้าหมาย SLA" 
             active={sortBy === 'sla'} 
             onPress={() => setSortBy('sla')} 
           />
           <SortChip 
             label="ความพึงพอใจ" 
             active={sortBy === 'satisfaction'} 
             onPress={() => setSortBy('satisfaction')} 
           />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>การจัดลำดับภูมิภาค</Text>
          <Text style={styles.subTitle}>ประสิทธิภาพการจัดการความขัดแย้งเชิงพื้นที่</Text>
        </View>
      </View>

      <FlatList
        data={filteredAndSortedProvinces}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item, index }) => (
          <RankingCard
            rank={index + 1}
            name={item.name}
            score={
              sortBy === 'complaints' 
                ? item.totalComplaints.toLocaleString() 
                : sortBy === 'sla' 
                  ? item.slaCompliance + '%' 
                  : item.satisfactionScore
            }
            subValue={
              sortBy === 'complaints' 
                ? 'เรื่องร้องเรียนสะสม' 
                : sortBy === 'sla' 
                  ? 'ความสำเร็จตาม SLA' 
                  : 'คะแนนจากภาคประชาชน'
            }
            trend={item.trend}
            onPress={() => navigation.navigate('ProvinceDetail', { provinceId: item.id })}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📍</Text>
            <Text style={styles.emptyText}>ไม่พบข้อมูลจังหวัดที่คุณร่วมตรวจสอบ</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const SortChip: React.FC<{ label: string, active: boolean, onPress: () => void }> = ({ label, active, onPress }) => (
  <TouchableOpacity 
    style={[styles.sortChip, active && styles.activeSortChip]} 
    onPress={onPress}
  >
    <Text style={[styles.sortChipText, active && styles.activeSortChipText]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    backgroundColor: theme.colors.surface,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 20,
    color: theme.colors.text.primary,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.text.primary,
    letterSpacing: -0.5,
  },
  subTitle: {
    fontSize: 11,
    color: theme.colors.text.muted,
    fontWeight: '600',
  },
  headerContent: {
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[50],
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  filterSection: {
    marginBottom: 8,
  },
  filterLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.text.muted,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  sortOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  sortChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    ...theme.shadows.sm,
  },
  activeSortChip: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  sortChipText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    fontWeight: '700',
  },
  activeSortChipText: {
    color: 'white',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  emptyContainer: {
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

export default ProvinceRankingScreen;
