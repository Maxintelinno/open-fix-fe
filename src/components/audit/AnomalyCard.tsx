import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme';
import { AnomalyItem, AnomalySeverity } from '../../types';

export const SeverityBadge: React.FC<{ severity: AnomalySeverity }> = ({ severity }) => {
  const { t } = useTranslation();
  const getStyles = () => {
    switch (severity) {
      case 'high':
        return { bg: theme.colors.danger.bg, text: theme.colors.danger.text, label: t('audit.anomaly.severity.high') };
      case 'medium':
        return { bg: theme.colors.warning.bg, text: theme.colors.warning.text, label: t('audit.anomaly.severity.medium') };
      default:
        return { bg: theme.colors.info.bg, text: theme.colors.info.text, label: t('audit.anomaly.severity.low') };
    }
  };

  const { bg, text, label } = getStyles();

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.badgeText, { color: text }]}>{label}</Text>
    </View>
  );
};

interface AnomalyCardProps {
  item: AnomalyItem;
  onPress: () => void;
}

export const AnomalyCard: React.FC<AnomalyCardProps> = ({ item, onPress }) => {
  const { t } = useTranslation();
  
  const getSeverityColor = () => {
    switch (item.severity) {
      case 'high': return theme.colors.danger.base;
      case 'medium': return theme.colors.warning.base;
      case 'low': return theme.colors.info.base;
      default: return theme.colors.gray[400];
    }
  };

  const severityColor = getSeverityColor();

  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { borderLeftColor: severityColor, borderLeftWidth: 5 }
      ]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.titleArea}>
           <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
           <Text style={styles.dateText}>{new Date(item.detectedAt).toLocaleDateString('th-TH')}</Text>
        </View>
        <SeverityBadge severity={item.severity} />
      </View>
      
      <View style={styles.locationRow}>
        <Text style={styles.locationText}>📍 {item.province} • {item.agency}</Text>
      </View>

      <View style={styles.typeRow}>
        <View style={[styles.typeBadge, { backgroundColor: theme.colors.gray[50] }]}>
           <Text style={styles.typeLabel}>🔍 {t('audit.anomaly.title')}: </Text>
           <Text style={styles.typeValue}>{item.anomalyType}</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <TouchableOpacity style={styles.actionButton} onPress={onPress}>
          <Text style={styles.actionText}>{t('audit.anomaly.action.investigate')} →</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
    ...theme.shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleArea: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  dateText: {
    fontSize: 10,
    color: theme.colors.text.muted,
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    fontWeight: '600',
  },
  typeRow: {
    marginBottom: 16,
  },
  typeBadge: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  typeLabel: {
    fontSize: 11,
    color: theme.colors.text.muted,
    fontWeight: '600',
  },
  typeValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: theme.colors.danger.text,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[50],
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    flex: 1,
    marginRight: 12,
    lineHeight: 18,
  },
  actionButton: {
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.primary,
  },
});
