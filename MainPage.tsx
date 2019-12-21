import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const axios = require('axios').default;
export default class MainPage extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        location: {
        latitude: 0,
        longitude: 0,
        borough: '',
        },
    }

    componentWillMount() {
        navigator.geolocation.watchPosition(this.findCoordinates);
    }

    getLocation(lat, long) {
        return axios.get('http://localhost:3000/getLocation?lat=' + lat+ '&long=' + long)
        .then(response => {
            const location = {
            latitude: lat,
            longitude: long,
            borough: response.data.borough,
            };

            this.setState({
            location
            });        
        })
    }

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
        position => {
            const location = JSON.parse(JSON.stringify(position));
            const lat = location.coords.latitude;
            const long = location.coords.longitude;
            
            this.getLocation(lat, long);
        },
        error => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    render() {
        return (
        <View style={styles.container}>
            <Button
            title = 'Reload'
            onPress = {this.findCoordinates}
            />
            <Text>Location: {this.state.location.latitude}, {this.state.location.longitude}</Text>
            <Text>{this.state.location.borough}</Text>
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
});