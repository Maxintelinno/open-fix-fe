import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { theme } from '../../theme';
import { mockCases } from '../../data/mockData';
import { StatusBadge } from '../../components/StatusBadge';
import { CustomButton } from '../../components/CustomButton';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

type CaseDetailRouteProp = RouteProp<RootStackParamList, 'CaseDetail'>;

const CaseDetailScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute<CaseDetailRouteProp>();
  const { caseId } = route.params;

  // Find the actual case from mock data
  const item = mockCases.find(c => c.id === caseId) || mockCases[1];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'citizen': return '👤';
      case 'agency': return '🏢';
      case 'system': return '🔍';
      default: return '💬';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'citizen': return 'ประชาชน';
      case 'agency': return 'หน่วยงาน';
      case 'system': return 'ระบบ';
      default: return '';
    }
  };

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
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
             <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.category}>
                {t(`categories.${item.category}`, { defaultValue: item.category }).toUpperCase()}
              </Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <StatusBadge status={item.status} />
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
               <Text style={styles.metaLabel}>{t('cases.submitted_on')}</Text>
               <Text style={styles.metaValue}>
                 {new Date(item.createdAt).toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric' })}
               </Text>
            </View>
            <View style={styles.metaItem}>
               <Text style={styles.metaLabel}>{t('case_detail.agency')}</Text>
               <Text style={styles.metaValue}>{item.assignedAgency || t('common.loading')}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('case_detail.description')}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('case_detail.location')}</Text>
            <View style={styles.locationCard}>
               <View style={styles.miniMapPlaceholder}>
                  <Text>🗺️</Text>
               </View>
               <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.addressText}>{item.location.address}</Text>
                  <Text style={styles.coordinates}>Lat: {item.location.latitude}, Lng: {item.location.longitude}</Text>
               </View>
            </View>
          </View>

          {/* Timeline Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('cases.timeline')}</Text>
            <View style={styles.timeline}>
              {item.timeline.map((update, index) => (
                <View key={update.id} style={styles.timelineItem}>
                  <View style={styles.timelineIndicator}>
                    <View style={[
                      styles.timelineDot,
                      index === 0 && styles.activeDot
                    ]} />
                    {index < item.timeline.length - 1 && <View style={styles.timelineLine} />}
                  </View>
                  <View style={styles.timelineContent}>
                    <View style={styles.timelineHeader}>
                      <Text style={styles.timelineTitle}>{update.title}</Text>
                      <Text style={styles.timelineTime}>
                        {new Date(update.timestamp).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                      </Text>
                    </View>
                    <Text style={styles.timelineDescription}>{update.description}</Text>
                    {update.evidenceImages && (
                      <View style={styles.evidenceContainer}>
                        {update.evidenceImages.map((img, i) => (
                          <Image 
                            key={i} 
                            source={typeof img === 'string' ? { uri: img } : img} 
                            style={styles.evidenceImage} 
                          />
                        ))}
                      </View>
                    )}
                    <Text style={styles.timelineDate}>
                      {new Date(update.timestamp).toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </Text>
                  </View>
                </View>
              )).reverse()}
            </View>
          </View>

          {/* Discussion / Comments Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
               <Text style={styles.sectionTitle}>การพูดคุย / ความคิดเห็น</Text>
               <View style={styles.commentCountBadge}>
                  <Text style={styles.commentCountText}>{item.comments.length}</Text>
               </View>
            </View>
            
            <View style={styles.commentList}>
              {item.comments.map((comment) => (
                <View key={comment.id} style={styles.commentItem}>
                   <View style={styles.commentRoleIcon}>
                      <Text style={{ fontSize: 20 }}>{getRoleIcon(comment.role)}</Text>
                   </View>
                   <View style={styles.commentContent}>
                      <View style={styles.commentHeader}>
                         <View style={styles.commentAuthorRow}>
                            <Text style={styles.commentAuthor}>{comment.user}</Text>
                            <View style={[styles.roleTag, styles[`roleTag_${comment.role}`]]}>
                               <Text style={styles.roleTagText}>{getRoleLabel(comment.role)}</Text>
                            </View>
                         </View>
                         <Text style={styles.commentTime}>
                            {new Date(comment.timestamp).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                         </Text>
                      </View>
                      <View style={styles.commentBubble}>
                         <Text style={styles.commentMessage}>{comment.message}</Text>
                      </View>
                   </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Footer Actions */}
        <View style={styles.footer}>
           <CustomButton 
             title={t('cases.add_comment')} 
             variant="outline" 
             onPress={() => {}} 
             style={{ flex: 1, marginRight: 8 }}
           />
           <CustomButton 
             title={t('case_detail.add_update')} 
             onPress={() => {}} 
             style={{ flex: 1 }}
           />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.gray[200],
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: theme.spacing.md,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: theme.colors.surface,
    marginTop: -20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  category: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  metaRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.gray[50],
    borderRadius: 16,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 10,
    color: theme.colors.text.muted,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  commentCountBadge: {
    backgroundColor: theme.colors.gray[100],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  commentCountText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.text.secondary,
  },
  description: {
    fontSize: 15,
    color: theme.colors.text.secondary,
    lineHeight: 24,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[50],
    padding: theme.spacing.sm,
    borderRadius: 12,
  },
  miniMapPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressText: {
    fontSize: 14,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  coordinates: {
    fontSize: 12,
    color: theme.colors.text.muted,
    marginTop: 2,
  },
  timeline: {
    marginTop: theme.spacing.xs,
  },
  timelineItem: {
    flexDirection: 'row',
  },
  timelineIndicator: {
    width: 20,
    alignItems: 'center',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.gray[300],
    zIndex: 1,
  },
  activeDot: {
    backgroundColor: theme.colors.secondary,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#DBEAFE',
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: theme.colors.gray[200],
  },
  timelineContent: {
    flex: 1,
    paddingLeft: theme.spacing.md,
    paddingBottom: 24,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  timelineTime: {
    fontSize: 12,
    color: theme.colors.text.muted,
  },
  timelineDescription: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  timelineDate: {
    fontSize: 11,
    color: theme.colors.text.muted,
    marginTop: 8,
  },
  evidenceContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  evidenceImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  commentList: {
    marginTop: 8,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  commentRoleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  commentAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentAuthor: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginRight: 8,
  },
  roleTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  roleTagText: {
    fontSize: 10,
    fontWeight: '800',
  },
  roleTag_citizen: {
    backgroundColor: '#E0F2FE',
  },
  roleTagText_citizen: {
     color: '#0369A1'
  },
  roleTag_agency: {
    backgroundColor: '#FEF3C7',
  },
  roleTagText_agency: {
    color: '#92400E'
  },
  roleTag_system: {
    backgroundColor: '#F3F4F6',
  },
  commentTime: {
    fontSize: 11,
    color: theme.colors.text.muted,
  },
  commentBubble: {
    backgroundColor: theme.colors.gray[50],
    borderRadius: 12,
    borderTopLeftRadius: 2,
    padding: 12,
  },
  commentMessage: {
    fontSize: 14,
    color: theme.colors.text.primary,
    lineHeight: 20,
  },
  roleTagText_system: {
    color: '#4B5563'
  },
  footer: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
    backgroundColor: theme.colors.surface,
  },
});

export default CaseDetailScreen;
