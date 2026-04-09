import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

interface SummaryCardProps {
  label: string;
  count: number;
  type: 'pending' | 'in_progress' | 'resolved';
  onPress?: () => void;
}

const getCardStyle = (type: 'pending' | 'in_progress' | 'resolved') => {
  switch (type) {
    case 'pending':
      return { 
        color: theme.colors.warning.text, 
        dot: theme.colors.warning.base,
        bg: theme.colors.warning.bg 
      };
    case 'in_progress':
      return { 
        color: theme.colors.info.text, 
        dot: theme.colors.info.base,
        bg: theme.colors.info.bg 
      };
    case 'resolved':
      return { 
        color: theme.colors.success.text, 
        dot: theme.colors.success.base,
        bg: theme.colors.success.bg 
      };
    default:
      return { 
        color: theme.colors.text.primary, 
        dot: theme.colors.gray[300],
        bg: theme.colors.gray[50] 
      };
  }
};

export const SummaryCard: React.FC<SummaryCardProps> = ({ label, count, type, onPress }) => {
  const styles_extra = getCardStyle(type);

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: styles_extra.bg }]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={[styles.dot, { backgroundColor: styles_extra.dot }]} />
        <Text style={[styles.label, { color: styles_extra.color }]}>{label}</Text>
      </View>
      <Text style={[styles.count, { color: styles_extra.color }]}>{count}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: theme.typography.fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  count: {
    fontSize: 28,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
