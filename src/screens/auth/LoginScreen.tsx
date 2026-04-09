import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { theme } from '../../theme';
import { CustomButton } from '../../components/CustomButton';
import { RootStackParamList } from '../../types';

const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendOTP = () => {
    if (phoneNumber.length >= 10) {
      navigation.navigate('OTP', { phoneNumber });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoEmoji}>🛡️</Text>
              </View>
              <Text style={styles.title}>{t('app_name')}</Text>
              <Text style={styles.subtitle}>{t('auth.login_subtitle')}</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('auth.phone_label')}</Text>
                <View style={[styles.inputContainer, theme.shadows.sm]}>
                  <Text style={styles.prefix}>🇹🇭 +66</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={t('auth.phone_placeholder')}
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    maxLength={10}
                  />
                </View>
              </View>

              <CustomButton
                title={t('auth.get_otp')}
                onPress={handleSendOTP}
                disabled={phoneNumber.length < 10}
                style={styles.button}
              />
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                {t('tagline')}
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.secondary + '10',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoEmoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.secondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[50],
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 60,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  prefix: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  button: {
    height: 60,
    borderRadius: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: theme.colors.text.muted,
  },
});

export default LoginScreen;
