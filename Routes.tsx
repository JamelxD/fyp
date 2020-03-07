const axios = require('axios').default;

const BASE_URL = 'http://localhost:3000';

export default class Routes {
  static getLocation(lat, long) {
    return axios.get(BASE_URL + '/getLocation?lat=' + lat + '&long=' + long)
      .then(response => {
        return response;
      })
  }

  static getBoroughInfo(boroughName) {
    return axios.get(BASE_URL + '/getBoroughInfo?boroughName=' + boroughName)
      .then(response => {
        return response;
      });
  }

  static getDisabledParkingLocations() {
    return axios.get(BASE_URL + '/getDisabledParkingLocations')
      .then(response => {
        return response;
      });
  }
}