import React, { Component, cloneElement } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Routes from './Routes';
import Dialog from 'react-native-dialog';

const MARKER_IMAGE = require('./assets/baseline_accessible_black_48dp.png');
export default class MapPage extends Component {
  state = {
    showDialogs: {
      addToMap: false,
      getParkingType: false,
    },
    markers: [],
  }

  constructor(props) {
    super(props);

    this.removeDisabledBadge = this.removeDisabledBadge.bind(this);
    this.showParkingTypeDialog = this.showParkingTypeDialog.bind(this);
    this.sendParkingSpaceForReview = this.sendParkingSpaceForReview.bind(this);
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

  addDisabledBadgeLocally(coordinates) {
    const obj = {
      id: {
        N: this.state.markers.length + 1,
      },
      latitude: {
        N: coordinates.latitude,
      },
      longitude: {
        N: coordinates.longitude
      },
      type: {
        S: ''
      },
    }

    this.setState({
      markers: this.state.markers.concat(obj),
      showDialogs: {
        addToMap: true,
        getParkingType: false,
      },
    });
  }

  showParkingTypeDialog() {
    this.setState({
      showDialogs: {
        addToMap: false,
        getParkingType: true,
      },
    });
  }

  removeDisabledBadge() {
    const markers = this.state.markers.slice(0, -1);
    this.setState({
      markers,
      showDialogs: {
        addToMap: false,
        getParkingType: false,
      },
    });
  }

  sendParkingSpaceForReview(e, parkingType) {
    const marker = this.state.markers.pop();
    marker.type.S = parkingType;
    this.setState({
      markers: this.state.markers.concat(marker),
      showDialogs: {
        addToMap: false,
        getParkingType: false,
      },
    }, () => {
      Routes.sendDisabledParkingSpaceForRequest(marker)
    });
  }

  renderDialogs() {
    if (this.state.showDialogs.addToMap) {
      return (
        <Dialog.Container visible={true}>
          <Dialog.Title>Add a parking spot to the online map?</Dialog.Title>
          <Dialog.Description>
            Submit to online map which will be under review
          </Dialog.Description>
          <Dialog.Button label="No" onPress={this.removeDisabledBadge} />
          <Dialog.Button label="Yes" onPress={this.showParkingTypeDialog} />
        </Dialog.Container>
      );
    }

    if (this.state.showDialogs.getParkingType) {
      return (
        <Dialog.Container visible={true}>
          <Dialog.Title>Specify type of parking to add</Dialog.Title>
          <Dialog.Description>
            Parking Bay or section of road where one can park or Car park free for Disabled badge users.
        </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.removeDisabledBadge} />
          <Dialog.Button label="Parking Bay" onPress={(e) => this.sendParkingSpaceForReview(e, 'Parking Bay')} />
          <Dialog.Button label="Car Park" onPress={(e) => this.sendParkingSpaceForReview(e, 'Car Park')} />
        </Dialog.Container>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderDialogs()}
        <MapView
          provider={'google'}
          style={styles.mapStyle}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          minZoomLevel={16}
          loadingEnabled={true}
          onLongPress={(e) => this.addDisabledBadgeLocally(e.nativeEvent.coordinate)}
        >
          {this.state.markers.length > 0 ?
            this.state.markers.map(marker => (
              <Marker
                key={Number(marker.id.N)}
                coordinate={{ latitude: Number(marker.latitude.N), longitude: Number(marker.longitude.N) }}
                title={"Disabled Parking"}
                description={marker.type.S}
                icon={MARKER_IMAGE}
              >
              </Marker>

            ))
            : null
          }
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