/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Alert,

} from 'react-native';

import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Title } from 'native-base';
import Tasklist from '../components/Tasklist';
import DigitalClock from '../components/DigitalClock';
import CountDown from '../components/CountDown';
import {Actions} from 'react-native-router-flux';

export default class Memberarea extends Component {

  constructor(props){
    super(props);
    this.state = {
      userid: -1,
      token: '',
      tasks:[],
    }
  }

  componentDidMount(){
    this._isMounted = true;
    this._loadInitialState().done();
    if (this._isMounted){
      var tasks1 = this.getTasks();
    }
  }



    componentWillReceiveProps(nextProps){
      this._isMounted = true;
      this._loadInitialState().done();
      if (this._isMounted){
        var tasks1 = this.getTasks();
      }

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

async getTasks(){
  try{
    let response = await fetch(
      'http://loynin.changeip.net/api/v1/task'
    );

    let responseJson = await response.json();
    this.setState(previousState => {
      return { tasks: responseJson.task};
    });
    console.log(this.state.tasks);
    return responseJson.task;
  }catch(error){
    Alert.alert('Error get tasks');
  };
}

  render() {
    return (
      <Container>
            <Header>
              <Body>
                <Title>My 24 Hours</Title>
                </Body>
            </Header>
            <View style={styles.timer}>
                {
                  //<Text style={styles.timerText}>00:00:00</Text>
                }
                <CountDown clockStyles={styles.timerText} />

            </View>
              <Content>


                <List dataArray={this.state.tasks}
                  renderRow={(item) =>
                    <ListItem avatar>
                        <Body>
                            <Text>{item.title}</Text>
                            <Text note>{item.duration} minutes</Text>
                        </Body>
                        <Right>
                          <Text note>{item.start_time}</Text>
                        </Right>
                    </ListItem>
                  }>
                  </List>

              </Content>

              <TouchableOpacity style={styles.addButton} onPress={this.addNewTask}>
                  <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </Container>



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
    right: 10,
    bottom: 10,
    backgroundColor: '#E91E63',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  timer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',

  },
  timerText: {
    fontSize: 50,

  },

});
