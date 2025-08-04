import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TabIcon = ({
	source,
	focused,
	name,
	color,
}: {
	source: any
	focused: boolean
	name: string
	color: string
}) => (
	<View>
		<Ionicons name={source} color={color} size={30} />
		{/* <Text style={{ ...styles.iconName, color }}>{name}</Text> */}
	</View>
)

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: '#bbec7b',
				tabBarInactiveTintColor: '#477947',
				tabBarShowLabel: false,
				tabBarStyle: {
					borderTopWidth: 0,
					borderColor: '#ff0303',
					borderWidth: 1,
				},
			}}
		>
			<Tabs.Screen
				name='home'
				options={{
					title: 'Home',
					headerShown: false,
					tabBarIcon: ({ color, focused }) => (
						<TabIcon
							source={focused ? 'home' : 'home-outline'}
							focused={focused}
							name='Home'
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='create'
				options={{
					title: 'Create',
					headerShown: false,
					tabBarIcon: ({ color, focused }) => (
						<TabIcon
							source={focused ? 'add-circle' : 'add-circle-outline'}
							focused={focused}
							name='Create'
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profile',
					headerShown: false,
					tabBarIcon: ({ color, focused }) => (
						<TabIcon
							source={focused ? 'person-circle' : 'person-circle-outline'}
							focused={focused}
							name='Profile'
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	)
}

const styles = StyleSheet.create({
	iconName: {
		fontSize: 12,
		fontWeight: '500',
	},
})

//**
// tabBarStyle: {
//   height: 50,
//   position: "absolute",
//   borderRadius: 15,
//   marginHorizontal: 10,
//   paddingTop: 4,
//   marginVertical: 4,
//   borderWidth: 0,
//   backgroundColor: '#22291e',
// },
// */
