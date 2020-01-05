import React, { Component } from 'react';
import { Notifications } from 'expo';
import MainPage from './MainPage'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import Routes from './Routes';
import { AsyncStorage } from 'react-native';

const LOCATION_TASK_NAME = 'background-location-task';
if (!TaskManager.isTaskDefined(LOCATION_TASK_NAME)) {
  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      console.log(error);
      return;
    }
    
    if (data) {
      const coords = data['locations'][0].coords;
      App.getLocation(coords.latitude, coords.longitude);
    }
  }
)};

export default class App extends Component {
  async startLocationUpdatesAsync() {
    await this.getPermissions();
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME);
  }

  async getPermissions() {
    const { status, expires, permissions } = await Permissions.getAsync(
      Permissions.LOCATION,
      Permissions.NOTIFICATIONS
    );
  
    if (status !== 'granted') {
      const { status, permissions } = await Permissions.askAsync(
        Permissions.LOCATION,
        Permissions.NOTIFICATIONS,
      );
    }
  };

  static async getLocation(lat, long) {
    const existingBorough = await AsyncStorage.getItem('location-borough');
    var newBorough = null;
    await Routes.getLocation(lat, long)
      .then(response => {
        try {
          newBorough = response.data.borough;
        } catch (e) {
          console.log(e);
        }
      }
    );

    await AsyncStorage.setItem('location-lat', String(lat));
    await AsyncStorage.setItem('location-long', String(long));
    if (existingBorough !== newBorough) {
      await AsyncStorage.setItem('location-borough', String(newBorough));
      const notification = {
        title: 'Welcome to ' + newBorough + '!',
        body: 'Tap me to open the app.',
        ios: { sound: true },
      };
      
      Notifications.scheduleLocalNotificationAsync(notification, { time: Date.now() + 2500 });
    }
  }

  componentDidMount() {
    this.startLocationUpdatesAsync();
    navigator.geolocation.getCurrentPosition(
      position => {
        App.getLocation(position.coords.latitude, position.coords.longitude);
      },
    );
  }

  render() {
    return (
      <MainPage/>
    );
  }
} 