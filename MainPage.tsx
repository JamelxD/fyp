import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import Routes from './Routes';

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
    }

    constructor(props) {
        super(props);
        this.getBorough();
    }

    async getBorough() {
        const borough = await AsyncStorage.getItem('location-borough');
        this.setState({
            boroughName: borough
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
        return (
            <View style={styles.container}>
                <Text>{this.state.boroughName}</Text>
                <Text>Disabled Badge Parking Limit: {this.state.data.disabled_badge_parking_limit.N}</Text>
                <Text>PCN Prices: {this.state.data.pcn_prices.N}</Text>
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