import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView, 
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { theme } from '../../theme';
import { mockCases } from '../../data/mockData';
import { ComplaintCard } from '../../components/agency/ComplaintCard';
import { RootStackParamList, CaseStatus } from '../../types';

const AssignedScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<'ALL' | CaseStatus>('ALL');
  
  // Filter for cases that are NOT in PENDING status (Assigned)
  const assignedCases = mockCases.filter(c => c.status !== 'PENDING' || c.assignedStaffId !== undefined);

  const filteredCases = activeTab === 'ALL' 
    ? assignedCases 
    : assignedCases.filter(c => c.status === activeTab);

  const tabs = [
    { id: 'ALL', label: t('agency.assigned.status_all') },
    { id: 'IN_PROGRESS', label: t('agency.assigned.status_processing') },
    { id: 'COMPLETED', label: t('agency.assigned.status_done') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('agency.assigned.title')}</Text>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity 
            key={tab.id} 
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id as any)}
          >
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredCases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ComplaintCard 
            item={item} 
            onPress={() => navigation.navigate('AgencyCaseDetail', { caseId: item.id })}
            showStaff={true}
            onAction={() => navigation.navigate('AgencyCaseDetail', { caseId: item.id })}
            actionLabel={t('agency.assigned.update_status')}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📝</Text>
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  activeTab: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  activeTabText: {
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

export default AssignedScreen;
