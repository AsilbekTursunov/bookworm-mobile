import { View, Text, TextInputProps, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
interface Input extends TextInputProps {
  label?: string;
  icon?: any
  iconSize?: number,
  value: string,
  placeholder?: string,
  onChangeText: (value: string) => void,
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters',
  props?: TextInputProps,
  height?: number,
  textAlignVertical?: 'auto' | 'center' | 'top' | 'bottom',
  password?: boolean
}

const InputField = ({ label, icon, value, onChangeText, props, iconSize, placeholder, height = 48, textAlignVertical = 'center', password }: Input) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.inputContainer}>
            {icon && (
              <Ionicons
                name={icon}
                size={iconSize}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
            )}
            <TextInput
              style={[styles.input, {
                minHeight: height,
                textAlignVertical,
              }, props?.style]}
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText} 
              {...props}
              secureTextEntry={password}
              placeholderTextColor={COLORS.placeholderText}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default InputField

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: COLORS.textPrimary,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    color: COLORS.textDark,
  },
});



