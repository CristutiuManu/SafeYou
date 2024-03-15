import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';

export default function Home() {
  return (
    <ImageBackground source={require('../../assets/background.jpeg')} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}></Text>
        {/* <Button title="Emergency Alert" onPress={() => alert('Emergency Alert Sent!')} color="#841584" /> */}
        <Button title="Contact Authorities" onPress={() => alert('Authorities have been contacted!')} color="#841584" />
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
    justifyContent: 'space-between'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff'
  },
  subtitle: {
    fontSize: 25,
    marginBottom: 50,
    color: '#FFD700'
  },
  footer: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    color: '#fff'
  }
});
