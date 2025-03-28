import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '@/constants/colors'
import InputField from '@/components/InputField'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

const CreateScreen = () => {
  const [title, setTitle] = useState<string>('')
  const [rate, setRate] = useState<number>(1)
  const [image, setImage] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [image64, setImage64] = useState<string>('')
  const [description, setDescription] = useState<string>('')



  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setImage64(`data:${result.assets[0].mimeType};base64,` + result.assets[0].base64)
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewStyle}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Book Recommendation</Text>
            <Text style={styles.subtitle}>Share your favorite with others</Text>
          </View>
          <View>
            <View>
              <InputField
                label='Book Title'
                value={title}
                onChangeText={setTitle}
                icon={'book-outline'}
                placeholder='Enter book title'
                iconSize={20}
              />
              <Text>&nbsp;</Text>
              <Text style={styles.label}>Your Rating</Text>
              <View style={styles.ratingContainer}>
                {Array.from({ length: 5 }).map((_, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => setRate(index + 1)}>
                      <Ionicons
                        name={index + 1 <= rate ? 'star' : 'star-outline'}
                        color={index + 1 <= rate ? '#ecc207' : '#070707'}
                        size={30}
                      />
                    </TouchableOpacity>
                  )
                })}
              </View>
              <Text>&nbsp;</Text>
              <Text style={styles.label}>Book Image</Text>
              <View style={styles.imagePicker}>
                {image ?
                  <>
                    <Image src={image} style={styles.previewImage} />
                  </>
                  :
                  <TouchableOpacity style={styles.openImagePicker} onPress={pickImage}>
                    <Ionicons size={30} name='image' color='#688f68' />
                    <Text style={styles.placeholderText}>Tab select image</Text>
                  </TouchableOpacity>
                }
              </View>
              <Text>&nbsp;</Text>
              <View>
                <Text style={styles.label}>Caption</Text>
                <TextInput 
                  style={styles.textArea}
                  value={description}
                  onChangeText={setDescription}
                  placeholder='Write your review or thoughts about this book...' 
                  multiline 
                  textAlignVertical='top'
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default CreateScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 10,
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginTop: 50,
    marginHorizontal: 3,
    marginVertical: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  }, 
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
    color: COLORS.textDark,
  },
  textArea: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    height: 100,
    color: COLORS.textDark,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 8,
    paddingVertical: 14
  },
  starButton: {
    padding: 8,
  },
  imagePicker: {
    width: "100%",
    height: 200,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  openImagePicker: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  placeholderContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 50,
    flexDirection: "row",
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
  buttonIcon: {
    marginRight: 8,
  },
});