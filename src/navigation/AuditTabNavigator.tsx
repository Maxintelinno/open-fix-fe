import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AuditTabParamList } from '../types';
import { theme } from '../theme';

// Screens
import OverviewScreen from '../screens/audit/OverviewScreen';
import AnalyticsScreen from '../screens/audit/AnalyticsScreen';
import AnomalyScreen from '../screens/audit/AnomalyScreen';
import RankingScreen from '../screens/audit/RankingScreen';
import OpenDataScreen from '../screens/audit/OpenDataScreen';

const Tab = createBottomTabNavigator<AuditTabParamList>();

const TabBarIcon = ({ icon, focused, label }: { icon: string, focused: boolean, label: string }) => (
  <View style={styles.iconContainer}>
    <Text style={[styles.iconText, focused && styles.iconActive]}>{icon}</Text>
    <Text style={[styles.labelText, focused && styles.labelActive]}>{label}</Text>
  </View>
);

export const AuditTabNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen 
        name="Overview" 
        component={OverviewScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="📊" focused={focused} label={t('audit.nav.overview')} />
          ),
        }}
      />
      <Tab.Screen 
        name="Analytics" 
        component={AnalyticsScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="📈" focused={focused} label={t('audit.nav.analytics')} />
          ),
        }}
      />
      <Tab.Screen 
        name="Anomaly" 
        component={AnomalyScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="⚠️" focused={focused} label={t('audit.nav.anomaly')} />
          ),
        }}
      />
      <Tab.Screen 
        name="Ranking" 
        component={RankingScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="🏆" focused={focused} label={t('audit.nav.ranking')} />
          ),
        }}
      />
      <Tab.Screen 
        name="OpenData" 
        component={OpenDataScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="📂" focused={focused} label={t('audit.nav.open_data')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 85,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
    position: 'absolute',
    bottom: 0,
    elevation: 0,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
  },
  iconText: {
    fontSize: 22,
    marginBottom: 4,
    opacity: 0.5,
  },
  iconActive: {
    opacity: 1,
  },
  labelText: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.text.muted,
  },
  labelActive: {
    color: theme.colors.primary,
  },
});
