import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../../assets/background.jpeg')} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to SafeYOU</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EventList')} style={styles.button}>
          <Text style={styles.buttonText}>View Events</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by University Of Trento</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  content: {
    flex: 0.3, // Adjusted flex value
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    marginVertical: '30%' // Added vertical margins
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  button: {
    backgroundColor: '#841584',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },
  footer: {
    position: 'absolute', // Added position absolute
    bottom: 0, // Ensure footer is at the bottom
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    color: '#fff',
    fontSize: 18
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
});
