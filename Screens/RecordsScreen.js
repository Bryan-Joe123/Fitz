import React from "react";
import { StyleSheet, ScrollView,TouchableOpacity,Text ,View} from "react-native";

import db from '../config';
import firebase from 'firebase'

const mainColor = 'rgb(28,36,55)';
const subColor = "rgb(104,198,184)";

export default class App extends React.Component{
    constructor(){
        super();
        this.state={
            allBMI:[],
            userName:''
        }
    }

    getUserName=async()=>{
        var user = await firebase.auth().currentUser;
        var name;
        if (user != null) {
            name = user.email;
            this.setState({userName:name})
        }
    }

    getUserBMI=async ()=>{
        await this.getUserName()
        var docRef = db.collection("Data").doc(this.state.userName);

        await docRef.get().then((doc) => {
            if (doc.exists) {
                this.setState({allBMI:doc.data().BMI});
            }else{
            console.log("No such document!",this.state.userName);
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }


    componentDidMount= async ()=>{
        await this.getUserName();
        await this.getUserBMI();
    }

    getMap=(item)=>{
        return(
            <View>
                <Text style={{borderWidth:2}}>{"hey"}</Text>
            </View>
        )
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.Header}>
                    <TouchableOpacity style={styles.BackButton} onPress={()=>{this.props.navigation.navigate('MainScreen')}}>
                        <Text style={styles.BackButtonText}>{'❮'}</Text>
                    </TouchableOpacity>
                    <Text style={{textAlign: 'center', fontSize: 30, fontWeight:'bold',color:subColor}}>FitZ App</Text>
                    <TouchableOpacity onPress={()=>{this.getUserBMI()}} style={{marginTop:10}}>
                        <Text style={{fontSize:20,color:subColor,marginRight:10}}>Refresh</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{marginTop:40,height:"70%",}}>
                {
                    this.state.allBMI.length>0?
                    this.state.allBMI.map((item, index) =>
                        (
                            <View style={styles.DisplayContainer}>
                                <Text style={{color:subColor}}>{"Date: "+item.time}</Text>
                                <Text style={{color:subColor}}>{"BMI: "+item.BMI}</Text>
                            </View>
                        )
                    ):
                    (
                        <View style={{alignSelf:"center",alignItems:"center",justifyContent:"center",marginTop:"60%"}}>
                            <Text style={{color:subColor,fontSize:20}}>No Records Yet</Text>
                        </View>
                    )
                }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColor
    },
    BackButton:{
        color:subColor,
        marginLeft:10
    },
    
    BackButtonText:{
        color:subColor,
        fontSize:30
    },
    DisplayContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        borderWidth:1,
        paddingVertical:20,
        paddingHorizontal:5,
        borderColor:subColor
    },

    Header:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:20
    }
  });