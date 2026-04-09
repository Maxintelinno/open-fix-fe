import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  Platform,
  ScrollView 
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
  const isAgency = role === 'AGENCY';
  const isAuditor = role === 'AUDITOR';

  const handleAction = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const getTitle = () => {
    if (isCitizen) return 'ยินดีด้วย!\nเริ่มใช้งานได้ทันที';
    if (isAgency) return 'ได้รับข้อมูลการสมัคร\nของเจ้าหน้าที่แล้ว';
    return 'ส่งคำขอพิจารณา\nสิทธิ์เข้าถึงข้อมูลแล้ว';
  };

  const getDescription = () => {
    if (isCitizen) return 'เราได้สร้างบัญชีของคุณเรียบร้อยแล้ว\nร่วมเปิดโลกใบใหม่ในการพัฒนาเมืองไปด้วยกัน';
    if (isAgency) return 'ระบบได้รับข้อมูลลำดับการสังกัดและรหัสพนักงานแล้ว\nกรุณารอเจ้าหน้าที่ดูแลระบบ (Admin) ตรวจสอบความถูกต้องเพื่อเปิดสิทธิ์การเข้าถึง dashboard หน่วยงาน';
    return 'เนื่องจากสิทธิ์ผู้ตรวจสอบ (Auditor) สามารถเข้าถึงข้อมูลเชิงลึกได้\nระบบจึงจำเป็นต้องตรวจสอบตัวตนและวัตถุประสงค์การใช้งานอย่างถี่ถ้วน';
  };

  const getInstructions = () => {
    if (isCitizen) return null;
    return [
      'เจ้าหน้าที่กำลังตรวจสอบข้อมูลของคุณ',
      'ผลการพิจารณาจะส่งไปยังอีเมลที่ลงทะเบียนไว้',
      'หากผ่านการอนุมัติ คุณจะสามารถ Login ได้ทันที'
    ];
  };

  return (
    <SafeAreaView style={[styles.container, !isCitizen && styles.containerFormal]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.illustrationWrap}>
              <View style={[styles.circle, styles.circle1]} />
              <View style={[styles.circle, styles.circle2]} />
              <View style={[styles.circle, styles.circle3]} />
              <View style={[
                  styles.iconContainer, 
                  theme.shadows.lg,
                  isAgency && styles.iconContainerAgency,
                  isAuditor && styles.iconContainerAuditor
              ]}>
                <Text style={styles.icon}>{isCitizen ? '🎉' : isAgency ? '🏛️' : '🛡️'}</Text>
              </View>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>{getTitle()}</Text>
              <Text style={styles.description}>{getDescription()}</Text>
            </View>

            {!isCitizen && (
              <View style={styles.instructionBox}>
                <Text style={styles.instructionHeader}>ขั้นตอนถัดไป สำหรับคุณ:</Text>
                {getInstructions()?.map((text, index) => (
                  <View key={index} style={styles.instructionItem}>
                    <View style={styles.dot} />
                    <Text style={styles.instructionText}>{text}</Text>
                  </View>
                ))}
              </View>
            )}

            {!isCitizen && (
              <View style={styles.infoNote}>
                <Text style={styles.infoNoteText}>
                  ⏱️ การตรวจสอบโดยเฉลี่ยใช้เวลา 24-48 ชั่วโมง
                </Text>
              </View>
            )}
          </View>
      </ScrollView>

      <View style={[styles.footer, !isCitizen && styles.footerFormal]}>
        <CustomButton
          title={isCitizen ? 'เริ่มแจ้งปัญหาเลย' : 'กลับไปยังหน้า Login'}
          onPress={handleAction}
          style={[
              styles.button,
              isAgency && styles.buttonAgency,
              isAuditor && styles.buttonAuditor
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  containerFormal: {
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 40,
    paddingBottom: 120,
  },
  content: {
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  illustrationWrap: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: theme.colors.secondary,
  },
  circle1: {
    width: 200,
    height: 200,
    opacity: 0.04,
  },
  circle2: {
    width: 150,
    height: 150,
    opacity: 0.08,
  },
  circle3: {
    width: 100,
    height: 100,
    opacity: 0.12,
  },
  iconContainer: {
    width: 84,
    height: 84,
    borderRadius: 30,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.gray[100],
  },
  iconContainerAgency: {
    borderColor: theme.colors.primary + '30',
  },
  iconContainerAuditor: {
    borderColor: theme.colors.secondary + '30',
  },
  icon: {
    fontSize: 42,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: theme.colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: -1,
  },
  description: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '500',
    opacity: 0.8,
  },
  instructionBox: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    marginBottom: 20,
  },
  instructionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.secondary,
    marginRight: 12,
  },
  instructionText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    fontWeight: '600',
  },
  infoNote: {
    backgroundColor: theme.colors.info.bg,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.info.base + '20',
  },
  infoNoteText: {
    fontSize: 13,
    color: theme.colors.info.text,
    fontWeight: '700',
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    paddingTop: 20,
    backgroundColor: theme.colors.surface,
  },
  footerFormal: {
    backgroundColor: '#F8FAFC',
  },
  button: {
    height: 64,
    borderRadius: 20,
  },
  buttonAgency: {
    backgroundColor: theme.colors.primary,
  },
  buttonAuditor: {
    backgroundColor: theme.colors.secondary,
  },
});

export default RegisterSuccessScreen;
