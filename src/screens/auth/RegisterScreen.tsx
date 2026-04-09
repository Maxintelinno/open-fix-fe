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

  const isCitizen = role === 'CITIZEN';
  const isAgency = role === 'AGENCY';
  const isAuditor = role === 'AUDITOR';

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
    employeeId: '',
    organizationName: '',
    auditExpertise: '',
    purposeOfUse: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Partial<Record<keyof typeof form, string>> = {};

    if (!form.fullName) newErrors.fullName = 'กรุณากรอกชื่อ-นามสกุลจริง';
    if (!form.phone) newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์';
    else if (form.phone.length < 10) newErrors.phone = 'เบอร์โทรศัพท์ต้องมี 10 หลัก';
    
    // For citizen, email is optional but suggested
    if (!isCitizen && !form.email) {
      newErrors.email = 'กรุณากรอกอีเมลติดต่องาน';
    } else if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }

    if (!form.username) newErrors.username = 'กรุณากำหนดชื่อผู้ใช้';
    if (!form.password) newErrors.password = 'กรุณากำหนดรหัสผ่าน';
    else if (form.password.length < 6) newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    }

    if (isAgency) {
      if (!form.agencyName) newErrors.agencyName = 'กรุณาระบุชื่อหน่วยงาน';
      if (!form.position) newErrors.position = 'กรุณาระบุตำแหน่ง';
      if (!form.employeeId) newErrors.employeeId = 'กรุณาระบุรหัสพนักงาน';
    }

    if (isAuditor) {
      if (!form.organizationName) newErrors.organizationName = 'กรุณาระบุชื่อองค์กร';
      if (!form.purposeOfUse) newErrors.purposeOfUse = 'กรุณาระบุวัตถุประสงค์การใช้ข้อมูล';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) {
       Alert.alert('ข้อมูลไม่ครบถ้วน', 'กรุณาตรวจสอบความถูกต้องของข้อมูล');
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

    if (isAgency) {
      payload.agencyName = form.agencyName;
      payload.department = form.department;
      payload.position = form.position;
      payload.employeeId = form.employeeId;
    }

    if (isAuditor) {
      payload.organizationName = form.organizationName;
      payload.auditExpertise = form.auditExpertise;
      payload.purposeOfUse = form.purposeOfUse;
    }

    try {
      const result = await register(payload);
      if (result.success) {
        navigation.navigate('RegisterSuccess', { role });
      } else {
        Alert.alert('สมัครสมาชิกไม่สำเร็จ', result.error);
      }
    } catch (e) {
      Alert.alert('ข้อผิดพลาด', 'เกิดเหตุขัดข้อง กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  const SectionHeader = ({ title, icon, color }: { title: string, icon: string, color?: string }) => (
    <View style={styles.sectionHeader}>
      <View style={[styles.sectionIconBg, { backgroundColor: color || theme.colors.primary + '10' }]}>
        <Text style={styles.sectionIcon}>{icon}</Text>
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isAuditor && styles.containerAuditor]}>
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
              <View style={[
                  styles.roleTag, 
                  isAgency && styles.roleTagAgency,
                  isAuditor && styles.roleTagAuditor
              ]}>
                 <Text style={[
                     styles.roleTagText,
                     isAgency && styles.roleTagTextAgency,
                     isAuditor && styles.roleTagTextAuditor
                 ]}>
                     {isCitizen ? 'Citizen Registration' : isAgency ? 'Official Agency' : 'Audit Representative'}
                 </Text>
              </View>
              <Text style={styles.title}>
                 {isCitizen ? 'สมัครใช้งาน' : isAgency ? 'ลงทะเบียนเจ้าหน้าที่' : 'คำขอสิทธิ์ตรวจสอบ'}
              </Text>
              <Text style={styles.subtitle}>
                 {isCitizen ? 'ร่วมสร้างสรรค์เมืองให้น่าอยู่ด้วยกัน' : isAgency ? 'ช่องทางสำหรับหน่วยงานรัฐและผู้ช่วยปฏิบัติงาน' : 'ช่องทางสำหรับองค์กรอิสระ สื่อ และประชาชนผู้มีส่วนร่วม'}
              </Text>
            </View>
          </View>

          <View style={styles.form}>
            <SectionHeader 
               title="ข้อมูลยืนยันตัวตน" 
               icon="👤" 
               color={isAgency ? theme.colors.primary + '20' : isAuditor ? theme.colors.secondary + '20' : undefined} 
            />
            
            <FormInput
              label="ชื่อ-นามสกุลจริง"
              placeholder="Ex. สมชาย รักดี"
              value={form.fullName}
              onChangeText={(text) => setForm({...form, fullName: text})}
              error={errors.fullName}
              icon="📛"
            />

            <FormInput
              label="เบอร์โทรศัพท์สำหรับใช้งาน"
              placeholder="0XXXXXXXXX"
              value={form.phone}
              onChangeText={(text) => setForm({...form, phone: text})}
              keyboardType="phone-pad"
              maxLength={10}
              error={errors.phone}
              icon="📱"
            />

            {(isAgency || isAuditor) && (
              <FormInput
                label="อีเมลปฏิบัติงาน"
                placeholder="your.work@email.com"
                value={form.email}
                onChangeText={(text) => setForm({...form, email: text})}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
                icon="📧"
              />
            )}

            {isAgency && (
              <>
                <View style={styles.divider} />
                <SectionHeader title="ข้อมูลตำแหน่งหน้าที่" icon="🏢" color={theme.colors.info.base + '20'} />
                
                <FormInput
                  label="สังกัดหน่วยงาน"
                  placeholder="เช่น กทม. (เขตปทุมวัน)"
                  value={form.agencyName}
                  onChangeText={(text) => setForm({...form, agencyName: text})}
                  error={errors.agencyName}
                  icon="🏛️"
                />

                <FormInput
                  label="รหัสพนักงาน/เจ้าหน้าที่"
                  placeholder="Employee ID / Badge Number"
                  value={form.employeeId}
                  onChangeText={(text) => setForm({...form, employeeId: text})}
                  error={errors.employeeId}
                  icon="🆔"
                />

                <FormInput
                  label="ตำแหน่งงานปัจจุบัน"
                  placeholder="เช่น วิศวกรโยธา"
                  value={form.position}
                  onChangeText={(text) => setForm({...form, position: text})}
                  error={errors.position}
                  icon="👔"
                />
              </>
            )}

            {isAuditor && (
              <>
                <View style={styles.divider} />
                <SectionHeader title="รายละเอียดการตรวจสอบ" icon="⚖️" color={theme.colors.secondary + '20'} />
                
                <FormInput
                  label="องค์กร / สื่อ / กลุ่มสังกัด"
                  placeholder="เช่น เพจปฏิบัติการหมาเฝ้าบ้าน"
                  value={form.organizationName}
                  onChangeText={(text) => setForm({...form, organizationName: text})}
                  error={errors.organizationName}
                  icon="🔍"
                />

                <FormInput
                  label="ความเชี่ยวชาญการตรวจสอบ"
                  placeholder="เช่น เผยแพร่ข้อมูล, วิเคราะห์งบประมาณ"
                  value={form.auditExpertise}
                  onChangeText={(text) => setForm({...form, auditExpertise: text})}
                  icon="🛡️"
                />

                <FormInput
                  label="วัตถุประสงค์การใช้ข้อมูล"
                  placeholder="เพื่อส่งเสริมความโปร่งใสในโครงการ..."
                  value={form.purposeOfUse}
                  onChangeText={(text) => setForm({...form, purposeOfUse: text})}
                  error={errors.purposeOfUse}
                  icon="📝"
                />
              </>
            )}

            <View style={styles.divider} />
            <SectionHeader title="กำหนดความปลอดภัย" icon="🔐" />
            
            <FormInput
              label="Username"
              placeholder="ตัวย่ออังกฤษหรือเบอร์โทร"
              value={form.username}
              onChangeText={(text) => setForm({...form, username: text})}
              autoCapitalize="none"
              error={errors.username}
              icon="🆔"
            />

            <FormInput
              label="รหัสผ่านเข้าใช้งาน"
              placeholder="ความยาว 6 ตัวอักษรขึ้นไป"
              value={form.password}
              onChangeText={(text) => setForm({...form, password: text})}
              secureTextEntry
              error={errors.password}
              icon="🔑"
            />

            <FormInput
              label="ยืนยันรหัสผ่านอีกครั้ง"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChangeText={(text) => setForm({...form, confirmPassword: text})}
              secureTextEntry
              error={errors.confirmPassword}
              icon="✅"
            />

            <View style={styles.footerSpacing} />

            <CustomButton
              title={isCitizen ? "สมัครสมาชิกเสร็จสิ้น" : "ส่งคำขอลงทะเบียน"}
              onPress={handleRegister}
              loading={isSubmitting}
              style={[
                  styles.submitButton,
                  isAgency && styles.submitButtonAgency,
                  isAuditor && styles.submitButtonAuditor
              ]}
            />
            
            <View style={styles.termsBox}>
               <Text style={styles.termsText}>
                 โดยการกดสมัคร คุณยอมรับ <Text style={styles.termsLink}>ข้อตกลงและนโยบายความเป็นส่วนตัว</Text> ของ OpenFix
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
    backgroundColor: '#FBFDFF',
  },
  containerAuditor: {
    backgroundColor: '#FCFCFE',
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
    marginBottom: 20,
    paddingVertical: 4,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text.secondary,
    opacity: 0.7,
  },
  titleWrapper: {},
  title: {
    fontSize: 34,
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
    opacity: 0.8,
  },
  roleTag: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary + '10',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 10,
  },
  roleTagAgency: {
    backgroundColor: theme.colors.primary,
  },
  roleTagAuditor: {
    backgroundColor: theme.colors.secondary,
  },
  roleTagText: {
    fontSize: 10,
    fontWeight: '900',
    color: theme.colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  roleTagTextAgency: {
    color: '#FFF',
  },
  roleTagTextAuditor: {
    color: '#FFF',
  },
  form: {
    width: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 4,
  },
  sectionIconBg: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sectionIcon: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.text.primary,
    letterSpacing: -0.3,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.gray[100],
    marginVertical: 24,
    opacity: 0.5,
  },
  footerSpacing: {
    height: 20,
  },
  submitButton: {
    height: 64,
    borderRadius: 20,
    marginTop: 10,
  },
  submitButtonAgency: {
    backgroundColor: theme.colors.primary,
  },
  submitButtonAuditor: {
    backgroundColor: theme.colors.secondary,
  },
  termsBox: {
    marginTop: 22,
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
    color: theme.colors.text.primary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
