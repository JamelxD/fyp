import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import App from './App';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
    }

    findCoordinates = () => {
        var borough = '';
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.parse(JSON.stringify(position));
                const lat = location.coords.latitude;
                const long = location.coords.longitude;
                
                // borough = App.getLocation(lat, long);
            },
            error => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

        return borough;
    };

    render() {
        return (
        <View style={styles.container}>
            <Text>Test</Text>
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