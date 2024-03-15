import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import Home from './Components/Home/HomeComponent';
import PredictHQEvents from './Components/API/PredictHQEvents';
import EventList from './Components/EventList/EventList';

export default function App() {
  return (
    <View style={styles.container}>
      <EventList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
