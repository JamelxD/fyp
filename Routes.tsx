const axios = require('axios').default;

const BASE_URL = 'http://localhost:3000';

export default class Routes {
  static getLocation(lat, long) {
    console.log('getLocation');
    return axios.get(BASE_URL + '/getLocation?lat=' + lat + '&long=' + long)
      .then(response => {
        return response;
      })
  }

  static getBoroughInfo(boroughName) {
    console.log('getBoroughInfo');
    return axios.get(BASE_URL + '/getBoroughInfo?boroughName=' + boroughName)
      .then(response => {
        return response;
      });
  }

  static getDisabledParkingLocations() {
    console.log('getDisabledParkingLocations');
    return axios.get(BASE_URL + '/getDisabledParkingLocations')
      .then(response => {
        return response;
      });
  }
}