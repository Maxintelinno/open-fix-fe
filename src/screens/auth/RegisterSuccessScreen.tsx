import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  Platform 
} from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { theme } from '../../theme';
import { CustomButton } from '../../components/CustomButton';
import { RootStackParamList } from '../../types';

const RegisterSuccessScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'RegisterSuccess'>>();
  const { role } = route.params;

  const isCitizen = role === 'CITIZEN';

  const handleAction = () => {
    // Navigate back to Login. 
    // For Citizen, the AuthContext should have already set userToken if handled in context
    // But since this is a mock flow, we just go back to Login for simplicity or let AuthContext handle state.
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const getTitle = () => {
    if (isCitizen) return 'ยินดีด้วย! สมัครสมาชิกสำเร็จ';
    return 'ส่งคำขอสมัครสมาชิกแล้ว';
  };

  const getDescription = () => {
    if (isCitizen) return 'บัญชี OpenFix ของคุณพร้อมใช้งานแล้ว\nคุณสามารถเริ่มแจ้งปัญหาและติดตามผลได้ทันที';
    if (role === 'AGENCY') return 'ขอบคุณที่ร่วมเป็นส่วนหนึ่งในการพัฒนาเมือง\nกรุณารอเจ้าหน้าที่ตรวจสอบความถูกต้องของข้อมูลหน่วยงาน โดยระบบจะแจ้งผลให้ทราบผ่านอีเมลที่ลงทะเบียนไว้';
    return 'คำขอของคุณอยู่ในระหว่างการพิจารณาในลำดับถัดไป\nกรุณารอการอนุมัติสิทธิ์การเข้าถึงข้อมูลผู้ตรวจสอบจากผู้ดูแลระบบ';
  };

  const getButtonText = () => {
    if (isCitizen) return 'เริ่มใช้งาน OpenFix';
    return 'กลับไปยังหน้าเข้าสู่ระบบ';
  };

  const getIcon = () => {
    if (isCitizen) return '🎉';
    if (role === 'AGENCY') return '🏢';
    return '🔍';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.illustrationWrap}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
          <View style={[styles.circle, styles.circle3]} />
          <View style={[styles.iconContainer, theme.shadows.lg]}>
            <Text style={styles.icon}>{getIcon()}</Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{getTitle()}</Text>
          <Text style={styles.description}>{getDescription()}</Text>
        </View>

        {!isCitizen && (
          <View style={styles.infoNote}>
            <Text style={styles.infoNoteText}>
              ⏱️ โดยปกติจะใช้เวลาตรวจสอบประมาณ 1-3 วันทำการ
            </Text>
          </View>
        )}

        <View style={styles.footer}>
          <CustomButton
            title={getButtonText()}
            onPress={handleAction}
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
    backgroundColor: theme.colors.surface,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationWrap: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: theme.colors.secondary,
  },
  circle1: {
    width: 200,
    height: 200,
    opacity: 0.05,
  },
  circle2: {
    width: 160,
    height: 160,
    opacity: 0.1,
  },
  circle3: {
    width: 120,
    height: 120,
    opacity: 0.15,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 28,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  icon: {
    fontSize: 40,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: -1,
  },
  description: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '500',
  },
  infoNote: {
    backgroundColor: theme.colors.gray[50],
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  infoNoteText: {
    fontSize: 13,
    color: theme.colors.text.muted,
    fontWeight: '600',
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 60 : 40,
  },
  button: {
    height: 64,
    borderRadius: 20,
  },
});

export default RegisterSuccessScreen;
