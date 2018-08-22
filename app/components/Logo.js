import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image
} from 'react-native';

export default class Logo extends Component<{}> {
	render(){
		return(
			<View style={styles.container}>
				<Image  style={styles.image}
          		source={require('../images/logo.png')}/>
          		<Text style={styles.logoText}>
                  Welcome to My app.
              </Text>
  			</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoText : {
  	marginVertical: 15,
  	fontSize:18,
    color: '#fff',
  },
  image: {
    width:40,
    height: 70
  },
});
