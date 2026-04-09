import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../theme';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  multiline,
  numberOfLines = 1,
  error,
  helperText,
  containerStyle,
  inputStyle,
  keyboardType = 'default',
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[
        styles.inputWrapper,
        error ? styles.inputError : null,
        multiline ? styles.multilineWrapper : null,
      ]}>
        <TextInput
          style={[
            styles.input,
            multiline ? styles.multilineInput : null,
            inputStyle
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.gray[400]}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: theme.colors.gray[100],
    paddingHorizontal: 16,
    height: 56,
    justifyContent: 'center',
    // Subtle inner depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  inputError: {
    borderColor: theme.colors.danger.base,
    backgroundColor: theme.colors.danger.bg,
  },
  multilineWrapper: {
    height: 'auto',
    paddingVertical: 12,
  },
  input: {
    fontSize: 16,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  multilineInput: {
    minHeight: 110,
  },
  errorText: {
    fontSize: 12,
    color: theme.colors.danger.base,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  helperText: {
    fontSize: 12,
    color: theme.colors.text.muted,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: theme.typography.fontWeight.medium,
  },
});
