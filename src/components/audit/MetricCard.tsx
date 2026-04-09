import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: string;
  trend?: string;
  color?: string;
  subLabel?: string;
  onPress?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  label, 
  value, 
  icon, 
  trend, 
  color = theme.colors.primary,
  subLabel,
  onPress 
}) => {
  const isPositive = trend?.startsWith('+');
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { borderLeftColor: color, borderLeftWidth: 4 }
      ]} 
      activeOpacity={0.7}
      disabled={!onPress}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: color + '12' }]}>
           <Text style={styles.icon}>{icon || '📊'}</Text>
        </View>
        {trend && (
           <View style={[
             styles.trendContainer, 
             { backgroundColor: isPositive ? theme.colors.danger.bg : theme.colors.success.bg }
           ]}>
              <Text style={[
                styles.trendText, 
                { color: isPositive ? theme.colors.danger.text : theme.colors.success.text }
              ]}>{trend}</Text>
           </View>
        )}
      </View>
      <Text style={styles.value} numberOfLines={1}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
      
      {/* Subtle decorative accent */}
      <View style={[styles.accent, { backgroundColor: color }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 20,
    width: '48%',
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    ...theme.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
  trendContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '800',
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  subLabel: {
    fontSize: 10,
    color: theme.colors.text.muted,
    marginTop: 4,
  },
  accent: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    width: 40,
    height: 40,
    borderRadius: 20,
    opacity: 0.05,
  }
});
