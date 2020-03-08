import { Platform, PlatformIOSStatic } from 'react-native'
const axios = require('axios').default;

let BASE_URL = 'http://localhost:3000';
if (Platform.OS !== 'ios') {
  BASE_URL = 'http://10.0.2.2:3000';
}

export default class Routes {
  static getLocation(lat, long) {
    return axios.get(BASE_URL + '/getLocation?lat=' + lat + '&long=' + long)
      .then(response => {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static getBoroughInfo(boroughName) {
    return axios.get(BASE_URL + '/getBoroughInfo?boroughName=' + boroughName)
      .then(response => {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static getDisabledParkingLocations() {
    return axios.get(BASE_URL + '/getDisabledParkingLocations')
      .then(response => {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static sendDisabledParkingSpaceForRequest(marker) {
    return axios.post(BASE_URL + '/sendLocationEmail', {
        data: marker
      })
      .then(response => {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}