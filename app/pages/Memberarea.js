/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Alert,

} from 'react-native';

import Tasklist from '../components/Tasklist';
import {Actions} from 'react-native-router-flux';

export default class Memberarea extends Component {

  constructor(props){
    super(props);
    this.state = {
      userid: -1,
      token: ''
    }
  }

  componentDidMount(){
    this._loadInitialState().done();
  }

_loadInitialState = async () => {
  var value = await AsyncStorage.getItem('userinfo');
  if (value !== null){
    var userinfo = JSON.parse(value);
    //Alert.alert(userinfo);
    this.setState(previousState => {
        return { userid: Number(userinfo.userid), token: userinfo.token };
      });
    //
    // console.log(userinfo.userid);
    // console.log(userinfo.token);
  }
}

addNewTask() {
    Actions.newtask();
}

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}> - Note - </Text>
          </View>
          <ScrollView style={styles.schoolContainer}>

          </ScrollView>
          <View style={styles.footer}>
              <TextInput
                  style={styles.textInput}
                  placeholder='>note'
                  placeholderTextColor='white'
                  underlineColorAndroid='transparent'>
              </TextInput>

          </View>
          <TouchableOpacity style={styles.addButton} onPress={this.addNewTask}>
              <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    padding: 26,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#E91E63',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },

});
