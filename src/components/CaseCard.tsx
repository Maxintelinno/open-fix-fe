import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { theme } from '../theme';
import { Case } from '../types';
import { StatusBadge } from './StatusBadge';
import { useTranslation } from 'react-i18next';

interface CaseCardProps {
  item: Case;
  onPress: () => void;
}

export const CaseCard: React.FC<CaseCardProps> = ({ item, onPress }) => {
  const { t } = useTranslation();
  
  // Map category to translation key, falling back to original if not found
  const categoryLabel = t(`categories.${item.category}`, { defaultValue: item.category });

  return (
    <TouchableOpacity 
      style={[styles.container, theme.shadows.sm]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={typeof item.images[0] === 'string' ? { uri: item.images[0] } : item.images[0]} 
          style={styles.image} 
        />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{categoryLabel.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.date}>{t('cases.submitted_on')}: {new Date(item.createdAt).toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: 'numeric' })}</Text>
          <StatusBadge status={item.status} size="sm" />
        </View>
        
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        
        <View style={styles.locationContainer}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText} numberOfLines={1}>{item.location.address}</Text>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
          <View style={styles.arrowContainer}>
             <Text style={styles.arrowText}>→</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    marginBottom: theme.spacing.md,
    flexDirection: 'column',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  imageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: theme.colors.gray[50],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    color: theme.colors.text.white,
    fontSize: 9,
    fontWeight: theme.typography.fontWeight.bold,
    letterSpacing: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: theme.colors.text.muted,
    fontWeight: theme.typography.fontWeight.medium,
  },
  title: {
    fontSize: 17,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: 6,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  locationText: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
  },
  description: {
    fontSize: 13,
    color: theme.colors.text.muted,
    flex: 1,
    marginRight: 12,
  },
  arrowContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 16,
    color: theme.colors.secondary,
    fontWeight: 'bold',
  },
});
