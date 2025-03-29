import React, { useEffect } from 'react'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUserStore } from '@/store/userStore'
import Loader from '@/components/Loader'
import { PUBLIC_API } from '@/constants'
import { Alert } from 'react-native'

const MainPage = () => {
  const { setUserData } = useUserStore()


  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      // console.log(token);

      if (!token) {
        router.replace("/(auth)/sign-in"); // 🔴 Redirect ishlaydi 
      }
      try {
        const response = await fetch(`${PUBLIC_API}/auth/refresh`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }); 
        if (response.ok) {
          const data = await response.json();
          await AsyncStorage.setItem("token", data.token);
          setUserData(data.user);
          router.replace("/(tabs)/home"); // 🔴 Redirect ishlaydi
        } else {
          router.replace("/(auth)/sign-in");
        }
      } catch (error: any) {
        Alert.alert('Sign in error', error.message)
        router.replace("/(auth)/sign-in");
      }
    })();
  }, []);

  return <Loader />;
}

export default MainPage

