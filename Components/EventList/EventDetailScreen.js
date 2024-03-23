import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Card, Chip } from '@rneui/themed';

const EventDetailScreen = ({ route }) => {
  const { selectedEvent } = route.params;
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return dateTime.toLocaleDateString('en-US', options);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title><Text style={styles.title}>{selectedEvent.title}</Text></Card.Title>
        <Text style={styles.detail}>Country: {selectedEvent.country}</Text>
         <Card.Divider />
        <Text style={styles.detail}>Start Date: {formatDateTime(selectedEvent.start)}</Text>
        <Text style={styles.detail}>End Date: {formatDateTime(selectedEvent.end)}</Text>
        <Text style={styles.detail}>Location: {selectedEvent.location}</Text>

        <Text style={styles.detail}>Description: {selectedEvent.description}</Text>
        <Chip title={selectedEvent.category} containerStyle={{ marginVertical: 15 }} />

        {userLocation && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>Latitude: {userLocation.latitude}</Text>
            <Text style={styles.locationText}>Longitude: {userLocation.longitude}</Text>
          </View>
        )}

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation ? userLocation.latitude : 37.78825,
            longitude: userLocation ? userLocation.longitude : -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: userLocation ? userLocation.latitude : 37.78825,
            longitude: userLocation ? userLocation.longitude : -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {selectedEvent.latitude && selectedEvent.longitude && (
            <Marker
              coordinate={{
                latitude: selectedEvent.latitude,
                longitude: selectedEvent.longitude,
              }}
              title={selectedEvent.title}
            />
          )}

          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="Your Location"
              pinColor="blue"
            />
          )}
        </MapView>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  card: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    width: '90%',
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  map: {
    flex: 1,
    width: '100%', // Imposta la larghezza della mappa al 100% del suo contenitore
    aspectRatio: 1, // Mantiene l'aspetto quadrato della mappa
  },
  locationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  locationText: {
    fontSize: 16,
  },
});

export default EventDetailScreen;
