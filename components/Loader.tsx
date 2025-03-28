import { StyleSheet, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
const Loader = () => {
  return (
    <View style={styles.container}>
      <LottieView style={styles.loader} source={require('../assets/icons/loading.json')} autoPlay loop />
    </View>
  )
} 
export default Loader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: '100%',
    zIndex: 100,
    backgroundColor: '#f1f8f2',
    position: 'absolute'
  },
  loader: {
    width: 300,
    height: 500,
  },
})


