import React, { Component } from 'react';
import { Notifications } from 'expo';
import MainPage from './MainPage'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = 'background-location-task';
let location = null;

export default class App extends Component {
  async startLocationUpdatesAsync() {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME);
  }

  static getLocation() {
    axios.get(Routes.getLocation(location.lat, location.lat))
      .then(response => {
        if (location.borough !== response.data.borough) {
          const notification = {
            title: 'Welcome to ' + response.data.borough + '!',
            body: 'Tap me to open the app.',
            ios: { sound: true },
          };
          
          Notifications.scheduleLocalNotificationAsync(notification, { time: Date.now() + 2500 });
        }
  
        location = {
          latitude: location.lat,
          longitude: location.lat,
          borough: response.data.borough,
        };
      });
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
  }

  render() {
    return (
      <MainPage></MainPage>
    );
  }
}

if (!TaskManager.isTaskDefined(LOCATION_TASK_NAME)) {
  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      return;
    }
    
    if (data) {
      location = {
        lat: data['locations'].coords.latitude,
        long: data['locations'].coords.longitude,
        borough: '',
      };

      App.getLocation();
    }
  }
)};