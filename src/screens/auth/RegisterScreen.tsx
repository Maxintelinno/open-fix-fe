import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  StatusBar,
  Alert,
  TouchableOpacity
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { theme } from '../../theme';
import { CustomButton } from '../../components/CustomButton';
import { FormInput } from '../../components/auth/FormInput';
import { RootStackParamList, RegisterPayload } from '../../types';
import { useAuth } from '../../context/AuthContext';

const RegisterScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Register'>>();
  const { role } = route.params;
  const { register } = useAuth();

  const [form, setForm] = useState({
    fullName: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agencyName: '',
    department: '',
    position: '',
    organizationName: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Partial<Record<keyof typeof form, string>> = {};

    if (!form.fullName) newErrors.fullName = 'กรุณากรอกชื่อ-นามสกุลจริง';
    if (!form.username) newErrors.username = 'กรุณากำหนดชื่อผู้ใช้';
    
    if (!form.phone) newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์';
    else if (form.phone.length < 10) newErrors.phone = 'เบอร์โทรศัพท์ต้องมี 10 หลัก';
    
    if (!form.email) newErrors.email = 'กรุณากรอกอีเมล';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';

    if (!form.password) newErrors.password = 'กรุณากำหนดรหัสผ่าน';
    else if (form.password.length < 6) newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    }

    if (role === 'AGENCY') {
      if (!form.agencyName) newErrors.agencyName = 'กรุณาระบุชื่อหน่วยงาน';
      if (!form.position) newErrors.position = 'กรุณาระบุตำแหน่งของคุณ';
    }

    if (role === 'AUDITOR') {
      if (!form.organizationName) newErrors.organizationName = 'กรุณาระบุชื่อองค์กร/สังกัด';
      if (!form.position) newErrors.position = 'กรุณาระบุตำแหน่งของคุณ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) {
       Alert.alert('ข้อมูลไม่ครบถ้วน', 'กรุณาตรวจสอบข้อมูลที่ระบุอีกครั้ง');
       return;
    }

    setIsSubmitting(true);

    const payload: RegisterPayload = {
      fullName: form.fullName,
      username: form.username,
      phone: form.phone,
      email: form.email,
      password: form.password,
      role: role,
    };

    if (role === 'AGENCY') {
      payload.agencyName = form.agencyName;
      payload.department = form.department;
      payload.position = form.position;
    }

    if (role === 'AUDITOR') {
      payload.organizationName = form.organizationName;
      payload.position = form.position;
    }

    try {
      const result = await register(payload);
      if (result.success) {
        navigation.navigate('RegisterSuccess', { role });
      } else {
        Alert.alert('สมัครสมาชิกไม่สำเร็จ', result.error);
      }
    } catch (e) {
      Alert.alert('ข้อผิดพลาด', 'ระบบขัดข้อง กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleTitle = () => {
    switch(role) {
      case 'CITIZEN': return 'บัญชีประชาชน';
      case 'AGENCY': return 'บัญชีเจ้าหน้าที่หน่วยงาน';
      case 'AUDITOR': return 'บัญชีผู้ตรวจสอบ';
      default: return '';
    }
  };

  const SectionHeader = ({ title, icon }: { title: string, icon: string }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionIcon}>{icon}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>← ย้อนกลับ</Text>
            </TouchableOpacity>
            
            <View style={styles.titleWrapper}>
              <View style={styles.roleTag}>
                 <Text style={styles.roleTagText}>{getRoleTitle()}</Text>
              </View>
              <Text style={styles.title}>สร้างบัญชีผู้ใช้งาน</Text>
              <Text style={styles.subtitle}>กรุณากรอกข้อมูลให้ครบถ้วนเพื่อประสิทธิภาพในการใช้งานสูงสุด</Text>
            </View>
          </View>

          <View style={styles.form}>
            <SectionHeader title="ข้อมูลส่วนตัว" icon="👤" />
            <FormInput
              label="ชื่อ-นามสกุล"
              placeholder="กรอกชื่อและนามสกุลจริง"
              value={form.fullName}
              onChangeText={(text) => setForm({...form, fullName: text})}
              error={errors.fullName}
              icon="📛"
            />

            <FormInput
              label="เบอร์โทรศัพท์"
              placeholder="0XXXXXXXXX"
              value={form.phone}
              onChangeText={(text) => setForm({...form, phone: text})}
              keyboardType="phone-pad"
              maxLength={10}
              error={errors.phone}
              icon="📱"
            />

            <FormInput
              label="อีเมล"
              placeholder="yourname@example.com"
              value={form.email}
              onChangeText={(text) => setForm({...form, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              icon="📧"
            />

            {(role === 'AGENCY' || role === 'AUDITOR') && (
              <>
                <View style={styles.divider} />
                <SectionHeader 
                   title={role === 'AGENCY' ? "ข้อมูลหน่วยงาน" : "ข้อมูลสังกัด"} 
                   icon={role === 'AGENCY' ? "🏢" : "🔍"} 
                />
                
                {role === 'AGENCY' && (
                  <FormInput
                    label="ชื่อหน่วยงาน"
                    placeholder="เช่น สำนักงานเขตลาดพร้าว"
                    value={form.agencyName}
                    onChangeText={(text) => setForm({...form, agencyName: text})}
                    error={errors.agencyName}
                    icon="🏛️"
                  />
                )}

                {role === 'AUDITOR' && (
                  <FormInput
                    label="ชื่อองค์กร / สังกัด"
                    placeholder="เช่น เพจปฏิบัติการหมาเฝ้าบ้าน"
                    value={form.organizationName}
                    onChangeText={(text) => setForm({...form, organizationName: text})}
                    error={errors.organizationName}
                    icon="🔎"
                  />
                )}

                <FormInput
                  label="ตำแหน่งงาน"
                  placeholder="ตำแหน่งปัจจุบันของคุณ"
                  value={form.position}
                  onChangeText={(text) => setForm({...form, position: text})}
                  error={errors.position}
                  icon="👔"
                />

                <View style={styles.helperNote}>
                  <Text style={styles.helperText}>
                    💡 บัญชี {role === 'AGENCY' ? 'เจ้าหน้าที่' : 'ผู้ตรวจสอบ'} จะต้องผ่านการอนุมัติจากผู้ดูแลระบบก่อน จึงจะสามารถเริ่มใช้งานฟีเจอร์ระดับสูงได้
                  </Text>
                </View>
              </>
            )}

            <View style={styles.divider} />
            <SectionHeader title="การเข้าสู่ระบบ" icon="🔐" />
            
            <FormInput
              label="ชื่อผู้ใช้ (Username)"
              placeholder="อังกฤษหรือตัวเลขสำหรับเข้าสู่ระบบ"
              value={form.username}
              onChangeText={(text) => setForm({...form, username: text})}
              autoCapitalize="none"
              error={errors.username}
              icon="🆔"
            />

            <FormInput
              label="รหัสผ่าน"
              placeholder="อย่างน้อย 6 ตัวอักษร"
              value={form.password}
              onChangeText={(text) => setForm({...form, password: text})}
              secureTextEntry
              error={errors.password}
              icon="🔑"
            />

            <FormInput
              label="ยืนยันรหัสผ่าน"
              placeholder="กรอกรหัสผ่านอีกครั้ง"
              value={form.confirmPassword}
              onChangeText={(text) => setForm({...form, confirmPassword: text})}
              secureTextEntry
              error={errors.confirmPassword}
              icon="✅"
            />

            <View style={styles.footerSpacing} />

            <CustomButton
              title="สร้างบัญชีผู้ใช้งาน"
              onPress={handleRegister}
              loading={isSubmitting}
              style={styles.submitButton}
            />
            
            <View style={styles.termsBox}>
               <Text style={styles.termsText}>
                 ในการกดสร้างบัญชี คุณยอมรับ <Text style={styles.termsLink}>ข้อตกลงการใช้งาน</Text> และ <Text style={styles.termsLink}>นโยบายความเป็นส่วนตัว</Text> ของ OpenFix
               </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    marginBottom: 24,
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text.secondary,
  },
  titleWrapper: {
    marginTop: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: theme.colors.text.primary,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.text.secondary,
    lineHeight: 22,
    marginTop: 8,
    fontWeight: '500',
  },
  roleTag: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.secondary + '10',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  roleTagText: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.secondary,
    textTransform: 'uppercase',
  },
  form: {
    width: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.text.primary,
    letterSpacing: -0.5,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.gray[100],
    marginVertical: 24,
  },
  helperNote: {
    backgroundColor: theme.colors.warning.bg,
    padding: 18,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: theme.colors.warning.base + '20',
  },
  helperText: {
    fontSize: 13,
    color: theme.colors.warning.text,
    fontWeight: '600',
    lineHeight: 20,
  },
  footerSpacing: {
    height: 12,
  },
  submitButton: {
    height: 64,
    borderRadius: 20,
    marginTop: 12,
  },
  termsBox: {
    marginTop: 20,
    paddingHorizontal: 12,
  },
  termsText: {
    fontSize: 12,
    color: theme.colors.text.muted,
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '500',
  },
  termsLink: {
    color: theme.colors.secondary,
    fontWeight: '700',
  },
});

export default RegisterScreen;
