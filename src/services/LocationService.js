import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TRACKING = 'location-tracking';

export const requestLocationPermission = async () => {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus !== 'granted') {
    return false;
  }

  const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
  return backgroundStatus === 'granted';
};

export const getCurrentLocation = async () => {
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High
  });
  return location;
};

TaskManager.defineTask(LOCATION_TRACKING, ({ data: { locations }, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (locations && locations.length > 0) {
    const location = locations[locations.length - 1];
    // Process the location update
    console.log('Location Update:', location);
  }
});

export const startLocationTracking = async (callback) => {
  const { granted } = await Location.getBackgroundPermissionsAsync();
  if (!granted) {
    console.log('Location tracking denied');
    return;
  }

  await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
    accuracy: Location.Accuracy.Balanced,
    timeInterval: 5000,
    distanceInterval: 10,
    foregroundService: {
      notificationTitle: 'Revvy',
      notificationBody: 'Tracking your ride location',
    },
  });

  return Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 5000,
      distanceInterval: 10,
    },
    callback
  );
};

export const stopLocationTracking = async () => {
  await Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
};
