import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { CaseStatus } from '../../types';
import { useTranslation } from 'react-i18next';

interface AgencyStatusBadgeProps {
  status: CaseStatus;
  size?: 'sm' | 'md';
}

export const AgencyStatusBadge: React.FC<AgencyStatusBadgeProps> = ({ status, size = 'md' }) => {
  const { t } = useTranslation();
  
  const getStatusStyles = () => {
    switch (status) {
      case 'PENDING':
        return {
          bg: theme.colors.gray[100],
          text: theme.colors.text.secondary,
          label: t('agency.assigned.status_received')
        };
      case 'IN_PROGRESS':
        return {
          bg: theme.colors.secondary + '15',
          text: theme.colors.secondary,
          label: t('agency.assigned.status_processing')
        };
      case 'COMPLETED':
        return {
          bg: theme.colors.success.bg,
          text: theme.colors.success.text,
          label: t('agency.assigned.status_done')
        };
      default:
        return {
          bg: theme.colors.gray[100],
          text: theme.colors.text.muted,
          label: status
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <View style={[
      badgeStyles.container, 
      { backgroundColor: styles.bg },
      size === 'sm' ? badgeStyles.sm : badgeStyles.md
    ]}>
      <Text style={[
        badgeStyles.text, 
        { color: styles.text },
        size === 'sm' ? { fontSize: 10 } : { fontSize: 12 }
      ]}>
        {styles.label}
      </Text>
    </View>
  );
};

const badgeStyles = StyleSheet.create({
  container: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  sm: {
    paddingVertical: 2,
  },
  md: {
    paddingVertical: 6,
  },
  text: {
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
