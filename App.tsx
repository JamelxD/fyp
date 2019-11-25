import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Geolocation } from 'react-native';

const axios = require('axios').default;
class Blink extends Component {
  state = { 
    test: 'testing' 
  };

  componentDidMount() {
    axios.get('http://127.0.0.1:3000')
      .then(resp => this.setState({ test: resp.data })
    );
  }

  render() {
    return (
      <Text>{this.state.test}</Text>
    );
  }
}

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    one: null,
    two: null,
    location: {
      latitude: 0,
      longitude: 0,
    },
  }
  anotherstate = {
    one: null,
    two: null,
  }

  componentDidUpdate() {
    if (this.state.one !== null && this.state.two !== null) {
      console.log(Number(this.state.one) + Number(this.state.two));
    }
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.parse(JSON.stringify(position));
        const locationObj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        this.setState({
          location: locationObj 
        });
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title = 'Test'
          onPress = {this.findCoordinates}
        />
        <Text>Location: {this.state.location.latitude}, {this.state.location.longitude}</Text>
        <TextInput 
          keyboardType = 'numeric'
          onChangeText = {(e) => this.setState({'one': e})}
          value = {this.state.one}
          style={{ width: 400, borderColor: 'gray', borderWidth: 1 }}
        />
        <TextInput 
          keyboardType = 'numeric'
          onChangeText = {(e) => this.setState({'two': e})}
          value = {this.state.two}
          style={{ width: 400, borderColor: 'gray', borderWidth: 1 }}
        />
        <Blink />
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

