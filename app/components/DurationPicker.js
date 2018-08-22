/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,

} from 'react-native';
import { Container, Header, Left, Body, Right, Icon, Button, Title,Item, Input, Form, Label,Picker } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default class DurationPicker extends Component {

  state = {
    isDateTimePickerVisible: false,
    selectedDate: '',
    selectedTime: '00:00',
    selectedHours: 0,
    selectedMinutes: 5,
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var totalminutes = (hours * 60) + minutes;
    this.props.callback(totalminutes);
    console.log('in component total duration = ' + totalminutes);
    this.setState({ selectedDate: this.formatDate(date) });
    this.setState({ selectedTime: this.formatTime(date) });
    this._hideDateTimePicker();
  };

  formatDate(value)
  {
    var d = value;
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var newDate = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate();
    //return  value.getMonth()+1 + "/" + value.getDate() + "/" + value.getYear();
    return newDate;
  }

  formatTime(value)
  {
    var d = value;
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var newTime = hours + ":" + minutes;
    //return  value.getMonth()+1 + "/" + value.getDate() + "/" + value.getYear();
    return newTime;
  }

  render() {
    const { isDateTimePickerVisible, selectedDate, selectedTime, selectedHours, selectedMinutes } = this.state;
    return (
      <View>

        <TouchableOpacity onPress={this._showDateTimePicker}>
            <View style={styles.sectionHeader}>
              <Icon name='timer' style={styles.sectionIcon}/>
                <Text style={styles.dateText}>Duration</Text>
                <Text style={styles.timeText}>{selectedTime}</Text>
            </View>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          mode={'time'}
          is24Hour = {true}
          local = {'fr'}
          date = {new Date(moment(new Date()).format("MM/DD/YYYY [00:05]"))}
          minuteInterval = {5}
          titleIOS = {'Task Duration'}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20,
    paddingRight: 10,
  },
  sectionIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },

  dateText: {
    marginLeft: 15,
    alignSelf: 'flex-start',
  },
  timeText: {
    position: 'absolute',
    right:10,
    marginTop: 5,
    textDecorationLine: 'underline',
  },


});
