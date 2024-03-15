// EventList.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Replace 'YOUR_ACCESS_TOKEN' with your actual PredictHQ access token
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
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {events.map((event) => (
        <View key={event.id} style={styles.eventCard}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventLocation}>{event.country}</Text>
          <Text style={styles.eventLocation}>Start Date: {event.start}</Text>
          <Text style={styles.eventLocation}>End Date: {event.end}</Text>
          <Text style={styles.eventLocation}>Location: {event.location}</Text>
          {/* Add more event details as needed */}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 25
  },
  eventCard: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  eventLocation: {
    fontSize: 14,
    color: '#555'
  }
});

export default EventList;
