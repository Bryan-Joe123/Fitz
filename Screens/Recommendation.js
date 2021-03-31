import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import db from '../config';
import firebase from 'firebase'

const mainColor = 'rgb(28,36,55)';
const subColor = "rgb(104,198,184)";

export default class ProfileScreen extends Component{
    constructor(){
        super();
        this.state={
            userName:firebase.auth().currentUser.email,
            Description:""
        }
    }

    getUserBMI=async ()=>{
        var docRef = db.collection("Data").doc(this.state.userName);
        await docRef.get().then((doc) => {
            if (doc.exists) {
                this.setState({Description:doc.data().Description});
            }else{
            console.log("No such document!",this.state.userName);
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    componentDidMount(){
        this.getUserBMI();
    }

    getDes=(Des)=>{
        if(Des=="Over Weight"){
            return("Exercise Regularly and may be hit the GYM.")
        }else if(Des=="Obese"){
            return("you have to take medications, Exercise Regularly and may be hit the GYM. ")
        }else{
            return("you do not have to take any medications.")
        }
    }


    render(){
        return(
            <View style={styles.Container}>
                <View style={styles.Header}>
                    <TouchableOpacity style={styles.BackButton} onPress={()=>{this.props.navigation.navigate('MainScreen')}}>
                        <Text style={styles.BackButtonText}>{'❮'}</Text>
                    </TouchableOpacity>
                    <Text style={{textAlign: 'center', fontSize: 30, fontWeight:'bold',color:subColor}}>FitZ App</Text>
                    <TouchableOpacity onPress={()=>{this.getUserBMI()}} style={{marginTop:10}}>
                        <Text style={{fontSize:20,color:subColor,marginRight:10}}>Refresh</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.Description?
                    (
                        <View style={{alignSelf:"center",alignItems:"center",justifyContent:"center",marginTop:"60%"}}>
                            <Text style={{color:subColor,fontSize:20,textAlign:"center"}}>{"You Are "+this.state.Description+" and "+ this.getDes(this.state.Description)}</Text>
                        </View>
                    ):
                    (
                        <View style={{alignSelf:"center",alignItems:"center",justifyContent:"center",marginTop:"60%"}}>
                            <Text style={{color:subColor,fontSize:20}}>No Records Yet</Text>
                        </View>
                    )
                }
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
