const axios = require('axios').default;

const BASE_URL = 'http://localhost:3000';

class Routes {
    static getLocation(lat, long) {
        return axios.get(BASE_URL + '/getLocation?lat=' + lat + '&long=' + long)
          .then(response => {
            return response;        
          })
    }
}