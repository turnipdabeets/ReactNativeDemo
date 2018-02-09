import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import FBSDK from 'react-native-fbsdk';

const { LoginButton, AccessToken } = FBSDK;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});

export default class App extends Component {
  state = {
    latitude: '',
    longitude: '',
    error: false
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(
          'latitude:',
          position.coords.latitude,
          'longitude:',
          position.coords.longitude
        );
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => {
        alert(error.message);
        console.log(error.message);
        this.setState({ error: error.message });
      }
      // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text>{`${this.state.latitude} ${this.state.longitude}`}</Text>
        <View>
          <LoginButton
            readPermissions={['public_profile']}
            onLoginFinished={(error, result) => {
              if (error) {
                alert('login has error: ' + result.error);
              } else if (result.isCancelled) {
                alert('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  alert(data.accessToken.toString());
                });
              }
            }}
            onLogoutFinished={() => alert('logout.')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
