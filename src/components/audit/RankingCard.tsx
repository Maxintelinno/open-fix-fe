import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

export const TrendIndicator: React.FC<{ trend: 'up' | 'down' | 'stable' }> = ({ trend }) => {
  const getTrendStyle = () => {
    switch (trend) {
      case 'up':
        return { color: theme.colors.danger.base, icon: '📈', label: '+4.2%' }; // In audit, 'up' complaints is usually red
      case 'down':
        return { color: theme.colors.success.base, icon: '📉', label: '-2.5%' };
      default:
        return { color: theme.colors.text.muted, icon: '➡️', label: '0.0%' };
    }
  };

  const { color, icon, label } = getTrendStyle();

  return (
    <View style={styles.trendContainer}>
      <Text style={[styles.trendLabel, { color }]}>{icon} {label}</Text>
    </View>
  );
};

interface RankingCardProps {
  rank: number;
  name: string;
  score: string | number;
  subValue?: string;
  trend: 'up' | 'down' | 'stable';
  onPress: () => void;
}

export const RankingCard: React.FC<RankingCardProps> = ({ 
  rank, 
  name, 
  score, 
  subValue, 
  trend,
  onPress 
}) => {
  const isTopThree = rank <= 3;
  const getMedal = () => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        isTopThree && { borderColor: theme.colors.primary + '30', borderWidth: 1.5 }
      ]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[
        styles.rankBadge, 
        isTopThree && { backgroundColor: theme.colors.primary + '15' }
      ]}>
        <Text style={[styles.rankText, isTopThree && { color: theme.colors.primary }]}>
          {getMedal() || rank}
        </Text>
      </View>
      
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        {subValue && <Text style={styles.subValue}>{subValue}</Text>}
      </View>
      
      <View style={styles.metrics}>
        <Text style={styles.score}>{score}</Text>
        <TrendIndicator trend={trend} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    ...theme.shadows.sm,
  },
  rankBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: theme.colors.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  rankText: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.text.secondary,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text.primary,
    letterSpacing: -0.3,
  },
  subValue: {
    fontSize: 11,
    color: theme.colors.text.muted,
    marginTop: 2,
    fontWeight: '500',
  },
  metrics: {
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.primary,
    letterSpacing: -0.5,
  },
  trendContainer: {
    marginTop: 4,
  },
  trendLabel: {
    fontSize: 10,
    fontWeight: '800',
  },
});
