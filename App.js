import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import CreateRideScreen from './src/screens/CreateRideScreen';

// Import services
import { requestLocationPermission } from './src/services/LocationService';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // Request location permissions when the app starts
    const setupPermissions = async () => {
      try {
        await requestLocationPermission();
      } catch (error) {
        console.error('Error requesting location permission:', error);
      }
    };

    setupPermissions();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              title: 'Revvy',
              headerLargeTitle: true,
            }}
          />
          <Stack.Screen 
            name="CreateRide" 
            component={CreateRideScreen}
            options={{
              title: 'Create New Ride',
              presentation: 'modal',
            }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
