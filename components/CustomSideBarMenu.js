import React, { Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity,Dimensions,ScrollView} from 'react-native';
import {Avatar} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker'
import * as permissions from 'expo-permissions'

import { DrawerItems} from 'react-navigation-drawer'

import firebase from 'firebase';
import db from '../config'

const mainColor = 'rgb(28,36,55)';
const subColor = "rgb(104,198,184)";

export default class CustomSideBarMenu extends Component{
  constructor(){
    super();
    this.state={
      userID:firebase.auth().currentUser.email,
      image:"#",
      name:"",
      docID:""
    }
  }

  selectPicture= async ()=>{
    const {cancelled,uri} = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[4,4],
      quality:1
    })

    if(!cancelled){
      this.uploadImage(uri,this.state.userID)
    }
  }

  uploadImage=async (uri,imgName)=>{
    var res = await fetch(uri);
    var blob = await res.blob();

    var ref = firebase.storage().ref().child("user_profiles/"+imgName);
    return(
      ref.put(blob).then((res)=>{
        this.fetchImage(imgName);
      })
    )
  }

  fetchImage = (imageName) => { 
    var storageRef = firebase 
    .storage() 
    .ref() 
    .child("user_profiles/" + imageName); 
    // Get the download URL 
    storageRef 
    .getDownloadURL() 
    .then((url) => { 
      this.setState({ 
        image: url 
      }); 
    }) 
    .catch((error) => { 
      this.setState({ 
        image: "https://freepikpsd.com/wp-content/uploads/2019/10/default-profile-image-png-1-Transparent-Images.png" 
      }); 
    }); 
  };

  getUserProfile() { 
    db.collection("users") 
    .where("email_id", "==", this.state.userID) 
    .onSnapshot((querySnapshot) => { 
      querySnapshot.forEach((doc) => { 
        this.setState({ 
          name: doc.data().first_name + " " + doc.data().last_name, 
          docID: doc.id, 
          image: doc.data().image, 
        }); 
      }); 
    }); 
  }

  componentDidMount(){
    this.fetchImage(this.state.userID);
    this.getUserProfile();
  }

  render(){
    return(
      <ScrollView style={{flex:1,backgroundColor:mainColor}}>
        <View style={{flex:0.5,alignItems:"center",marginTop:10}}>
          <Avatar 
            rounded
            source={
              {
                uri:this.state.image
              }
            }
            size={Dimensions.get('window').width/2.5}
            onPress={
              ()=>{
                this.selectPicture();
              }
            }
            containerStyle={styles.imageContainer}
          />
          
          <Text style={{padding:10,fontWeight:"bold", fontSize:20}}>{firebase.auth().currentUser.displayName}</Text>
          <Text>Tap To Edit</Text>
        </View>
        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props}/>
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity style={styles.logOutButton}
          onPress = {() => {
            firebase.auth().signOut().then(()=>{
              this.props.navigation.navigate("AuthScreen")
            })
          }}>
            <Text style={styles.logOutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  drawerItemsContainer:{
    flex:0.8
  },
  logOutContainer : {
    flex:0.2,
    justifyContent:'flex-end',
    paddingBottom:30
  },
  logOutButton : {
    height:30,
    width:'100%',
    justifyContent:'center',
    padding:10
  },
  logOutText:{
    fontSize: 30,
    fontWeight:'bold'
  }
})
