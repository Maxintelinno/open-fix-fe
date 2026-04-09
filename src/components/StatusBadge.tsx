import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { CaseStatus } from '../types';
import { useTranslation } from 'react-i18next';

interface StatusBadgeProps {
  status: CaseStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const { t } = useTranslation();

  const getStatusConfig = (status: CaseStatus) => {
    switch (status) {
      case 'PENDING':
        return {
          label: t('status.pending'),
          color: theme.colors.warning.text,
          bgColor: theme.colors.warning.bg,
        };
      case 'IN_PROGRESS':
        return {
          label: t('status.in_progress'),
          color: theme.colors.info.text,
          bgColor: theme.colors.info.bg,
        };
      case 'COMPLETED':
        return {
          label: t('status.completed'),
          color: theme.colors.success.text,
          bgColor: theme.colors.success.bg,
        };
      default:
        return {
          label: status,
          color: theme.colors.text.secondary,
          bgColor: theme.colors.gray[100],
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <View style={[
      styles.container, 
      { backgroundColor: config.bgColor },
      size === 'sm' && styles.containerSmall
    ]}>
      <View style={[
        styles.dot, 
        { backgroundColor: config.color },
        size === 'sm' && styles.dotSmall
      ]} />
      <Text style={[
        styles.text, 
        { color: config.color },
        size === 'sm' && styles.textSmall
      ]}>
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  containerSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  dotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  textSmall: {
    fontSize: 10,
  },
});
