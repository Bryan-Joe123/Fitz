import * as React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,ScrollView} from 'react-native';

import firebase from 'firebase';
import db from '../config'

const mainColor = 'rgb(28,36,55)';
const subColor = "rgb(104,198,184)";

export default class AuthScreen extends React.Component{
  constructor(){
    super();

    this.state={
      emailID:"",
      password:"",
      name:""
    }
  }

  userLogin=(email,password)=>{
    firebase.auth().signInWithEmailAndPassword(email,password)

    .then(()=>{

      this.props.navigation.navigate('AppDrawerNavigator')
    })
    .catch((error)=>{
      var errorCode = error.code;
      var errorMsg = error.message
      alert(errorMsg)
    })
  }

  userSignUp=(email,password,name)=>{
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(()=>{
      db.collection("Data").doc(name).set({
        "BMI":[]
      })
      firebase.auth().signInWithEmailAndPassword(email,password)
      .then(()=>{
        this.props.navigation.navigate('AppDrawerNavigator')
        var user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: name,
        })
      })
      .catch((error)=>{
        var errorCode = error.code;
        var errorMsg = error.message
        alert(errorMsg)
      })
    })
    .catch(function(error){
      var errorCode = error.code;
      var errorMsg = error.message
      alert(errorMsg)
    })
  }




    render(){
    return(
      <ScrollView style={styles.Container}>
        <View style={styles.InnerContainer}>
          <Text style={{textAlign: 'center', fontSize: 30, fontWeight:'bold',color:subColor,marginTop:20}}>FitZ App</Text>
          <Image source={require("../assets/logo.png")} style={{width:200,height:200}}/>
        </View>
        <TextInput style={styles.UserInput} placeholder="Email ID" placeholderTextColor="rgb(105,135,130)" keyboardType="email-address" onChangeText={(text)=>{this.setState({emailID:text})}}/>
        <TextInput style={styles.UserInput} placeholder="Password" placeholderTextColor="rgb(105,135,130)" secureTextEntry={true} onChangeText={(text)=>{this.setState({password:text})}}/>
        <TextInput style={styles.UserInput} placeholder="Username (Only for Sign Up)" placeholderTextColor="rgb(105,135,130)" onChangeText={(text)=>{this.setState({name:text})}}/>

        <View>
          <TouchableOpacity style={styles.AuthButton} onPress={()=>{this.userLogin(this.state.emailID,this.state.password)}}>
            <Text style={styles.AuthButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.AuthButton} onPress={()=>{this.userSignUp(this.state.emailID,this.state.password,this.state.name)}}>
            <Text style={styles.AuthButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles=StyleSheet.create({
  UserInput:{
    borderBottomWidth:2,
    borderBottomColor:subColor,
    margin:10,
    lineHeight:30,
    fontSize:20,
    color:subColor
  },

  AuthButton:{
    borderWidth:3,
    borderRadius:10,
    alignContent:"center",
    justifyContent:"center",
    paddingHorizontal:10,
    margin:10,
    shadowOffset:{width:5,height:5},
    shadowOpacity:0.3,
    borderColor:subColor,
    padding:5
  },

  AuthButtonText:{
    textAlign:"center",
    fontSize:20,
    color:subColor
  },

  Container:{
    flex:1,
    backgroundColor:mainColor,
    height:"100%"
  },
  InnerContainer:{
    alignContent:"center",
    alignItems:"center",
  },

  KeyboardAvoidingView:{ 
    flex:1, 
    justifyContent:'center', 
    alignItems:'center' 
  }, 

  ModalTitle :{ 
    justifyContent:'center', 
    alignSelf:'center', 
    fontSize:30, 
    color:'#ff5722', 
    margin:50 
  }, 
  
  FormTextInput:{ alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10}, 
  
  RegisterButton:{ width:200, height:40, alignItems:'center', justifyContent:'center', borderWidth:1, borderRadius:10, marginTop:30 },
  
  RegisterButtonText:{ color:'#ff5722', fontSize:15, fontWeight:'bold' }, 
  
  CancelButton:{ width:200, height:30, justifyContent:'center', alignItems:'center', marginTop:5, },
})