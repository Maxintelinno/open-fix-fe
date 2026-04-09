import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { Urgency } from '../../types';
import { useTranslation } from 'react-i18next';

interface UrgencyBadgeProps {
  urgency: Urgency;
}

export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ urgency }) => {
  const { t } = useTranslation();
  
  const getUrgencyStyles = () => {
    switch (urgency) {
      case 'low':
        return {
          bg: theme.colors.success.bg,
          text: theme.colors.success.text,
          label: t('agency.common.low')
        };
      case 'medium':
        return {
          bg: theme.colors.warning.bg,
          text: theme.colors.warning.text,
          label: t('agency.common.medium')
        };
      case 'high':
        return {
          bg: theme.colors.danger.bg,
          text: theme.colors.danger.text,
          label: t('agency.common.high')
        };
      case 'emergency':
        return {
          bg: theme.colors.danger.base,
          text: theme.colors.text.white,
          label: t('agency.common.emergency')
        };
      default:
        return {
          bg: theme.colors.gray[100],
          text: theme.colors.text.muted,
          label: urgency
        };
    }
  };

  const styles = getUrgencyStyles();

  return (
    <View style={[badgeStyles.container, { backgroundColor: styles.bg }]}>
      <Text style={[badgeStyles.text, { color: styles.text }]}>
        {styles.label}
      </Text>
    </View>
  );
};

const badgeStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});
