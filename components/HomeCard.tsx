import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { IData } from '@/store/postStore'
import { COLORS } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'

const HomeCard = ({ book }: { book: IData }) => {
  const [more, setMore] = useState(false)
  return (
    <View style={styles.bookCard}>
      <View style={styles.userInfo}>
        <Image style={styles.avatar} src={book.user.image} />
        <Text style={styles.username}>{book.user.username}</Text>
      </View>
      <View style={styles.bookImageContainer}>
        <Image src={book.image} style={styles.bookImage} />
      </View>
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <View style={styles.ratingContainer}>
          {Array.from({ length: 5 }).map((_, index) => {
            return ( 
              <Ionicons
                name={index + 1 <= Number(book.rate) ? 'star' : 'star-outline'}
                color={index + 1 <= Number(book.rate) ? '#ecc207' : '#070707'}
                size={15}
              />
            )
          })}
        </View>
        <Text style={styles.caption}>{book.caption.length > 100 ? book.caption.slice(0, 100) : book.caption}</Text>
        <Text style={styles.date}>{moment(book.createdAt).format('LL')}</Text>
      </View>
    </View>
  )
}

export default HomeCard

const styles = StyleSheet.create({
  bookCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    marginBottom: 20,
    padding: 16, 
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
  username: {
    fontSize: 15,
    fontWeight: "600",
    textTransform: 'capitalize',
    color: COLORS.textPrimary,
  },
  bookImageContainer: {
    width: "100%",
    height: 250,
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
});