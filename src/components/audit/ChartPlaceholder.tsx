import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { theme } from '../../theme';

interface ChartPlaceholderProps {
  height?: number;
  label?: string;
}

export const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({ 
  height = 180, 
  label = 'Data Visualization' 
}) => {
  return (
    <View style={[styles.container, { height }]}>
      <View style={styles.gridContainer}>
        {[1, 2, 3, 4].map(i => (
          <View key={i} style={styles.gridLine} />
        ))}
      </View>
      
      <View style={styles.content}>
        <View style={styles.visuals}>
           <View style={[styles.bar, { height: '40%', opacity: 0.3 }]} />
           <View style={[styles.bar, { height: '70%', opacity: 0.5 }]} />
           <View style={[styles.bar, { height: '55%', opacity: 0.4 }]} />
           <View style={[styles.bar, { height: '85%', opacity: 0.6 }]} />
           <View style={[styles.bar, { height: '50%', opacity: 0.5 }]} />
           <View style={[styles.bar, { height: '65%', opacity: 0.4 }]} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    marginTop: 12,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
    ...theme.shadows.sm,
  },
  gridContainer: {
    ...StyleSheet.absoluteFillObject,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  gridLine: {
    height: 1,
    backgroundColor: theme.colors.gray[50],
    width: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  visuals: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 60,
    gap: 8,
    marginBottom: 16,
  },
  bar: {
    width: 12,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  label: {
    fontSize: 12,
    color: theme.colors.text.muted,
    fontWeight: '600',
    backgroundColor: theme.colors.gray[50],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
});
