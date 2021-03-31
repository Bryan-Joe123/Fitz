import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert,ScrollView} from 'react-native';

import db from '../config';
import firebase from 'firebase'

const mainColor = 'rgb(28,36,55)';
const subColor = "rgb(104,198,184)";

export default class App extends React.Component{
  constructor(){
    super();
    this.state={
      height:0,
      weight:0,
      BMI:'',
      allBMI:'',
      userName:'',
      description:''
    }
  }

  getUserBMI=async ()=>{
    await this.getUserName()
    var docRef = db.collection("Data").doc(this.state.userName);

    await docRef.get().then((doc) => {
      if (doc.exists) {
        this.setState({allBMI:doc.data().BMI});
      }else{
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    }); 
  }

  componentDidMount(){
    this.getUserName();
    this.getUserBMI();
  }

  getUserName=async()=>{
    var user = await firebase.auth().currentUser;
    var name;

    if (user != null) {
      name = user.email;
      this.setState({userName:name})
    }
  }

  calculateBMI=async ()=>{
    if (this.state.height && this.state.weight){
      await this.getUserName();
      await this.getUserBMI();
      var d = new Date()
      var time = d.getDate() +"/"+ d.getMonth()+"/"+ d.getFullYear() +"  "+ d.getHours()+":"+d.getMinutes()
      var w = this.state.weight;
      var h = this.state.height/100;


      var tempBMI = w/(h*h);
      tempBMI = tempBMI.toString()
      tempBMI = tempBMI.slice(0,7)

      tempBMI = Number(tempBMI);

      if(tempBMI<18.5){
        this.setState({description:"Under Weight"})
      }else if(tempBMI>18.5 && tempBMI<=24.9){
        this.setState({description:"Normal Weight"})
      }else if(tempBMI>24.9 && tempBMI<=29.9){
        this.setState({description:"Over Weight"})
      }else if(tempBMI>29.9){
        this.setState({description:"Obese"})
      }else{
        this.setState({description:"Not Found"})
      }



      if(this.state.allBMI == ""){
        var tempSet = [];
      }else{
        var tempSet = this.state.allBMI;
      }


      if(tempSet){
        tempSet.push({time:time,BMI:Number(tempBMI)})
      }
      console.log(tempSet);

      db.collection("Data").doc(this.state.userName).set({
        "BMI":tempSet,
        "Description":this.state.description
      })

      this.setState({
        BMI:"BMI: "+tempBMI,
      })
      return("BMI: "+tempBMI)
    }else{
      Alert.alert("Empty Input Please Enter the height and weight");
    }
  }

  

  hideOutput(){
    this.setState({
      BMI:""
    })
  }
  
  render(){
    return (
      <ScrollView style={styles.Container}>
        <View style={styles.Header}>
          <TouchableOpacity style={styles.BackButton} onPress={()=>{this.props.navigation.navigate('MainScreen')}}>
              <Text style={styles.BackButtonText}>{'❮'}</Text>
          </TouchableOpacity>
          <Text style={{textAlign: 'center', fontSize: 30, fontWeight:'bold',color:subColor}}>FitZ App</Text>
          <Text style={styles.BackButtonText}>{' '}</Text>
        </View>
        <View style={styles.InnerContainer}>
          <Image source={require("../assets/logo.png")} style={{width:200, height:200}} />
        </View>
        <TextInput style={styles.UserInput} placeholder="Height (cm)" placeholderTextColor="rgb(105,135,130)" keyboardType='numeric' onChangeText={(text)=>{this.setState({height:text})}} value={this.state.height}/>
        <TextInput style={styles.UserInput} placeholder="Weight (Kg)" placeholderTextColor="rgb(105,135,130)" keyboardType='numeric' onChangeText={(text)=>{this.setState({weight:text})}} value={this.state.weight}/>
        <TextInput style={styles.UserInput} placeholder="Age (Years)" placeholderTextColor="rgb(105,135,130)" />
        <TouchableOpacity style={styles.TestButton} onPress={()=>{this.calculateBMI(this.state.height,this.state.weight)}}>
          <Text style={styles.TestButtonText}>Update</Text>
        </TouchableOpacity>
        <View style={{alignContent:"center",alignItems:"center",marginTop:30}}>
          <Text style={this.state.description=="Under Weight"?{color:subColor}:{color:"black"}}>Underweight = less than 18.5</Text>
          <Text style={this.state.description=="Normal Weight"?{color:subColor}:{color:"black"}}>Normal weight = 18.5 – 24.9</Text>
          <Text style={this.state.description=="Over Weight"?{color:subColor}:{color:"black"}}>Overweight = 25 – 29.9</Text>
          <Text style={this.state.description=="Obese"?{color:subColor}:{color:"black"}}>Obesity =30 or greater"</Text>
        </View>
        
        
        <Text style={styles.OutputText}>{this.state.BMI}</Text>
        <Text style={styles.OutputText}>{this.state.description}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  UserInput:{
    borderBottomWidth:2,
    borderBottomColor:subColor,
    margin:10,
    lineHeight:30,
    fontSize:20,
    color:subColor
  },

  TestButton:{
    borderWidth:3,
    borderRadius:10,
    alignContent:"center",
    justifyContent:"center",
    paddingVertical:5,
    paddingHorizontal:10,
    margin:10,
    shadowOffset:{width:5,height:5},
    shadowOpacity:0.3,
    borderColor:subColor
  },

  TestButtonText:{
    textAlign:"center",
    fontSize:20,
    color:subColor
  },

  Container:{
    flex:1,
    backgroundColor:mainColor
  },

  InnerContainer:{
    alignContent:"center",
    alignItems:"center"
  },

  OutputText:{
    textAlign:"center",
    fontSize:40,
    color:subColor
  },

  InfoText:{
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
