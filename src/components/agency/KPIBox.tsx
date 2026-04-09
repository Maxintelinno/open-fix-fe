import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface KPIBoxProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: string;
  color?: string;
}

export const KPIBox: React.FC<KPIBoxProps> = ({ label, value, icon, trend, color = theme.colors.secondary }) => {
  return (
    <View style={[styles.container, theme.shadows.sm]}>
      <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
        {trend && (
          <Text style={styles.trend}>
            <Text style={{ color: theme.colors.success.base }}>↑</Text> {trend}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 16,
    flex: 1,
    margin: 6,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 20,
  },
  content: {
    justifyContent: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  label: {
    fontSize: 11,
    color: theme.colors.text.muted,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  trend: {
    fontSize: 10,
    marginTop: 4,
    color: theme.colors.text.secondary,
    fontWeight: '700',
  },
});
