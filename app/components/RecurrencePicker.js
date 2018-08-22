/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,

} from 'react-native';
import { Icon,Picker } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default class RecurrencePicker extends Component {

  state = {
    selected: undefined,
  };


  onValueChange(value: string){
    this.setState({
      selected: value
    });
    this.setCallback();
  }

  setCallback = () =>{
    this.props.callback(this.state.selected);
  }

  render() {
    const { selected } = this.state;
    return (
      <View>

        <TouchableOpacity onPress={this._showDateTimePicker}>
            <View style={styles.sectionHeader}>
              <Icon name='refresh' style={styles.sectionIcon}/>
              <Picker
                  mode="dropdown"
                  placeholder="Does not repeat"
                  note={false}
                  textStyle={styles.pickerTextStyle}
                  itemTextStyle={styles.itemStyle}
                  style={styles.pickerStyle}
                  placeholderStyle={styles.placeholderStyle}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
              >
                  <Picker.Item label="Does not repeat" value="0" />
                  <Picker.Item label="Every day" value="1" />
                  <Picker.Item label="Every week day" value="2" />
                  <Picker.Item label="Every week" value="3" />
                  <Picker.Item label="Every month" value="4" />
                  <Picker.Item label="Every year" value="5" />
            </Picker>
            </View>
        </TouchableOpacity>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    marginLeft: 20,
    paddingRight: 10,
  },
  sectionIcon: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },

  dateText: {
    marginLeft: 15,
    alignSelf: 'flex-start',
  },
  pickerTextStyle: {
    fontSize: 15,
  },
  pickerStyle: {
    top:0,
  },
  placeholderStyle: {
    top: 0,
    marginTop: 0 ,
  },
  itemStyle: {
    fontSize: 12,
    color: 'blue',
  }

});
