import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../types';
import { BottomTabNavigator } from './BottomTabNavigator';
import { AgencyTabNavigator } from './AgencyTabNavigator';
import { AuditTabNavigator } from './AuditTabNavigator';
import CaseDetailScreen from '../screens/citizen/CaseDetailScreen';
import AgencyCaseDetailScreen from '../screens/agency/AgencyCaseDetailScreen';
import AssignStaffScreen from '../screens/agency/AssignStaffScreen';
import AnomalyDetailScreen from '../screens/audit/AnomalyDetailScreen';
import ProvinceDetailScreen from '../screens/audit/ProvinceDetailScreen';
import ProvinceRankingScreen from '../screens/audit/ProvinceRankingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { user, userToken, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.secondary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {userToken == null ? (
          // AUTH STACK
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />
          </>
        ) : user?.role === 'AGENCY' ? (
          // AGENCY STACK
          <>
            <Stack.Screen name="AgencyTabs" component={AgencyTabNavigator} />
            <Stack.Screen 
              name="AgencyCaseDetail" 
              component={AgencyCaseDetailScreen} 
              options={{
                presentation: 'card',
              }}
            />
            <Stack.Screen 
              name="AssignStaff" 
              component={AssignStaffScreen} 
              options={{
                headerShown: false,
                presentation: 'modal',
              }}
            />
          </>
        ) : user?.role === 'AUDITOR' ? (
          // AUDIT STACK
          <>
            <Stack.Screen name="AuditTabs" component={AuditTabNavigator} />
            <Stack.Screen 
              name="AnomalyDetail" 
              component={AnomalyDetailScreen} 
              options={{
                presentation: 'card',
              }}
            />
            <Stack.Screen 
              name="ProvinceDetail" 
              component={ProvinceDetailScreen} 
              options={{
                presentation: 'card',
              }}
            />
            <Stack.Screen 
              name="ProvinceRankingList" 
              component={ProvinceRankingScreen} 
              options={{
                presentation: 'card',
              }}
            />
          </>
        ) : (
          // CITIZEN STACK
          <>
            <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
            <Stack.Screen 
              name="CaseDetail" 
              component={CaseDetailScreen} 
              options={{
                presentation: 'card',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
