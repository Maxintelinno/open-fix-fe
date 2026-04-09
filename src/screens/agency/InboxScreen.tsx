import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { theme } from '../../theme';
import { mockCases } from '../../data/mockData';
import { ComplaintCard } from '../../components/agency/ComplaintCard';
import { RootStackParamList } from '../../types';

const InboxScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter for PENDING cases (Inbox)
  const incomingCases = mockCases.filter(c => c.status === 'PENDING');

  const filteredCases = incomingCases.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.location.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('agency.inbox.title')}</Text>
        <Text style={styles.headerSubtitle}>{t('agency.inbox.subtitle')}</Text>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={t('common.search')}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterChips}>
        <View style={[styles.chip, styles.activeChip]}>
          <Text style={[styles.chipText, styles.activeChipText]}>{t('cases.all')}</Text>
        </View>
        <View style={styles.chip}>
          <Text style={styles.chipText}>{t('agency.common.high')}</Text>
        </View>
        <View style={styles.chip}>
          <Text style={styles.chipText}>{t('agency.inbox.not_assigned')}</Text>
        </View>
      </View>

      <FlatList
        data={filteredCases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ComplaintCard 
            item={item} 
            onPress={() => navigation.navigate('AgencyCaseDetail', { caseId: item.id })}
            onAction={() => navigation.navigate('AssignStaff', { caseId: item.id })}
            actionLabel={t('agency.inbox.assign')}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📂</Text>
            <Text style={styles.emptyText}>{t('empty.no_results')}</Text>
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
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginTop: 4,
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text.primary,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  filterIcon: {
    fontSize: 18,
  },
  filterChips: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    marginRight: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  activeChip: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  activeChipText: {
    color: theme.colors.text.white,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.text.muted,
  },
});

export default InboxScreen;
