import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';

import {Actions} from 'react-native-router-flux';

export default class Signup extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
    this.txtnamechange = this.txtnamechange.bind(this);
    this.txtemailchange = this.txtemailchange.bind(this);
    this.txtpasswordchange = this.txtpasswordchange.bind(this);

  }

  txtnamechange(e){
    this.setState({
      name: e.nativeEvent.text
    });
  }
  txtemailchange(e){
    this.setState({
      email: e.nativeEvent.text
    });
  }
  txtpasswordchange(e){
    this.setState({
      password: e.nativeEvent.text
    });
  }



  goBack() {
      Actions.pop();
  }

  handlePress = async() => {
    if (this.state.name == '' || this.state.email == '' || this.state.password =='' ){
      Alert.alert('All fields are required! Please check again...');
    } else {
      fetch('http://loynin.changeip.net/api/v1/user',{
        method: 'POST',
        headers: {
          'Accept': 'applicatoin/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) =>{
        Alert.alert("Creating User is " + responseJson.msg);
      })
    }

    // .then((text) =>{
    //     if (Platform.OS === 'android'){
    //       text = text.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, ''); // If android , I've removed unwanted chars.
    //     }
    //   return text;
    // })
    //.then(response => JSON.parse(response));
  }


	render() {
		return(
			<KeyboardAvoidingView behavior={'padding'} style={styles.container}>
				<Logo/>
            <TextInput style={styles.inputBox}
                placeholder="Full Name"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                onChange={this.txtnamechange}
            />

            <TextInput style={styles.inputBox}
                placeholder="Email"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                keyboardType="email-address"
                onChange={this.txtemailchange}
                />
            <TextInput style={styles.inputBox}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor = "#ffffff"
                onChange = {this.txtpasswordchange}
                />
            <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this)}>
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>

				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Already have an account?</Text>
					<TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}> Sign in</Text></TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  },
  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:10,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10,
    height: 40,
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
});
