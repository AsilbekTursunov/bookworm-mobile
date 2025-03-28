import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '@/constants/colors'
import InputField from '@/components/InputField';
import { Link, router } from 'expo-router';
import AsyncStorage  from '@react-native-async-storage/async-storage'
import { useUserStore } from '@/store/userStore';
const SignUpScreen = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<string>('') 
  const { setUserData } = useUserStore()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.0.106:8081/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Serverdan xatolik ma’lumotini olish
        throw new Error(errorData.message || 'Failed during register');
      }

      const data = await response.json();
      await AsyncStorage.setItem('token', data.token)
      console.log('register token', data.token)
      setUserData(data.user); // UserStorega o’rnatish
      router.push('/(tabs)/home')
    } catch (error: any) {
      Alert.alert('Registration error', `${error.message}`); // Foydalanuvchiga xatolikni ko‘rsatish
    } finally {
      setLoading(false);
      setEmail('');
      setPassword('');
      setUsername('');
    }
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>BookWorm🐛</Text>
            <Text style={styles.subtitle}>Share your favourite reads</Text>
          </View>
          <View style={styles.formContainer}>
            {/* EMAIL */}
            <View style={styles.inputGroup}>
              <InputField
                label='Username'
                value={username}
                onChangeText={setUsername}
                placeholder='Enter your username'
                icon={'person-outline'}
                iconSize={20}
              />
              <Text>&nbsp;</Text>
              <InputField
                label='Email'
                value={email}
                onChangeText={setEmail}
                placeholder='Enter your email'
                icon={'mail-outline'}
                iconSize={20}
              />
              <Text>&nbsp;</Text>
              <InputField
                label='Password'
                value={password}
                onChangeText={setPassword}
                placeholder='Enter your password'
                icon={'key-outline'}
                iconSize={20}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              {loading ? <>
                <ActivityIndicator size={'large'} color={'#fff'} />
              </> : <>
                <Text style={styles.buttonText}>Register</Text>
              </>}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>You have already an account?</Text>
              <Link href={'/(auth)/sign-in'}>
                <Text style={styles.link}>Sign in</Text>
              </Link>
            </View>
          </View>
        </View>
      </View>
      <StatusBar barStyle={'dark-content'} />
    </>
  )
}

export default SignUpScreen


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "JetBrainsMono-Medium",
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  formContainer: { marginBottom: 16 },
  inputGroup: { marginBottom: 20 },
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
  inputIcon: { marginRight: 10 },
  input: {
    flex: 1,
    height: 48,
    color: COLORS.textDark,
  },
  eyeIcon: { padding: 8 },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: COLORS.textSecondary,
    marginRight: 5,
  },
  link: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
