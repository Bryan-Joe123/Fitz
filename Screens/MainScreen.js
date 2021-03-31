import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,Image} from 'react-native';

import firebase from 'firebase';
import db from '../config'

const mainColor = 'rgb(28,36,55)';
const subColor = "rgb(104,198,184)";

export default class App extends React.Component{
  render(){
    return (
      <ScrollView style={styles.Container}>
        <View style={styles.Header}>
          <TouchableOpacity style={styles.BackButton} onPress={()=>{this.props.navigation.toggleDrawer()}}>
            <Text style={styles.BackButtonText}>{'☰'}</Text>
          </TouchableOpacity>
          <Text style={{textAlign: 'center', fontSize: 30, fontWeight:'bold',color:subColor}}>FitZ App</Text>
          <Text style={styles.BackButtonText}>{' '}</Text>
        </View>
        <View style={styles.InnerContainer}>
          <Image source={require("../assets/logo.png")} style={{width:200, height:200}} />
        </View>
        <TouchableOpacity style={styles.TestButton} onPress={()=>{this.props.navigation.navigate("BMITestScreen")}}>
            <Text style={styles.TestButtonText}>Record BMI</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.TestButton} onPress={()=>{this.props.navigation.navigate("RecordsScreen")}}>
            <Text style={styles.TestButtonText}>Records</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.TestButton} onPress={()=>{this.props.navigation.navigate("ChartScreen")}}>
            <Text style={styles.TestButtonText}>Chart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.TestButton} onPress={()=>{this.props.navigation.navigate("Recommendation")}}>
            <Text style={styles.TestButtonText}>Recommendations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.TestButton} onPress={()=>{
          firebase.auth().signOut().then(()=>{
            this.props.navigation.navigate("AuthScreen");
          })
          }}>
            <Text style={styles.TestButtonText}>Log Out</Text>
        </TouchableOpacity>

        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  UserInput:{
    borderBottomWidth:2,
    margin:10,
    lineHeight:30,
    fontSize:20,
  },

  TestButton:{
    borderWidth:3,
    borderRadius:10,
    borderColor:subColor,
    alignContent:"center",
    justifyContent:"center",
    paddingVertical:5,
    paddingHorizontal:10,
    margin:10,
    shadowOffset:{width:5,height:5},
    shadowOpacity:0.3,
  },

  TestButtonText:{
    textAlign:"center",
    fontSize:20,
    color:subColor
  },

  Container:{
    flex:1,
    backgroundColor:mainColor,
  },

  InnerContainer:{
    alignContent:"center",
    alignItems:"center",
    marginTop:10
  },

  OutputText:{
    textAlign:"center",
    fontSize:40,
    color:subColor
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
