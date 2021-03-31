import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import firebase from 'firebase';

const mainColor = 'rgb(28,36,55)';
const subColor = "rgb(104,198,184)";

export default class ProfileScreen extends Component{
  constructor(){
    super();
    this.state={
      emailID:firebase.auth().currentUser.email,
      firstName:firebase.auth().currentUser.displayName,
    }
  }

  updateUserDetails=()=>{
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: this.state.firstName,
    })
  }


  render(){
    return(
      <View style={styles.Container}>
        <View style={styles.Header}>
          <TouchableOpacity style={styles.BackButton} onPress={()=>{this.props.navigation.navigate('MainScreen')}}>
              <Text style={styles.BackButtonText}>{'❮'}</Text>
          </TouchableOpacity>
          <Text style={{textAlign: 'center', fontSize: 30, fontWeight:'bold',color:subColor}}>FitZ App</Text>
          <Text style={styles.BackButtonText}>{' '}</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={{textAlign: 'center', fontSize: 20, fontWeight:'bold',color:subColor}} placeholder="Email" onChangeText={(text)=>{this.setState({lastName:text})}}>{this.state.emailID}</Text>
          <TextInput placeholder="Name" style={styles.formTextInput} maxLength={20} onChangeText={(text)=>{this.setState({firstName:text})}} value={this.state.firstName}/>
          <TouchableOpacity style={styles.button} onPress={()=>{this.updateUserDetails()}}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container:{
    flex:1,
    backgroundColor:mainColor
  },
  formContainer: { 
    flex: 1, 
    width: '100%', 
    alignItems: 'center' 
  },
  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    color:subColor,
    borderColor:subColor
  },
  button: {
    width: '75%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
  buttonText: { 
    fontSize: 25, 
    fontWeight: 'bold', 
    color: subColor
  },

  BackButton:{
    color:subColor,
    marginLeft:10
  },

  BackButtonText:{
    color:subColor,
    fontSize:30
  },

  Header:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:20
  }
});
