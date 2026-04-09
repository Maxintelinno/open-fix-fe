import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AgencyTabParamList } from '../types';
import { theme } from '../theme';

// Screens
import InboxScreen from '../screens/agency/InboxScreen';
import AssignedScreen from '../screens/agency/AssignedScreen';
import DashboardScreen from '../screens/agency/DashboardScreen';
import MapScreen from '../screens/agency/MapScreen';
import SettingsScreen from '../screens/agency/SettingsScreen';

const Tab = createBottomTabNavigator<AgencyTabParamList>();

const TabBarIcon = ({ icon, focused, label }: { icon: string, focused: boolean, label: string }) => (
  <View style={styles.iconContainer}>
    <Text style={[styles.iconText, focused && styles.iconActive]}>{icon}</Text>
    <Text style={[styles.labelText, focused && styles.labelActive]}>{label}</Text>
  </View>
);

export const AgencyTabNavigator = () => {
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
        name="Inbox" 
        component={InboxScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="📥" focused={focused} label={t('agency.nav.inbox')} />
          ),
        }}
      />
      <Tab.Screen 
        name="Assigned" 
        component={AssignedScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="💼" focused={focused} label={t('agency.nav.assigned')} />
          ),
        }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="📈" focused={focused} label={t('agency.nav.dashboard')} />
          ),
        }}
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="🗺️" focused={focused} label={t('agency.nav.map')} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon="⚙️" focused={focused} label={t('agency.nav.settings')} />
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
    color: theme.colors.secondary,
  },
});
