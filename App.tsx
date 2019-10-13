import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
  render() {
    return (
      <View style={styles.container}>
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