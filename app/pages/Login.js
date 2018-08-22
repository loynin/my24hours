import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Navigator,
  AsyncStorage,
} from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';

import {Actions} from 'react-native-router-flux';

export default class Login extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.txtemailchange = this.txtemailchange.bind(this);
    this.txtpasswordchange = this.txtpasswordchange.bind(this);

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

  handlePress = async() => {
    // if (this.state.email == '' || this.state.password =='' ){
    //   Alert.alert('Please check username and password and try again!');
    // } else {
      fetch('http://loynin.changeip.net/api/v1/user/signin',{
        method: 'POST',
        headers: {
          'Accept': 'applicatoin/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // email: this.state.email,
          // password: this.state.password,
          email: '1234@stevenloy.com',
          password: '123456'
        }),
      })
      .then((response) => response.json())
      .then((responseJson) =>{
        // error during sign in
        if (responseJson.token == null){
          Alert.alert("Signin is Error: " + responseJson.msg);
        }else{
          let userinfo = JSON.stringify({
            userid: responseJson.user.id,
            token: responseJson.token,
          })
          // Use AsyncStorage to store userid and token
          AsyncStorage.setItem('userinfo' , userinfo);

          //Navigate to 'Memberarea'
          Actions.memberarea();
          //Alert.alert("Signin is Successful: " + responseJson.user.id);
        }
      })
    //}
}
  	signup() {
  		Actions.signup()
  	}

  


	render() {
		return(
			<KeyboardAvoidingView  behavior={'padding'} style={styles.container}>
				<Logo/>

            <TextInput style={styles.inputBox}
                placeholder="Email"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                keyboardType="email-address"
                value="1234@stevenloy.com"
                onSubmitEditing={()=> this.password.focus()}
                onChange={this.txtemailchange}
                />
            <TextInput style={styles.inputBox}
                placeholder="Password"
                secureTextEntry={false}
                placeholderTextColor = "#ffffff"
                ref={(input) => this.password = input}
                value="123456"
                onChange={this.txtpasswordchange}
                />
             <TouchableOpacity
                style={styles.button}
                onPress={this.handlePress}
              >
               <Text style={styles.buttonText}>Sign In</Text>
             </TouchableOpacity>

				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Don't have an account yet?</Text>
					<TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
			)
	}
}
const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems: 'center',
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
  },

});
