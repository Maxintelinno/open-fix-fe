import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { CustomButton } from './CustomButton';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  description, 
  icon = '📂', 
  actionLabel, 
  onAction 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionLabel && onAction && (
        <CustomButton 
          title={actionLabel} 
          onPress={onAction} 
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    marginTop: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    minWidth: 160,
  },
});
