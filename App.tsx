import React from 'react';
import './src/i18n';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
