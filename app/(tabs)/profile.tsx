import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, StatusBar, FlatList, RefreshControl, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { COLORS } from '@/constants/Colors'
import { useUserStore } from '@/store/userStore'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import moment from 'moment'
import { PUBLIC_API } from '@/constants'
import { userPostDataStore } from '@/store/postStore'
import UserPost from '@/components/UserPost'
const ProfileScreen = () => {
	const { user, setUserData } = useUserStore()
	const { posts, setPosts } = userPostDataStore()
	const [loading, setLoading] = useState(false)
	const [refreshing, setRefreshing] = useState(false)
	const [deleteId, setDeleteId] = useState('')
	const [deleteLoading, setdeleteLoading] = useState(false)

	const handleLogout = async () => {
		setLoading(true)
		await AsyncStorage.removeItem('token')
		setUserData(null)
		setLoading(false)
		router.push('/(auth)/sign-in')
	}
	if (!user) return <ActivityIndicator size={'large'} />

	const getData = async () => {
		try {
			setLoading(true)
			const response = await fetch(`${PUBLIC_API}/books/user/${user.id}`)

			if (response.ok) {
				const { data } = await response.json()

				setPosts(data)
			}
			setLoading(false)
		} catch (error) {
			console.error(error)
		}
	}
	const handleRefresh = async () => {
		setRefreshing(true)
		await getData()
		setRefreshing(false)
	}

	const deletePost = useCallback(async () => {
		// Delete post logic goes here
		setdeleteLoading(true)

		try {
			const response = await fetch(`${PUBLIC_API}/books/delete/${deleteId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (response.ok) {
				// Handle success
				if (posts) {
					setPosts(posts.filter(post => post.id !== deleteId))
				}
				setDeleteId('')

				// Alert success message
				Alert.alert('Success', 'Post is successfully deleted')
			}
		} catch (error) {
			Alert.alert('Delete', 'Error by deleting post')
		} finally {
			setdeleteLoading(false)
		}
	}, [deleteId])

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		deletePost()
	}, [deleteId])

	return (
		<>
			<View style={styles.container}>
				<View style={styles.profileHeader}>
					<Image
						source={{
							uri: user.image || 'https://api.dicebear.com/9.x/avataaars/png?seed=jamshid',
						}}
						resizeMode='contain'
						style={styles.profileImage}
					/>
					<View style={styles.profileInfo}>
						<Text style={styles.username}>{user.username}</Text>
						<Text style={styles.email}>{user.email}</Text>
						<Text style={styles.memberSince}>{moment(user.createdAt).format('LL')}</Text>
					</View>
				</View>
				<TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
					{loading ? (
						<>
							<ActivityIndicator size={'large'} color={'#fff'} />
						</>
					) : (
						<>
							<Ionicons name='log-out-outline' color={'#fff'} size={20} />
							<Text style={styles.logoutText}>Log Out</Text>
						</>
					)}
				</TouchableOpacity>
				{posts?.length && (
					<>
						<View style={styles.booksHeader}>
							<Text style={styles.booksTitle}>Your Recommendations</Text>
							<Text style={styles.booksCount}>19 Books</Text>
						</View>
					</>
				)}
				<View style={styles.postContainer}>
					{posts && (
						<FlatList
							data={posts}
							showsVerticalScrollIndicator={false}
							style={styles.listContainer}
							refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
							renderItem={({ item }) => (
								<UserPost book={item} onDelete={() => setDeleteId(item.id)} />
							)}
							keyExtractor={(item, index) => item.id?.toString() || index.toString()} // Fallback key
							ListEmptyComponent={
								<View style={styles.notFound}>
									<Ionicons
										name='book-outline'
										size={120}
										style={{ marginBottom: 40 }}
										color={'#677534'}
									/>
									<Text style={styles.notFoundText}>You have not recommended books yet</Text>
								</View>
							}
						/>
					)}
				</View>
				<StatusBar barStyle={'dark-content'} />
			</View>
			<View style={[styles.modal, { display: deleteId ? 'flex' : 'none' }]}>
				<View style={styles.modalContainer}>
					{deleteLoading ? (
						<>
							<ActivityIndicator />
						</>
					) : (
						<>
							<View style={styles.trashWrapper}>
								<Ionicons name='trash' color={'#fff'} size={30} />
							</View>
						</>
					)}
					<Text style={styles.trashText}>Do you want to delete this post</Text>
					<View style={styles.btnWrapper}>
						<TouchableOpacity style={styles.cancelBtn} onPress={() => setDeleteId('')}>
							<Text style={styles.cancelBtnText}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.deleteBtn} onPress={deletePost}>
							<Text style={styles.deleteBtnText}>Delete</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</>
	)
}

export default ProfileScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
		padding: 16,
		paddingBottom: 1,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.background,
	},
	profileHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.cardBackground,
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 3,
		borderWidth: 1,
		marginTop: 30,
		borderColor: COLORS.border,
	},
	postContainer: {
		flex: 1,
	},
	notFound: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
	},
	notFoundText: {
		fontSize: 18,
		textAlign: 'center',
		fontWeight: '600',
		color: COLORS.textPrimary,
	},
	listContainer: {},
	profileImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginRight: 16,
	},
	profileInfo: {
		flex: 1,
	},
	username: {
		fontSize: 20,
		fontWeight: '700',
		color: COLORS.textPrimary,
		marginBottom: 4,
		textTransform: 'capitalize',
	},
	email: {
		fontSize: 14,
		color: COLORS.textSecondary,
		marginBottom: 4,
	},
	memberSince: {
		fontSize: 12,
		color: COLORS.textSecondary,
	},
	logoutButton: {
		backgroundColor: COLORS.primary,
		borderRadius: 12,
		padding: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 24,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	logoutText: {
		color: COLORS.white,
		fontWeight: '600',
		marginLeft: 8,
	},
	booksHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	booksTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: COLORS.textPrimary,
	},
	booksCount: {
		fontSize: 14,
		color: COLORS.textSecondary,
	},
	booksList: {
		paddingBottom: 20,
	},
	bookItem: {
		flexDirection: 'row',
		backgroundColor: COLORS.cardBackground,
		borderRadius: 12,
		padding: 12,
		marginBottom: 12,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
		borderWidth: 1,
		borderColor: COLORS.border,
	},
	bookImage: {
		width: 70,
		height: 100,
		borderRadius: 8,
		marginRight: 12,
	},
	bookInfo: {
		flex: 1,
		justifyContent: 'space-between',
	},
	bookTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: COLORS.textPrimary,
		marginBottom: 4,
	},
	ratingContainer: {
		flexDirection: 'row',
		marginBottom: 4,
	},
	bookCaption: {
		fontSize: 14,
		color: COLORS.textDark,
		marginBottom: 4,
		flex: 1,
	},
	bookDate: {
		fontSize: 12,
		color: COLORS.textSecondary,
	},
	deleteButton: {
		padding: 8,
		justifyContent: 'center',
	},
	emptyContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 40,
		marginTop: 20,
	},
	emptyText: {
		fontSize: 16,
		fontWeight: '600',
		color: COLORS.textPrimary,
		marginTop: 16,
		marginBottom: 20,
		textAlign: 'center',
	},
	addButton: {
		backgroundColor: COLORS.primary,
		borderRadius: 12,
		paddingVertical: 12,
		paddingHorizontal: 20,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	addButtonText: {
		color: COLORS.white,
		fontWeight: '600',
		fontSize: 14,
	},
	modal: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 100,
	},
	modalContainer: {
		width: '70%',
		backgroundColor: '#fff',
		borderRadius: 16,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},
	trashWrapper: {
		backgroundColor: '#f3c0be',
		borderRadius: 50,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},
	trashText: {
		fontSize: 18,
		textAlign: 'center',
		color: '#8f0321',
	},
	cancelBtn: {
		backgroundColor: COLORS.primary,
		borderRadius: 8,
		padding: 12,
		marginTop: 16,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	cancelBtnText: {
		fontSize: 16,
		color: '#fff',
	},
	deleteBtn: {
		backgroundColor: 'red',
		borderRadius: 8,
		flex: 1,
		padding: 12,
		marginTop: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},
	deleteBtnText: {
		fontSize: 16,
		color: COLORS.white,
	},
	btnWrapper: {
		width: '100%',
		gap: 10,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
})