import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  StatusBar,
  Dimensions
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { theme } from '../../theme';
import { mockCases, mockStaff } from '../../data/mockData';
import { RootStackParamList } from '../../types';
import { AgencyStatusBadge } from '../../components/agency/StatusBadge';
import { UrgencyBadge } from '../../components/agency/UrgencyBadge';
import { CustomButton } from '../../components/CustomButton';

type AgencyCaseDetailRouteProp = RouteProp<RootStackParamList, 'AgencyCaseDetail'>;

const AgencyCaseDetailScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute<AgencyCaseDetailRouteProp>();
  const navigation = useNavigation();
  const { caseId } = route.params;
  
  const item = mockCases.find(c => c.id === caseId) || mockCases[0];
  const assignedStaff = mockStaff.find(s => s.id === item.assignedStaffId);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={typeof item.images[0] === 'string' ? { uri: item.images[0] } : item.images[0]} 
            style={styles.mainImage} 
          />
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
             <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
               <Text style={styles.title}>{item.title}</Text>
               <UrgencyBadge urgency={item.urgency || 'low'} />
            </View>
            <View style={styles.statusRow}>
               <AgencyStatusBadge status={item.status} />
               <Text style={styles.dateText}>{t('cases.submitted_on')}: {new Date(item.createdAt).toLocaleDateString('th-TH')}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('case_detail.description')}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('case_detail.location')}</Text>
            <View style={styles.locationCard}>
               <Text style={styles.locationText}>📍 {item.location.address}</Text>
               <TouchableOpacity style={styles.mapLink}>
                  <Text style={styles.mapLinkText}>{t('nav.map')}</Text>
               </TouchableOpacity>
            </View>
          </View>

          {item.status !== 'PENDING' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('agency.common.responsible')}</Text>
              <View style={styles.staffCard}>
                 <View style={styles.staffAvatar}>
                    <Text style={styles.staffAvatarText}>{assignedStaff?.name.charAt(0) || '👷'}</Text>
                 </View>
                 <View style={styles.staffInfo}>
                    <Text style={styles.staffName}>{assignedStaff?.name || t('agency.inbox.not_assigned')}</Text>
                    <Text style={styles.staffRole}>{assignedStaff?.role || 'ฝ่ายปฏิบัติการ'}</Text>
                 </View>
                 <TouchableOpacity 
                   style={styles.changeStaffButton}
                   onPress={() => (navigation as any).navigate('AssignStaff', { caseId: item.id })}
                 >
                    <Text style={styles.changeStaffText}>{t('common.edit')}</Text>
                 </TouchableOpacity>
              </View>
            </View>
          )}

          {item.status === 'PENDING' ? (
            <View style={styles.actionSection}>
               <CustomButton 
                 title={t('agency.inbox.assign')} 
                 onPress={() => (navigation as any).navigate('AssignStaff', { caseId: item.id })} 
                 style={styles.mainActionButton}
               />
               <CustomButton 
                 title={t('nav.home')} 
                 variant="outline"
                 onPress={() => navigation.goBack()} 
               />
            </View>
          ) : (
            <View style={styles.actionSection}>
               <CustomButton 
                 title={t('agency.assigned.update_status')} 
                 onPress={() => {}} 
                 style={styles.mainActionButton}
               />
               <View style={styles.secondaryActions}>
                  <CustomButton 
                    title={t('agency.assigned.upload_proof')} 
                    variant="outline"
                    onPress={() => {}} 
                    style={{ flex: 1, marginRight: 8 }}
                  />
                  <CustomButton 
                    title={t('agency.common.add_note')} 
                    variant="outline"
                    onPress={() => {}} 
                    style={{ flex: 1 }}
                  />
               </View>
            </View>
          )}
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
  scrollContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: theme.colors.background,
    marginTop: -30,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    flex: 1,
    marginRight: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: theme.colors.text.secondary,
    lineHeight: 24,
  },
  locationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  locationText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    flex: 1,
    marginRight: 10,
  },
  mapLink: {
    backgroundColor: theme.colors.secondary + '10',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  mapLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.secondary,
  },
  staffCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  staffAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  staffAvatarText: {
    fontSize: 20,
  },
  staffInfo: {
    flex: 1,
  },
  staffName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  staffRole: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  changeStaffButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  changeStaffText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.secondary,
  },
  actionSection: {
    marginTop: 10,
    gap: 12,
  },
  mainActionButton: {
    height: 56,
  },
  secondaryActions: {
    flexDirection: 'row',
  },
});

export default AgencyCaseDetailScreen;
