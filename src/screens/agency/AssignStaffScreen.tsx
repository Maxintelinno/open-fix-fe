import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { theme } from '../../theme';
import { mockCases, mockStaff } from '../../data/mockData';
import { RootStackParamList } from '../../types';
import { CustomButton } from '../../components/CustomButton';

type AssignStaffRouteProp = RouteProp<RootStackParamList, 'AssignStaff'>;

const AssignStaffScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute<AssignStaffRouteProp>();
  const navigation = useNavigation();
  const { caseId } = route.params;
  
  const item = mockCases.find(c => c.id === caseId) || mockCases[0];
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(item.assignedStaffId || null);

  const handleConfirm = () => {
    // Logic to update staff in mock data or context would go here
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('agency.common.assign_staff')}</Text>
      </View>

      <View style={styles.caseSummary}>
         <Text style={styles.caseLabel}>{t('agency.inbox.title')}</Text>
         <Text style={styles.caseTitle} numberOfLines={1}>{item.title}</Text>
         <Text style={styles.caseLocation}>📍 {item.location.address}</Text>
      </View>

      <FlatList
        data={mockStaff}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.staffCard, 
              selectedStaffId === item.id && styles.selectedStaffCard
            ]}
            onPress={() => setSelectedStaffId(item.id)}
          >
            <View style={styles.staffAvatar}>
               <Text style={styles.staffAvatarText}>{item.name.charAt(0)}</Text>
            </View>
            <View style={styles.staffInfo}>
               <Text style={styles.staffName}>{item.name}</Text>
               <Text style={styles.staffRole}>{item.role}</Text>
            </View>
            <View style={styles.workloadInfo}>
               <Text style={styles.workloadLabel}>{t('agency.common.workload')}</Text>
               <Text style={[
                 styles.workloadValue,
                 item.workload > 6 ? { color: theme.colors.danger.base } : { color: theme.colors.success.base }
               ]}>{item.workload} เคส</Text>
            </View>
            <View style={styles.selectionCircle}>
               <View style={[styles.innerCircle, selectedStaffId === item.id && styles.selectedCircle]} />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
         <CustomButton 
           title={t('common.confirm')} 
           onPress={handleConfirm}
           disabled={!selectedStaffId}
         />
      </View>
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
  caseSummary: {
    padding: 20,
    backgroundColor: theme.colors.secondary + '05',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  caseLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.secondary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  caseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  caseLocation: {
    fontSize: 13,
    color: theme.colors.text.secondary,
  },
  listContent: {
    padding: 20,
  },
  staffCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  selectedStaffCard: {
    borderColor: theme.colors.secondary,
    backgroundColor: theme.colors.secondary + '05',
  },
  staffAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  staffAvatarText: {
    fontSize: 18,
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
  workloadInfo: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  workloadLabel: {
    fontSize: 10,
    color: theme.colors.text.muted,
  },
  workloadValue: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
  selectionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  selectedCircle: {
    backgroundColor: theme.colors.secondary,
  },
  footer: {
    padding: 20,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
  },
});

export default AssignStaffScreen;
