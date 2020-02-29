import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, Dimensions } from 'react-native';
import Routes from './Routes';
import MapView, { Marker } from 'react-native-maps';

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
        markers: [
            {
                key: 0,
                lat: 51.514226,
                long: -0.109378,
                title: 'Test',
                description: 'Test'
            },
            {
                key: 1,
                lat: 51.514626,
                long: -0.109378,
                title: 'Test',
                description: 'Test'
            }
        ],
    }

    constructor(props) {
        super(props);
        this.getBorough();
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
        console.log(this.state);
        return (
            <View style={styles.container}>
                {/* <Text>{this.state.boroughName}</Text>
                <Text>Disabled Badge Parking Limit: {this.state.data.disabled_badge_parking_limit.N}</Text>
                <Text>PCN Prices: {this.state.data.pcn_prices.N}</Text> */}
                <MapView
                    provider={'google'}
                    style={styles.mapStyle}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsMyLocationButton={true}
                    minZoomLevel={16}
                    loadingEnabled={true}
                >
                    {this.state.markers.map(marker => (
                    <Marker
                        coordinate={{latitude: marker.lat, longitude: marker.long}}
                        title={marker.title}
                        description={marker.description}
                    />
                    ))}
                </MapView>
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