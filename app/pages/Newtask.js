/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';
import { Container, Header, Left, Body, Right, Icon, Button, Title,Item, Input, Form, Label,Picker } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DurationPicker from '../components/DurationPicker';
import RecurrencePicker from '../components/RecurrencePicker';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';

export default class Newtask extends Component {

  state = {
    isDateTimePickerVisible: false,
    selectedDate: moment(new Date()).format("dddd[,] MMM Do"),
    selectedTime: moment(new Date()).format("HH:MM"),
    data_date: moment().format('L'),
    data_time: moment().format('LT'),
    duration: 0,
    title: '',
    description: '',
    recurrence: 0,
    userid: -1,
  };

  //Loading userid from saving AsyncStorage
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

      console.log(userinfo.userid);
      console.log(userinfo.token);
    }
  }

  // duration_response function use to set the duration
  // while DurationPicker is selected
  duration_response(myduration){
    this.setState({duration: myduration});
  }

  // recurrence_response function use to set recurrence
  // while RecurrencePicker is selected.
  recurrence_response(myrecurrence){
    this.setState({
      recurrence: parseInt(myrecurrence),
    });
    console.log('myrecurrence=' + myrecurrence);
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ selectedDate: this.formatDate(date) });
    this.setState({ selectedTime: this.formatTime(date) });
    this.setState({ data_date: this.formatDate(date,1)});
    this.setState({ data_time: this.formatTime(date,1)})
    this._hideDateTimePicker();
  };

  formatDate(value,formattype = 0)
  {
    var d = value;
    if (formattype == 0){
      var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var newDate = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate();
      return newDate;
    }
    var newDate = d.getYear() + "-" + d.getMonth() + "-" + d.getDay();
    return newDate;
    //return  value.getMonth()+1 + "/" + value.getDate() + "/" + value.getYear();

  }



  formatTime(value, formattype = 0)
  {

    var d = value;
    var hours = d.getHours();
    var minutes = d.getMinutes();
    if (formattype == 0 ){
      var newTime = hours + ":" + minutes;
      return newTime;
    }
    var newTime = hours + ":" + minutes + ":" + 0;
    return newTime;
    //return  value.getMonth()+1 + "/" + value.getDate() + "/" + value.getYear();
  }
  goBack() {
      Actions.pop();
  }

  saveTask(){

  }

  onTitleChange(e){
    this.setState({
      title: e.nativeEvent.text,
    })
  }

  onDescriptionChange(e){
    this.setState({
      description: e.nativeEvent.text,
    })
  }

  render() {
    const { isDateTimePickerVisible, selectedDate, selectedTime, duration, title, description,userid } = this.state;
    return (
      <View>
      <Header style={styles.header}>
        <Left>
          <Button transparent  onPress={this.goBack}>
            <Icon name='close' style={styles.headerText}/>
          </Button>
        </Left>
        <Body>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='checkmark' style={styles.headerText}/>
          </Button>
        </Right>
      </Header>
        <Item style={styles.header}>
          <Input
            style={styles.titleDescription}
            placeholder="Enter title, times, people, places"
            placeholderTextColor='#fff'
            />
        </Item>
        <View style={styles.sectionHeader}>
                    <Icon name='time' style={styles.sectionIcon}/>
                    <Text style={styles.sectionText}>Start Date and Time</Text>
        </View>

        {
          // this is datetim picker section
        }
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <View style={styles.button}>
            <Text style={styles.dateText}>{selectedDate}</Text>
            <Text style={styles.timeText}>{selectedTime}</Text>
          </View>
        </TouchableOpacity>
        {
          //this is duration picker
        }
        <DurationPicker callback={this.duration_response.bind(this)}/>
        {
          //this is reurrent picker
        }
        <RecurrencePicker callback={this.recurrence_response.bind(this)}/>

        {
          //This is description section
        }

        <Item regular style={styles.textBox}>
          <Input
              style={styles.taskDescription}
              placeholder='Task description'
              multiline={true}
          />
        </Item>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          mode={'datetime'}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginLeft: 0,
    borderBottomColor: '#00aced',
    backgroundColor: '#00aced',
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 35,
    paddingTop: 10,
    fontWeight: '600',
  },
  titleDescription: {
    color: '#fff',
    fontSize: 14,
  },
  taskDescription: {
    fontSize: 14,
    height: 200,
    paddingLeft: 10,
  },
  textBox: {
    marginLeft: 40,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  dateText: {
    flex: 2,
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  timeText: {
    flex: 1,
    justifyContent: 'flex-end',
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
  sectionHeader: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionIcon: {
    flex: 1,
    justifyContent: 'flex-start',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionText: {
    flex: 9,
    textAlign: 'left',
  },

});
