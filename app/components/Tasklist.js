/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,

} from 'react-native';

export default class Tasklist extends Component {
  render() {
    return (
      <View key={this.props.keyval} style={styles.note}>
        <Text style={styles.noteText}>{this.props.val.date}</Text>
        <Text style={styles.noteText}>{this.props.val.note}</Text>
        <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
            <Text style={styles.noteDeleteText}>DELETE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    position: 'absolute',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
  },
  noteText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#E91E63',
  },
  noteDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292929',
    padding: 10,
    top:10,
    bottom: 10,
    right: 10,
  },
  noteDeleteText:{
    color: '#fff',
  }
});
