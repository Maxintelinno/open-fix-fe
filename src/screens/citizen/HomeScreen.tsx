import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../theme';
import { mockUser, mockCases } from '../../data/mockData';
import { SummaryCard } from '../../components/SummaryCard';
import { SectionHeader } from '../../components/SectionHeader';
import { CaseCard } from '../../components/CaseCard';
import { CustomButton } from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { RootStackParamList, MainTabParamList } from '../../types';
import { useTranslation } from 'react-i18next';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { t } = useTranslation();

  const renderRecentCases = () => {
    return mockCases.slice(0, 3).map((item) => (
      <CaseCard
        key={item.id}
        item={item}
        onPress={() => navigation.navigate('CaseDetail', { caseId: item.id })}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>{t('home.greeting')},</Text>
          <Text style={styles.userNameText}>{mockUser.name} 👋</Text>
        </View>
        <TouchableOpacity style={[styles.avatarContainer, theme.shadows.sm]}>
          <Text style={styles.avatarLabel}>{mockUser.name.charAt(0)}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={[styles.heroCard, theme.shadows.primary]}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{t('app_name')}</Text>
            <Text style={styles.heroSubtitle}>{t('home.info_card')}</Text>
            <CustomButton
              title={t('home.quick_report')}
              onPress={() => navigation.navigate('Report')}
              style={styles.heroButton}
              textStyle={styles.heroButtonText}
            />
          </View>
          <View style={styles.heroIconContainer}>
            <Text style={styles.heroEmoji}>📢</Text>
          </View>
        </View>

        {/* Statistics Grid */}
        <SectionHeader title={t('home.my_summary')} />
        <View style={styles.statsGrid}>
          <SummaryCard
            label={t('home.pending')}
            count={mockUser.stats.totalReports - mockUser.stats.resolved}
            type="pending"
            onPress={() => navigation.navigate('MyCases')}
          />
          <SummaryCard
            label={t('home.in_progress')}
            count={mockUser.stats.inProgress}
            type="in_progress"
          />
          <SummaryCard
            label={t('home.completed')}
            count={mockUser.stats.resolved}
            type="resolved"
          />
        </View>

        {/* Quick Actions */}
        <SectionHeader title={t('nav.map')} />
        <View style={styles.actionGrid}>
          <TouchableOpacity
            style={[styles.actionCard, theme.shadows.sm]}
            onPress={() => navigation.navigate('Map')}
          >
            <View style={[styles.actionIconOuter, { backgroundColor: '#EEF2FF' }]}>
              <Text style={styles.actionEmoji}>🗺️</Text>
            </View>
            <Text style={styles.actionName}>{t('map.nearby')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, theme.shadows.sm]}
            onPress={() => navigation.navigate('MyCases')}
          >
            <View style={[styles.actionIconOuter, { backgroundColor: '#ECFDF5' }]}>
              <Text style={styles.actionEmoji}>📋</Text>
            </View>
            <Text style={styles.actionName}>{t('nav.my_cases')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, theme.shadows.sm]}
          >
            <View style={[styles.actionIconOuter, { backgroundColor: '#FFF7ED' }]}>
              <Text style={styles.actionEmoji}>🛡️</Text>
            </View>
            <Text style={styles.actionName}>{t('app_name')}</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Cases */}
        <SectionHeader
          title={t('home.recent_cases')}
          actionLabel={t('home.view_all')}
          onAction={() => navigation.navigate('MyCases')}
        />
        {renderRecentCases()}

        <View style={styles.spacer} />
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  greetingText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  userNameText: {
    fontSize: 22,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  avatarLabel: {
    color: theme.colors.text.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  scrollContent: {
    padding: 20,
  },
  heroCard: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  heroContent: {
    flex: 1,
    marginRight: 10,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.text.white,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    lineHeight: 18,
    fontWeight: theme.typography.fontWeight.medium,
  },
  heroButton: {
    backgroundColor: theme.colors.surface,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  },
  heroButtonText: {
    color: theme.colors.secondary,
    fontSize: 14,
    fontWeight: '800',
  },
  heroIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionCard: {
    backgroundColor: theme.colors.surface,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
    width: '30%',
  },
  actionIconOuter: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  actionEmoji: {
    fontSize: 24,
  },
  actionName: {
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  spacer: {
    height: 40,
  },
});

export default HomeScreen;
