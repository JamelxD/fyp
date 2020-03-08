import React, { Component } from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { StyleSheet, Text, View, AsyncStorage, Dimensions } from 'react-native';
import Routes from './Routes';

export default class MainPage extends Component {
  state = {
    boroughName: '',
    data: {
      disabled_badge_parking_limit: {
        N: null,
      },
      pcn_prices: {
        N: null,
      },
    },
  }

  constructor(props) {
    super(props);

    this.getBorough = this.getBorough.bind(this);
  }

  componentDidMount() {
    this.getPermissions();
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
    
    if (permissions.location.status === 'granted') {
      Location.watchPositionAsync({}, (location) => {this.updateLocation(location)})
    }
  };


  async updateLocation(location) {
    const lat = location.coords.latitude;
    const long = location.coords.longitude;

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

    if (this.state.boroughName !== newBorough) {
      this.setState({
        boroughName: newBorough,
      }, this.getBoroughInfo);
    }
  }

  async getBorough() {
    const borough = await AsyncStorage.getItem('location-borough');
    this.setState({
      boroughName: borough,
    });

    this.getBoroughInfo();
  }

  async getBoroughInfo() {
    Routes.getBoroughInfo(this.state.boroughName)
      .then(response => {
        this.setState({
          data: response.data,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.boroughName}</Text>
        <Text>Disabled Badge Parking Limit: {this.state.data.disabled_badge_parking_limit.N}</Text>
        <Text>PCN Prices: {this.state.data.pcn_prices.N}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});