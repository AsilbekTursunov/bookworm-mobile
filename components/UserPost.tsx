import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { IData, userPostDataStore } from '@/store/postStore'
import { COLORS } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import { PUBLIC_API } from '@/constants'

const UserPost = ({ book, onDelete }: { book: IData, onDelete: () => void }) => {
  const [more, setMore] = useState(false)


  return (
    <>
      <View style={styles.bookCard}>
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
          <Text style={styles.caption}>{book.caption.length > 60 ? `${book.caption.slice(0, 60)}...` : book.caption}</Text>
          <Text style={styles.date}>{moment(book.createdAt).format('LL')}</Text>
          <View style={styles.trashContainer}>
            <TouchableOpacity style={styles.trashButton} onPress={onDelete}>
              <Ionicons
                name={'trash'}
                size={18}
                color={'#910326'}
                onPress={() => setMore(!more)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

export default UserPost

const styles = StyleSheet.create({
  bookCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    marginBottom: 20,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    gap: 10,
    borderColor: COLORS.border,
  },
  bookHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  bookImageContainer: {
    width: "30%",
    height: 160,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: COLORS.border,
  },
  bookImage: {
    width: "100%",
    height: "100%",
  },
  bookDetails: {
    display: 'flex',
    flex: 1,
    gap: 3,
    flexDirection: 'column',
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  bookTitle: {
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  ratingContainer: {
    flexDirection: "row",
    display: 'flex',
    gap: 5
  },
  caption: {
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  trashContainer: {
    flexDirection: "row",
    display: 'flex',
    gap: 5,
    width: '100%',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  trashButton: {
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 5,
    marginLeft: 10,
  },
  modal: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
  }
});