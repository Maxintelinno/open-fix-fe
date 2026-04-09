import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList,
  TouchableOpacity,
  StatusBar,
  ScrollView
} from 'react-native';
import { theme } from '../../theme';
import { CaseStatus } from '../../types';
import { mockCases } from '../../data/mockData';
import { CaseCard } from '../../components/CaseCard';
import { EmptyState } from '../../components/EmptyState';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../types';
import { useTranslation } from 'react-i18next';

type MyCasesNavigationProp = BottomTabNavigationProp<MainTabParamList, 'MyCases'>;

const MyCasesScreen: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<CaseStatus | 'ALL'>('ALL');
  const navigation = useNavigation<MyCasesNavigationProp>();

  const tabs: { label: string; value: CaseStatus | 'ALL' }[] = [
    { label: t('cases.all'), value: 'ALL' },
    { label: t('cases.pending'), value: 'PENDING' },
    { label: t('cases.in_progress'), value: 'IN_PROGRESS' },
    { label: t('cases.completed'), value: 'COMPLETED' },
  ];

  const filteredCases = activeTab === 'ALL' 
    ? mockCases 
    : mockCases.filter(c => c.status === activeTab);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header Area */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('cases.title')}</Text>
        <Text style={styles.headerSubtitle}>{t('home.info_card')}</Text>
      </View>

      {/* Modern Filter Tabs */}
      <View style={styles.tabWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
          {tabs.map((tab) => (
            <TouchableOpacity 
              key={tab.value} 
              style={[
                styles.tab,
                activeTab === tab.value && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab.value)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab.value && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
              {activeTab === tab.value && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredCases}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CaseCard 
            item={item} 
            onPress={() => navigation.navigate('Map')} // Dummy nav for now
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title={t('cases.no_cases')}
            description={t('empty.no_results')}
            icon={activeTab === 'COMPLETED' ? '✅' : '📁'}
            actionLabel={t('home.quick_report')}
            onAction={() => navigation.navigate('Report')}
          />
        )}
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: theme.colors.surface,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  headerSubtitle: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    marginTop: 4,
  },
  tabWrapper: {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  tabScroll: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeTab: {
    // optional active container style
  },
  tabText: {
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.muted,
  },
  activeTabText: {
    color: theme.colors.secondary,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 12,
    right: 12,
    height: 3,
    backgroundColor: theme.colors.secondary,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  listContent: {
    padding: 20,
    paddingBottom: 120,
  },
});

export default MyCasesScreen;
