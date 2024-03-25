import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import moment from 'moment';
import { Card, Chip } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

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
  }, []);

  const filterEventsByTitle = () => {
    const filteredEvents = events.filter((event) => event.title.toLowerCase().includes(searchText.toLowerCase()));

    const sortedEvents = filteredEvents.sort((a, b) => {
      const dateA = moment(a.start);
      const dateB = moment(b.start);
      return dateA - dateB;
    });

    return sortedEvents;
  };

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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        filterEventsByTitle().map((event) => {
          const isActive = moment().isBetween(moment(event.start), moment(event.end));
          const timeRemaining = moment(event.start).fromNow();
          return (
            <TouchableOpacity
              key={event.id}
              style={styles.eventCard}
              onPress={() => {
                setSelectedEvent(event);
                navigation.navigate('EventDetail', { selectedEvent: event });
              }}
            >
              <Card containerStyle={styles.cardContainer}>
                <Card.Title>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                </Card.Title>
                <Card.Divider />
                <Text style={styles.eventDetail}>{event.country}</Text>
                <Text style={styles.eventDetail}>Start Date: {formatDateTime(event.start)}</Text>
                <Text style={styles.eventDetail}>End Date: {formatDateTime(event.end)}</Text>
                <Text style={styles.eventDetail}>Location: {event.location}</Text>
                <Text style={styles.eventStatus}>
                  {isActive ? 'Event is Active' : `Time Until Start: ${timeRemaining}`}
                </Text>
                <Chip title="PUBLIC ALERT" containerStyle={{ marginVertical: 15 }} />
                <Chip title={event.category} containerStyle={{ marginVertical: 15 }} />
              </Card>
            </TouchableOpacity>
          );
        })
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  eventCard: {
    marginBottom: 20
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
    fontWeight: 'bold'
  },
  eventDetail: {
    fontSize: 16,
    marginBottom: 10
  },
  eventStatus: {
    fontSize: 16,
    marginTop: 10,
    fontStyle: 'italic'
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
  }
});

export default EventList;
