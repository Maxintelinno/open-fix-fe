import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  ScrollView
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { theme } from '../../theme';
import { CustomButton } from '../../components/CustomButton';
import { FormInput } from '../../components/auth/FormInput';
import { RootStackParamList } from '../../types';
import { useAuth } from '../../context/AuthContext';

const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { signIn } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);

  const handleLogin = async () => {
    if (!identifier || !password) {
      setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setUserNotFound(false);

    try {
      const result = await signIn(identifier, password);
      if (!result.success) {
        setError(result.error || 'เข้าสู่ระบบไม่สำเร็จ');
        if (result.error?.includes('ไม่พบบัญชี')) {
          setUserNotFound(true);
        }
      }
    } catch (e) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate('RoleSelection');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <View style={[styles.logoCircle, theme.shadows.md]}>
                <Text style={styles.logoEmoji}>🏙️</Text>
              </View>
              <Text style={styles.welcomeText}>ยินดีต้อนรับกลับมา</Text>
              <Text style={styles.title}>{t('app_name')}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Smart Civic Platform</Text>
              </View>
            </View>

            <View style={styles.form}>
              <FormInput
                label="ชื่อผู้ใช้ หรือ เบอร์โทรศัพท์"
                placeholder="ชื่อผู้ใช้ของคุณ"
                value={identifier}
                onChangeText={(text) => {
                  setIdentifier(text);
                  setError('');
                }}
                autoCapitalize="none"
                icon="👤"
              />

              <FormInput
                label="รหัสผ่าน"
                placeholder="รหัสผ่านของคุณ"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError('');
                }}
                secureTextEntry
                icon="🔐"
              />

              {error ? (
                <View style={[styles.errorCard, userNotFound && styles.errorCardNotFound]}>
                  <Text style={styles.errorText}>
                    {userNotFound ? '🔍 ' : '⚠️ '}
                    {error}
                  </Text>
                  {userNotFound && (
                    <TouchableOpacity style={styles.registerCTA} onPress={handleRegister}>
                      <Text style={styles.registerCTAText}>สมัครสมาชิกเลนตอนนี้ →</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : null}

              <CustomButton
                title="เข้าสู่ระบบ"
                onPress={handleLogin}
                loading={isSubmitting}
                style={styles.loginButton}
              />

              <TouchableOpacity style={styles.forgotPass}>
                <Text style={styles.forgotPassText}>ลืมรหัสผ่านใช่ไหม?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>หรือ</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.registerSection}>
              <Text style={styles.noAccountText}>ยังไม่ได้เป็นสมาชิก OpenFix?</Text>
              <TouchableOpacity style={styles.registerSection} onPress={handleRegister}>
                <Text style={styles.registerLinkText}>สมัครสมาชิกที่นี่</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                {t('tagline')}
              </Text>
              <Text style={styles.versionText}>Version 1.0.0 (MVP)</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 44,
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 32,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  logoEmoji: {
    fontSize: 44,
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: theme.colors.text.primary,
    marginBottom: 12,
    letterSpacing: -1,
  },
  badge: {
    backgroundColor: theme.colors.primary + '10',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.primary,
    textTransform: 'uppercase',
  },
  form: {
    width: '100%',
  },
  errorCard: {
    backgroundColor: theme.colors.danger.bg,
    padding: 16,
    borderRadius: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.colors.danger.base + '20',
  },
  errorCardNotFound: {
    backgroundColor: theme.colors.secondary + '05',
    borderColor: theme.colors.secondary + '20',
  },
  errorText: {
    color: theme.colors.danger.text,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 20,
  },
  registerCTA: {
    marginTop: 12,
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  registerCTAText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '800',
  },
  loginButton: {
    height: 64,
    borderRadius: 20,
    marginTop: 8,
  },
  forgotPass: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPassText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  line: {
    flex: 1,
    height: 1.5,
    backgroundColor: theme.colors.gray[200],
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text.muted,
  },
  registerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  noAccountText: {
    fontSize: 15,
    color: theme.colors.text.secondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  registerLink: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  registerLinkText: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.secondary,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: theme.colors.text.muted,
    fontWeight: '600',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 10,
    color: theme.colors.text.muted,
    opacity: 0.6,
  },
});

export default LoginScreen;
