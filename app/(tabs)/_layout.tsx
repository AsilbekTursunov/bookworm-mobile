import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageProps, Platform, StyleSheet, Text, View } from 'react-native';

const TabIcon = ({
  source,
  focused,
  name,
  color
}: {
  source: any;
  focused: boolean;
  name: string;
  color: string;
}) => (
  <View>
    <Ionicons name={source} color={color} size={30} />
    {/* <Text style={{ ...styles.iconName, color }}>{name}</Text> */}
  </View>
);

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#bbec7b',
        tabBarInactiveTintColor: '#477947',
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          flexDirection: "row",
          position: "absolute",
          borderRadius: 25,
          marginHorizontal: 10,
          paddingTop: 8,
          marginVertical: 10,
          shadowColor: '#c4c4c4',
          borderWidth: 0,
          borderColor: '#94998c',
          backgroundColor: '#22291e',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 10,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon source={focused ? 'home' : 'home-outline'} focused={focused} name='Home' color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon source={focused ? 'add-circle' : 'add-circle-outline'} focused={focused} name='Create' color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <TabIcon source={focused ? 'person-circle' : 'person-circle-outline'} focused={focused} name='Profile' color={color} />,
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  iconName: {
    fontSize: 12,
    fontWeight: '500',
  }
})