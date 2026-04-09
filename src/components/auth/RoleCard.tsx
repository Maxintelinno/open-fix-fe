import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  View 
} from 'react-native';
import { theme } from '../../theme';
import { UserRole } from '../../types';

interface RoleCardProps {
  role: UserRole;
  title: string;
  description: string;
  icon: string;
  selected: boolean;
  onSelect: (role: UserRole) => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({ 
  role, 
  title, 
  description, 
  icon, 
  selected, 
  onSelect 
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        selected && styles.selectedCard,
        theme.shadows.md
      ]}
      onPress={() => onSelect(role)}
      activeOpacity={0.8}
    >
      <View style={[styles.iconContainer, selected && styles.selectedIconContainer]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, selected && styles.selectedTitle]}>{title}</Text>
        <Text style={[styles.description, selected && styles.selectedDescription]}>{description}</Text>
      </View>
      <View style={[styles.radio, selected && styles.selectedRadio]}>
        {selected ? (
          <View style={styles.radioInner}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: theme.colors.secondary,
    backgroundColor: theme.colors.secondary + '08',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: theme.colors.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  selectedIconContainer: {
    backgroundColor: theme.colors.secondary + '15',
  },
  icon: {
    fontSize: 32,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  selectedTitle: {
    color: theme.colors.secondary,
  },
  description: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    lineHeight: 20,
    fontWeight: '500',
  },
  selectedDescription: {
    color: theme.colors.text.primary,
    opacity: 0.8,
  },
  radio: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: theme.colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  selectedRadio: {
    borderColor: theme.colors.secondary,
    backgroundColor: theme.colors.secondary,
  },
  radioInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: 'white',
    fontSize: 14,
    fontWeight: '900',
  },
});
