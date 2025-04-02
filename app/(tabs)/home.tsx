import { View, Text, StyleSheet, ScrollView, Image, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { PUBLIC_API } from '@/constants'
import { COLORS } from '@/constants/colors'
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons'
import { useDataStore } from '@/store/postStore'
import HomeCard from '@/components/HomeCard'
import { FlatList } from 'react-native'

const HomeScreen = () => {
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState<number>(5)
  const [page, setPage] = useState<number>(1)
  const { data, setData } = useDataStore()
  const [refreshing, setRefreshing] = useState(false)

  const getData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${PUBLIC_API}/books/all?page=${page}&limit=${limit}`)

      if (response.ok) {
        const { data } = await response.json()

        setData(data);
        setLimit(limit + 1); // 📌 Limitni 5 taga oshirish
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
    setLimit(5)
    setPage(1)
  } 

  return (
    <View style={styles.container}>

      <>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>BookWorm🐛</Text>
          <Text style={styles.headerSubtitle}>Share your favourite reads</Text>
        </View>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          style={styles.listContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          renderItem={({ item }) => <HomeCard book={item} />}
          onEndReached={getData} // 📌 Pastga tushganda yangi data olish  
          ListFooterComponent={loading || refreshing ? <ActivityIndicator size="large" color="#0ff373" /> : null} // 📌 Loader ko‘rsatish
          keyExtractor={(item, index) => item.id?.toString() || index.toString()} // Fallback key
          ListEmptyComponent={
            <View style={styles.notFound}>
              <Ionicons
                name="book-outline"
                size={120}
                style={{ marginBottom: 40 }}
                color={'#677534'}
              />
              <Text style={styles.notFoundText}>No books found.</Text>
            </View>
          }
        />
      </>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
    marginBottom: 80
  },
  header: {
    marginBottom: 10,
    alignItems: "center",
    marginTop: 40
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "JetBrainsMono-Medium",
    letterSpacing: 0.5,
    color: COLORS.primary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  bookCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    marginBottom: 20,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bookHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  username: {
    fontSize: 15,
    fontWeight: "600",
    textTransform: 'capitalize',
    color: COLORS.textPrimary,
  },
  bookImageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 10,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: COLORS.border,
  },
  bookImage: {
    width: "100%",
    height: "100%",
  },
  bookDetails: {
    padding: 4,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 8,
    display: 'flex',
    gap: 5
  },
  caption: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 8,
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  footerLoader: {
    marginVertical: 20,
  },
});