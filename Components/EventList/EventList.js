import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

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
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={{ ...styles.container, paddingTop: insets.top }}>
      {events.map((event) => (
        <View key={event.id} style={styles.eventCard}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDetail}>{event.country}</Text>
          <Text style={styles.eventDetail}>Start Date: {event.start}</Text>
          <Text style={styles.eventDetail}>End Date: {event.end}</Text>
          <Text style={styles.eventDetail}>Location: {event.location}</Text>
          {/* Add more event details as needed */}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  eventCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
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
    marginBottom: 10
  },
  eventDetail: {
    fontSize: 16,
    marginBottom: 5
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default EventList;
