import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  showDivider?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  actionLabel, 
  onAction,
  showDivider = false
}) => {
  return (
    <View style={[styles.container, showDivider && styles.divider]}>
      <Text style={styles.title}>{title}</Text>
      {actionLabel && (
        <TouchableOpacity onPress={onAction} activeOpacity={0.6}>
          <Text style={styles.action}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 12,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
    paddingBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    letterSpacing: -0.3,
  },
  action: {
    fontSize: 14,
    color: theme.colors.secondary,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
