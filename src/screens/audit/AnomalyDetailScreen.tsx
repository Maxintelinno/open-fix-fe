import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  StatusBar,
  TextInput
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { theme } from '../../theme';
import { mockAnomalies } from '../../data/mockData';
import { RootStackParamList } from '../../types';
import { SeverityBadge } from '../../components/audit/AnomalyCard';
import { CustomButton } from '../../components/CustomButton';

type AnomalyDetailRouteProp = RouteProp<RootStackParamList, 'AnomalyDetail'>;

const AnomalyDetailScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute<AnomalyDetailRouteProp>();
  const navigation = useNavigation();
  const { anomalyId } = route.params;
  
  const item = mockAnomalies.find(a => a.id === anomalyId) || mockAnomalies[0];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('audit.anomaly.action.investigate')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
         <View style={styles.severitySection}>
            <SeverityBadge severity={item.severity} />
            <Text style={styles.detectedText}>{t('audit.open_data.last_updated')}: {new Date(item.detectedAt).toLocaleString('th-TH')}</Text>
         </View>

         <View style={styles.mainInfo}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.typeBox}>
               <Text style={styles.typeLabel}>{t('audit.anomaly.title')}</Text>
               <Text style={styles.typeValue}>{item.anomalyType}</Text>
            </View>
         </View>

         <View style={styles.section}>
            <Text style={styles.sectionTitle}>ข้อมูลหน่วยงานและพื้นที่</Text>
            <View style={styles.infoCard}>
               <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>จังหวัด</Text>
                  <Text style={styles.infoValue}>{item.province}</Text>
               </View>
               <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>หน่วยงาน</Text>
                  <Text style={styles.infoValue}>{item.agency}</Text>
               </View>
               <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>รหัสอ้างอิง</Text>
                  <Text style={styles.infoValue}>#{item.complaintId}</Text>
               </View>
            </View>
         </View>

         <View style={styles.section}>
            <Text style={styles.sectionTitle}>เหตุผลที่ถูกตรวจพบ</Text>
            <View style={styles.reasonCard}>
               <Text style={styles.reasonText}>{item.description}</Text>
            </View>
         </View>

         <View style={styles.section}>
            <Text style={styles.sectionTitle}>หลักฐานเบื้องต้น</Text>
            <View style={styles.evidencePlaceholder}>
               <Text style={styles.placeholderLabel}>รูปภาพหลักฐานเปรียบเทียบ (Mockup)</Text>
               <View style={styles.mockImages}>
                  <View style={styles.mockImage} />
                  <View style={styles.mockImage} />
               </View>
            </View>
         </View>

         <View style={styles.section}>
            <Text style={styles.sectionTitle}>บันทึกการตรวจสอบ (Audit Note)</Text>
            <TextInput 
              style={styles.noteInput}
              placeholder="ระบุความเห็นหรือรายละเอียดการตรวจสอบ..."
              multiline
              numberOfLines={4}
            />
         </View>

         <View style={styles.actionSection}>
            <CustomButton 
              title={t('common.confirm')}
              onPress={() => navigation.goBack()}
              style={styles.mainAction}
            />
            <View style={styles.secondaryActions}>
               <CustomButton 
                 title={t('audit.anomaly.action.flag')}
                 variant="outline"
                 onPress={() => {}}
                 style={{ flex: 1, marginRight: 8 }}
               />
               <CustomButton 
                 title={t('audit.anomaly.action.dismiss')}
                 variant="outline"
                 onPress={() => {}}
                 style={{ flex: 1, borderColor: theme.colors.danger.base }}
               />
            </View>
         </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: theme.colors.text.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  severitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  detectedText: {
    fontSize: 12,
    color: theme.colors.text.muted,
  },
  mainInfo: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  typeBox: {
    backgroundColor: theme.colors.danger.bg,
    padding: 12,
    borderRadius: 12,
  },
  typeLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: theme.colors.danger.text,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  typeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.danger.text,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[50],
  },
  infoLabel: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  reasonCard: {
    backgroundColor: theme.colors.warning.bg,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.warning.base + '20',
  },
  reasonText: {
    fontSize: 14,
    color: theme.colors.warning.text,
    lineHeight: 22,
  },
  evidencePlaceholder: {
    backgroundColor: theme.colors.gray[100],
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  placeholderLabel: {
    fontSize: 12,
    color: theme.colors.text.muted,
    marginBottom: 16,
  },
  mockImages: {
    flexDirection: 'row',
    gap: 12,
  },
  mockImage: {
    width: 100,
    height: 100,
    backgroundColor: theme.colors.gray[200],
    borderRadius: 12,
  },
  noteInput: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    fontSize: 14,
    textAlignVertical: 'top',
  },
  actionSection: {
    gap: 12,
  },
  mainAction: {
    height: 56,
  },
  secondaryActions: {
    flexDirection: 'row',
  },
});

export default AnomalyDetailScreen;
