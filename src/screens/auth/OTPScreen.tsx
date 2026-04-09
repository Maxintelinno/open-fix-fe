import React, { useState, useEffect } from 'react';
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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { theme } from '../../theme';
import { CustomButton } from '../../components/CustomButton';
import { RootStackParamList } from '../../types';
import { useAuth } from '../../context/AuthContext';

type OTPRouteProp = RouteProp<RootStackParamList, 'OTP'>;

const OTPScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute<OTPRouteProp>();
  const { signIn } = useAuth();
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerify = async () => {
    if (otp.length === 6) {
      setIsSubmitting(true);
      try {
        await signIn(phoneNumber);
        // Navigation is handled by RootNavigator observing userToken
      } catch (error) {
        console.error('Login failed', error);
      } finally {
        setIsSubmitting(false);
      }
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
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            <View style={styles.header}>
              <Text style={styles.title}>{t('auth.otp_title')}</Text>
              <Text style={styles.subtitle}>
                {t('auth.otp_subtitle', { phone: phoneNumber })}
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.otpGroup}>
                <TextInput
                  style={[styles.otpInput, { letterSpacing: 10 }]}
                  placeholder="------"
                  keyboardType="number-pad"
                  value={otp}
                  onChangeText={setOtp}
                  maxLength={6}
                  autoFocus
                />
              </View>

              <CustomButton
                title={t('auth.verify')}
                onPress={handleVerify}
                disabled={otp.length < 6 || isSubmitting}
                loading={isSubmitting}
                style={styles.button}
              />

              <TouchableOpacity style={styles.resendButton}>
                <Text style={styles.resendText}>{t('auth.resend')}</Text>
              </TouchableOpacity>
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
    paddingTop: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: theme.colors.text.primary,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.text.secondary,
    lineHeight: 22,
  },
  form: {
    width: '100%',
  },
  otpGroup: {
    marginBottom: 32,
    alignItems: 'center',
  },
  otpInput: {
    width: '100%',
    height: 70,
    backgroundColor: theme.colors.gray[50],
    borderRadius: 16,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  button: {
    height: 60,
    borderRadius: 16,
  },
  resendButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 14,
    color: theme.colors.secondary,
    fontWeight: '600',
  },
});

export default OTPScreen;
