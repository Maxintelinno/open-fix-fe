import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '../theme';
import { MainTabParamList } from '../types';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

// Import Screens
import HomeScreen from '../screens/citizen/HomeScreen';
import ReportScreen from '../screens/citizen/ReportScreen';
import MapScreen from '../screens/citizen/MapScreen';
import MyCasesScreen from '../screens/citizen/MyCasesScreen';
import ProfileScreen from '../screens/citizen/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabIcon = ({ name, color, focused }: { name: string; color: string; focused: boolean }) => {
  const getIcon = (tabName: string) => {
    switch (tabName) {
      case 'Home': return '🏠';
      case 'Report': return '➕';
      case 'Map': return '🗺️';
      case 'MyCases': return '📋';
      case 'Profile': return '👤';
      default: return '❓';
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
      <Text style={{ fontSize: 20, color: focused ? theme.colors.secondary : theme.colors.gray[400] }}>
        {getIcon(name)}
      </Text>
    </View>
  );
};

export const BottomTabNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, focused }) => <TabIcon name={route.name} color={color} focused={focused} />,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.gray[400],
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.gray[100],
          height: 90,
          paddingBottom: 30,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ tabBarLabel: t('nav.home') }} 
      />
      <Tab.Screen 
        name="Report" 
        component={ReportScreen} 
        options={{ tabBarLabel: t('nav.report') }} 
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen} 
        options={{ tabBarLabel: t('nav.map') }} 
      />
      <Tab.Screen 
        name="MyCases" 
        component={MyCasesScreen} 
        options={{ tabBarLabel: t('nav.my_cases') }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarLabel: t('nav.profile') }} 
      />
    </Tab.Navigator>
  );
};
