import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import moment from 'moment';
import { Location } from 'expo-location';

import { Card,Dialog } from '@rneui/themed';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [currentPosition, setCurrentPosition] = useState({ latitude: null, longitude: null }); // Variabile per memorizzare la posizione attuale
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return dateTime.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const accessToken = 'TVR72eaf9rCZF6QkpEN7-NeRIZiy6X-_iN1gBlR0';
    const apiUrl = 'https://api.predicthq.com/v1/events/';

    axios
      .get(apiUrl, {
        params: {
          category: 'severe-weather'
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        setEvents(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });

    // Ottieni la posizione attuale quando il componente viene montato
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {

  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Raggio della Terra in chilometri
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distanza in chilometri
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI/180)
  };

  const filterEventsByTitle = () => {
    const filteredEvents = events.filter(event => event.title.toLowerCase().includes(searchText.toLowerCase()));

    const sortedEvents = filteredEvents.sort((a, b) => {
      const dateA = moment(a.start);
      const dateB = moment(b.start);
      return dateA - dateB;
    });

    // Calcola la distanza per ciascun evento
    const eventsWithDistance = sortedEvents.map(event => {
      const distance = calculateDistance(
        currentPosition.latitude, // Utilizza la latitudine della posizione attuale
        currentPosition.longitude, // Utilizza la longitudine della posizione attuale
        event.location.lat, // Latitudine dell'evento
        event.location.lon  // Longitudine dell'evento
      );
      return { ...event, distance };
    });

    return eventsWithDistance;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={{ ...styles.container, paddingTop: insets.top }}>
      <View style={styles.searchPanel}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by title..."
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
      </View>
      {filterEventsByTitle().map((event) => {
        const isActive = moment().isBetween(moment(event.start), moment(event.end));
        const timeRemaining = moment(event.start).fromNow();
        return (
          <TouchableOpacity key={event.id} style={styles.eventCard} onPress={() => { setSelectedEvent(event); setIsDialogVisible(true); }}>
                    <Card containerStyle={styles.cardContainer}>
                      <Card.Title><Text style={styles.eventTitle}>{event.title}</Text></Card.Title>
                      <Card.Divider />
                      <Text style={styles.eventDetail}>{event.country}</Text>
                      <Text style={styles.eventDetail}>Start Date: {formatDateTime(event.start)}</Text>
                      <Text style={styles.eventDetail}>End Date: {formatDateTime(event.end)}</Text>
                      <Text style={styles.eventDetail}>Location: {event.location}</Text>
                      <Text style={styles.eventStatus}>{isActive ? 'Event is Active' : `Time Until Start: ${timeRemaining}`}</Text>
                    </Card>
                  </TouchableOpacity>
        );
      })}
      <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
              {selectedEvent && (
                <View>
                  <Text style={styles.dialogTitle}>{selectedEvent.title}</Text>
                  <Text style={styles.dialogDetail}>Country: {selectedEvent.country}</Text>
                  <Text style={styles.dialogDetail}>Start Date: {formatDateTime(selectedEvent.start)}</Text>
                  <Text style={styles.dialogDetail}>End Date: {formatDateTime(selectedEvent.end)}</Text>
                  <Text style={styles.dialogDetail}>Location: {selectedEvent.location}</Text>

                </View>
              )}
            </Dialog>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventCard: {
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDetail: {
    fontSize: 16,
    marginBottom: 10,
  },
  eventStatus: {
    fontSize: 16,
    marginTop: 10,
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchPanel: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5
  },
   dialogTitle: {
       fontSize: 18,
       fontWeight: 'bold',
       textAlign: 'center',
       marginBottom: 10,
     },
     dialogDetail: {
       fontSize: 16,
       marginBottom: 10,
       textAlign: 'center',
     },
});

export default EventList;
