import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../theme';
import { Case } from '../../types';
import { useTranslation } from 'react-i18next';
import { UrgencyBadge } from './UrgencyBadge';
import { AgencyStatusBadge } from './StatusBadge';

interface ComplaintCardProps {
  item: Case;
  onPress: () => void;
  onAction?: () => void;
  actionLabel?: string;
  showStaff?: boolean;
}

export const ComplaintCard: React.FC<ComplaintCardProps> = ({ 
  item, 
  onPress, 
  onAction, 
  actionLabel,
  showStaff = false
}) => {
  const { t } = useTranslation();
  
  const categoryLabel = t(`categories.${item.category}`, { defaultValue: item.category });
  const formattedDate = new Date(item.createdAt).toLocaleDateString('th-TH', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <TouchableOpacity 
      style={[styles.container, theme.shadows.sm]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{categoryLabel}</Text>
          <View style={styles.dot} />
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
        {item.urgency && <UrgencyBadge urgency={item.urgency} />}
      </View>

      <View style={styles.mainContent}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText} numberOfLines={1}>{item.location.address}</Text>
          </View>
        </View>
        <Image 
          source={typeof item.images[0] === 'string' ? { uri: item.images[0] } : item.images[0]} 
          style={styles.thumbnail} 
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.statusRow}>
          <AgencyStatusBadge status={item.status} size="sm" />
          {showStaff && item.assignedStaffId && (
            <View style={styles.staffInfo}>
               <Text style={styles.staffLabel}>👷 {t('agency.common.responsible')}:</Text>
               <Text style={styles.staffName}> {item.assignedStaffId === 's1' ? 'กิตติพงษ์' : 'เจ้าหน้าที่'}</Text>
            </View>
          )}
        </View>
        
        {onAction && (
          <TouchableOpacity style={styles.actionButton} onPress={onAction}>
            <Text style={styles.actionButtonText}>{actionLabel || t('agency.inbox.assign')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.secondary,
    textTransform: 'uppercase',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: theme.colors.gray[300],
    marginHorizontal: 8,
  },
  dateText: {
    fontSize: 11,
    color: theme.colors.text.muted,
  },
  mainContent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 10,
    marginRight: 4,
  },
  locationText: {
    fontSize: 13,
    color: theme.colors.text.secondary,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: theme.colors.gray[50],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[50],
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  staffInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  staffLabel: {
    fontSize: 11,
    color: theme.colors.text.muted,
  },
  staffName: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  actionButton: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionButtonText: {
    color: theme.colors.text.white,
    fontSize: 12,
    fontWeight: '700',
  },
});
