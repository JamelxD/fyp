import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Routes from './Routes';

const MARKER_IMAGE = require('./assets/baseline_accessible_black_48dp.png');
export default class MapPage extends Component {
    state = {
        markers: [],
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getDisabledParkingMarkers();
    }

    async getDisabledParkingMarkers() {
        Routes.getDisabledParkingLocations()
            .then(response => {
                this.setState({
                    markers: response.data.Items,
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>
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
                            key={Number(marker.id.N)}
                            coordinate={{ latitude: Number(marker.latitude.N), longitude: Number(marker.longitude.N) }}
                            title={"Disabled Parking"}
                            description={marker.type.S}
                            icon={MARKER_IMAGE}
                        >
                        </Marker>

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
        marginBottom: 82,
    },
});