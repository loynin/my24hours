import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import Routes from './app/Routes';
import Logo from './app/components/Logo';
import Login from './app/pages/Login';
import Signup from './app/pages/Signup';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <Routes />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#fff',
  }
});
