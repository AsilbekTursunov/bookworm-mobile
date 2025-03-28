import React, { useEffect } from 'react' 
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUserStore } from '@/store/userStore'
import Loader from '@/components/Loader'

const MainPage = () => {
  const { setUserData } = useUserStore() 

  
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token"); 
      if (!token) {
        router.replace("/(auth)/sign-in"); // 🔴 Redirect ishlaydi
        return;
      } 
      try {
        const response = await fetch("http://192.168.0.106:8081/api/refresh", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }); 
        const data = await response.json(); 
        if (response.ok) {
          await AsyncStorage.setItem("token", data.token);
          setUserData(data.user);
          router.replace("/(tabs)/home"); // 🔴 Redirect ishlaydi
        } else {
          router.replace("/(auth)/sign-in");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        router.replace("/(auth)/sign-in");
      }
    })();
  }, []);

  return <Loader/>; 
}

export default MainPage

