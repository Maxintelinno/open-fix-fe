import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TextInputProps,
  ViewStyle,
  TouchableOpacity
} from 'react-native';
import { theme } from '../../theme';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: string;
  containerStyle?: ViewStyle;
}

export const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  error, 
  icon,
  containerStyle, 
  secureTextEntry,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[
        styles.label, 
        isFocused && styles.labelFocused,
        error ? styles.labelError : null
      ]}>{label}</Text>
      
      <View style={[
        styles.inputContainer, 
        isFocused && styles.inputContainerFocused,
        error ? styles.inputError : null,
        theme.shadows.sm
      ]}>
        {icon && (
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{icon}</Text>
          </View>
        )}
        
        <TextInput
          style={styles.input}
          placeholderTextColor={theme.colors.text.muted}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          {...props}
        />

        {secureTextEntry && (
          <TouchableOpacity 
            style={styles.toggleButton} 
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Text style={styles.toggleIcon}>{isPasswordVisible ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text.secondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  labelFocused: {
    color: theme.colors.secondary,
  },
  labelError: {
    color: theme.colors.danger.base,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 64,
    borderWidth: 1.5,
    borderColor: theme.colors.gray[100],
  },
  inputContainerFocused: {
    borderColor: theme.colors.secondary,
    backgroundColor: theme.colors.secondary + '05',
  },
  inputError: {
    borderColor: theme.colors.danger.base,
    backgroundColor: theme.colors.danger.bg,
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  toggleButton: {
    padding: 8,
  },
  toggleIcon: {
    fontSize: 18,
    opacity: 0.6,
  },
  errorContainer: {
    marginTop: 6,
    marginLeft: 4,
  },
  errorText: {
    fontSize: 12,
    color: theme.colors.danger.base,
    fontWeight: '600',
  },
});
