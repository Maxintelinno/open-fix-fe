import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  StatusBar,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { theme } from '../../theme';
import { CustomButton } from '../../components/CustomButton';
import { RoleCard } from '../../components/auth/RoleCard';
import { UserRole, RootStackParamList } from '../../types';

const RoleSelectionScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const roles = [
    {
      id: 'CITIZEN' as UserRole,
      title: 'ประชาชน (Citizen)',
      description: 'แจ้งปัญหาเชิงรุก ติดตามความคืบหน้า และประเมินความพึงพอใจการทำงานของหน่วยงาน',
      icon: '👤',
    },
    {
      id: 'AGENCY' as UserRole,
      title: 'หน่วยงานปฏิบัติ (Agency)',
      description: 'รับเรื่องร้องเรียน มอบหมายภารกิจ อัปเดตการดำเนินงาน และปิดเคสอย่างมีประสิทธิภาพ',
      icon: '🏢',
    },
    {
      id: 'AUDITOR' as UserRole,
      title: 'ผู้ตรวจสอบ (Auditor/NGO)',
      description: 'ตรวจสอบความโปร่งใส วิเคราะห์ความผิดปกติ และเข้าถึงข้อมูลสาธารณะ (Open Data)',
      icon: '🔍',
    },
  ];

  const handleContinue = () => {
    if (selectedRole) {
      navigation.navigate('Register', { role: selectedRole });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← กลับ</Text>
          </TouchableOpacity>
          
          <View style={styles.titleContainer}>
            <Text style={styles.stepText}>ขั้นตอนที่ 1 จาก 2</Text>
            <Text style={styles.title}>เลือกประเภทบัญชี</Text>
            <Text style={styles.subtitle}>
              สิทธิการเข้าถึงข้อมูลและฟีเจอร์ต่างๆ จะแตกต่างกันไปตามหน้าที่ความรับผิดชอบของคุณ
            </Text>
          </View>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              role={role.id}
              title={role.title}
              description={role.description}
              icon={role.icon}
              selected={selectedRole === role.id}
              onSelect={setSelectedRole}
            />
          ))}
          
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              💡 คุณสามารถเปลี่ยนประเภทบัญชีได้ภายหลังผ่านการติดต่อเจ้าหน้าที่ดูแลระบบ
            </Text>
          </View>
        </ScrollView>

        <View style={[styles.footer, theme.shadows.lg]}>
          <CustomButton
            title="ดำเนินการต่อ"
            onPress={handleContinue}
            disabled={!selectedRole}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: theme.colors.surface,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  backButton: {
    marginBottom: 20,
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text.secondary,
  },
  titleContainer: {
    marginTop: 4,
  },
  stepText: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: theme.colors.text.primary,
    marginBottom: 12,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.text.secondary,
    lineHeight: 22,
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 100,
  },
  infoBox: {
    backgroundColor: theme.colors.info.bg,
    padding: 16,
    borderRadius: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: theme.colors.info.base + '20',
  },
  infoText: {
    fontSize: 13,
    color: theme.colors.info.text,
    fontWeight: '600',
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  button: {
    height: 64,
    borderRadius: 20,
  },
});

export default RoleSelectionScreen;
