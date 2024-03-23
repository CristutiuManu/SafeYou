import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import EventList from './Components/EventList/EventList';
import Home from './Components/Home/HomeComponent';
import SignUp from './Components/Auth/SignUp';
import SignIn from './Components/Auth/SignIn';
import EventDetailScreen from './Components/EventList/EventDetailScreen';
export default function App() {
  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ title: 'Welcome' }} />
          <Stack.Screen name="EventList" component={EventList} options={{ title: 'Events' }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
          <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'Sign In' }} />
          <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: 'Event Detail' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
