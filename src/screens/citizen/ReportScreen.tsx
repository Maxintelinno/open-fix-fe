import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  Switch,
  StatusBar,
  Alert
} from 'react-native';
import { theme } from '../../theme';
import { Input } from '../../components/Input';
import { CustomButton } from '../../components/CustomButton';
import { CaseCategory } from '../../types';
import { useTranslation } from 'react-i18next';

const ReportScreen: React.FC = () => {
  const { t } = useTranslation();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CaseCategory | null>(null);
  const [address, setAddress] = useState('');
  const [consent, setConsent] = useState(false);

  const categories: { label: string; value: CaseCategory; icon: string; color: string }[] = [
    { label: t('categories.road'), value: 'road', icon: '🛣️', color: '#E0F2FE' },
    { label: t('categories.lighting'), value: 'lighting', icon: '💡', color: '#FEF9C3' },
    { label: t('categories.garbage'), value: 'garbage', icon: '🗑️', color: '#F0FDF4' },
    { label: t('categories.drainage'), value: 'drainage', icon: '💧', color: '#DBEAFE' },
    { label: t('categories.safety'), value: 'safety', icon: '🚨', color: '#FEE2E2' },
    { label: t('categories.other'), value: 'other', icon: '📁', color: '#F3F4F6' },
  ];

  const handleSubmit = () => {
    Alert.alert(
      t('report.success'),
      t('report.success_desc'),
      [{ text: t('common.confirm') }]
    );
  };

  const isFormValid = title && description && category && address && consent;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topBar}>
         <Text style={styles.topBarTitle}>{t('report.title')}</Text>
         <View style={styles.progressBar}>
            <View style={[styles.progressInner, { width: '40%' }]} />
         </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Step 1: Capture */}
        <View style={styles.sectionHeader}>
           <Text style={styles.stepNumber}>1</Text>
           <Text style={styles.sectionTitle}>{t('report.upload_image')}</Text>
        </View>
        <TouchableOpacity style={[styles.uploadWrapper, theme.shadows.sm]}>
           <View style={styles.uploadIconContainer}>
              <Text style={styles.uploadEmoji}>📸</Text>
           </View>
           <Text style={styles.uploadMainText}>{t('report.upload_image')}</Text>
           <Text style={styles.uploadSubText}>{t('report.helper.image')}</Text>
        </TouchableOpacity>

        {/* Step 2: Details */}
        <View style={styles.sectionHeader}>
           <Text style={styles.stepNumber}>2</Text>
           <Text style={styles.sectionTitle}>{t('report.category')}</Text>
        </View>
        <View style={styles.categoryGrid}>
          {categories.map((item) => (
            <TouchableOpacity 
              key={item.value} 
              style={[
                styles.categoryCard,
                category === item.value && styles.categoryCardSelected,
                category === item.value && theme.shadows.sm
              ]}
              onPress={() => setCategory(item.value)}
            >
              <View style={[styles.categoryIconCircle, { backgroundColor: item.color }]}>
                 <Text style={styles.categoryEmoji}>{item.icon}</Text>
              </View>
              <Text style={[
                styles.categoryLabel,
                category === item.value && styles.categoryLabelSelected
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Input 
          label={t('report.issue_title')} 
          value={title} 
          onChangeText={setTitle} 
          placeholder={t('report.issue_title_placeholder')}
          containerStyle={styles.inputSpacing}
        />

        <Input 
          label={t('report.description')} 
          value={description} 
          onChangeText={setDescription} 
          placeholder={t('report.description_placeholder')}
          multiline
          numberOfLines={3}
          containerStyle={styles.inputSpacing}
        />

        {/* Step 3: Location */}
        <View style={styles.sectionHeader}>
           <Text style={styles.stepNumber}>3</Text>
           <Text style={styles.sectionTitle}>{t('report.location')}</Text>
        </View>
        <View style={[styles.locationBox, theme.shadows.sm]}>
            <View style={styles.locationHeader}>
               <View style={styles.locationPinBg}>
                  <Text style={styles.locationPin}>📍</Text>
               </View>
               <View style={styles.locationInfo}>
                  <Text style={styles.locationStatus}>{t('report.location')}</Text>
                  <Text style={styles.locationAccuracy}>{t('report.helper.location')}</Text>
               </View>
               <TouchableOpacity style={styles.editLocationBtn}>
                  <Text style={styles.editLocationText}>{t('common.confirm')}</Text>
               </TouchableOpacity>
            </View>
        </View>

        <Input 
          label={t('report.address')} 
          value={address} 
          onChangeText={setAddress} 
          placeholder={t('report.description_placeholder')}
          containerStyle={styles.inputSpacing}
        />

        {/* Final Consent */}
        <View style={[styles.consentBox, theme.shadows.sm]}>
          <Switch 
            value={consent} 
            onValueChange={setConsent} 
            trackColor={{ false: theme.colors.gray[200], true: theme.colors.secondary }}
          />
          <Text style={styles.consentText}>
            {t('report.consent')}
          </Text>
        </View>

        <CustomButton 
          title={t('report.submit')} 
          onPress={handleSubmit} 
          disabled={!isFormValid}
          size="lg"
          style={styles.submitBtn}
        />
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  topBar: {
     backgroundColor: theme.colors.surface,
     paddingHorizontal: 20,
     paddingTop: 10,
     paddingBottom: 20,
     borderBottomWidth: 1,
     borderBottomColor: theme.colors.border,
  },
  topBarTitle: {
     fontSize: 18,
     fontWeight: theme.typography.fontWeight.bold,
     color: theme.colors.text.primary,
     marginBottom: 12,
  },
  progressBar: {
     height: 4,
     backgroundColor: theme.colors.gray[100],
     borderRadius: 2,
     width: '100%',
  },
  progressInner: {
     height: '100%',
     backgroundColor: theme.colors.secondary,
     borderRadius: 2,
  },
  scrollContent: {
    padding: 20,
  },
  sectionHeader: {
     flexDirection: 'row',
     alignItems: 'center',
     marginBottom: 16,
     marginTop: 10,
  },
  stepNumber: {
     width: 24,
     height: 24,
     borderRadius: 12,
     backgroundColor: theme.colors.primary,
     color: theme.colors.text.white,
     textAlign: 'center',
     lineHeight: 24,
     fontSize: 12,
     fontWeight: '800',
     marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  uploadWrapper: {
     backgroundColor: theme.colors.surface,
     borderRadius: 20,
     paddingVertical: 32,
     alignItems: 'center',
     borderWidth: 2,
     borderColor: theme.colors.gray[100],
     borderStyle: 'dashed',
     marginBottom: 24,
  },
  uploadIconContainer: {
     width: 60,
     height: 60,
     borderRadius: 30,
     backgroundColor: theme.colors.gray[50],
     alignItems: 'center',
     justifyContent: 'center',
     marginBottom: 12,
  },
  uploadEmoji: {
     fontSize: 32,
  },
  uploadMainText: {
     fontSize: 15,
     fontWeight: theme.typography.fontWeight.bold,
     color: theme.colors.text.primary,
  },
  uploadSubText: {
     fontSize: 12,
     color: theme.colors.text.muted,
     marginTop: 4,
     textAlign: 'center',
     paddingHorizontal: 20,
  },
  categoryGrid: {
     flexDirection: 'row',
     flexWrap: 'wrap',
     justifyContent: 'space-between',
     marginBottom: 20,
  },
  categoryCard: {
     width: '31%',
     backgroundColor: theme.colors.surface,
     borderRadius: 16,
     padding: 12,
     alignItems: 'center',
     marginBottom: 12,
     borderWidth: 1.5,
     borderColor: 'transparent',
  },
  categoryCardSelected: {
     borderColor: theme.colors.secondary,
     backgroundColor: theme.colors.info.bg,
  },
  categoryIconCircle: {
     width: 44,
     height: 44,
     borderRadius: 22,
     alignItems: 'center',
     justifyContent: 'center',
     marginBottom: 8,
  },
  categoryEmoji: {
     fontSize: 24,
  },
  categoryLabel: {
     fontSize: 11,
     fontWeight: theme.typography.fontWeight.bold,
     color: theme.colors.text.secondary,
     textAlign: 'center',
  },
  categoryLabelSelected: {
     color: theme.colors.secondary,
  },
  inputSpacing: {
     marginBottom: 20,
  },
  locationBox: {
     backgroundColor: theme.colors.surface,
     borderRadius: 16,
     padding: 16,
     marginBottom: 16,
     borderWidth: 1,
     borderColor: theme.colors.gray[100],
  },
  locationHeader: {
     flexDirection: 'row',
     alignItems: 'center',
  },
  locationPinBg: {
     width: 40,
     height: 40,
     borderRadius: 12,
     backgroundColor: theme.colors.info.bg,
     alignItems: 'center',
     justifyContent: 'center',
     marginRight: 12,
  },
  locationPin: {
     fontSize: 20,
  },
  locationInfo: {
     flex: 1,
  },
  locationStatus: {
     fontSize: 13,
     fontWeight: theme.typography.fontWeight.bold,
     color: theme.colors.text.primary,
  },
  locationAccuracy: {
     fontSize: 11,
     color: theme.colors.success.text,
     marginTop: 2,
  },
  editLocationBtn: {
     paddingVertical: 6,
     paddingHorizontal: 12,
     borderRadius: 8,
     backgroundColor: theme.colors.gray[100],
  },
  editLocationText: {
     fontSize: 11,
     fontWeight: theme.typography.fontWeight.bold,
     color: theme.colors.text.secondary,
  },
  consentBox: {
     flexDirection: 'row',
     backgroundColor: theme.colors.surface,
     padding: 16,
     borderRadius: 20,
     alignItems: 'center',
     marginBottom: 32,
     borderWidth: 1,
     borderColor: theme.colors.gray[100],
  },
  consentText: {
     flex: 1,
     fontSize: 11,
     color: theme.colors.text.secondary,
     marginLeft: 12,
     lineHeight: 16,
  },
  submitBtn: {
     borderRadius: 16,
     height: 56,
  },
  bottomSpacer: {
     height: 60,
  },
});

export default ReportScreen;
