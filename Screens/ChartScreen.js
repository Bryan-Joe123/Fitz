import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

import db from '../config';
import firebase from 'firebase'

const mainColor = 'rgb(28,36,55)';
const subColor = "rgb(104,198,184)";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];



export default class App extends React.Component {
    constructor(){
        super();
        this.state={
            BMI:[{ time: 1, BMI: 13000 },
                { time: 2, BMI: 16500 },
                { time: 3, BMI: 14250 },
                { time: 4, BMI: 19000 }],
            userName:firebase.auth().currentUser.email
        }
    }

    getUserBMI=async ()=>{
        var docRef = db.collection("Data").doc(this.state.userName);
        await docRef.get().then((doc) => {
            if (doc.exists) {
                this.setState({BMI:doc.data().BMI});
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
        
    render() {
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

            {
                this.state.BMI.length>0?
                (
                    <View>
                        <View style={styles.Header}>
                            <Text style={{fontSize:20,color:subColor,alignSelf:"center"}}>BMI</Text>
                            <VictoryChart width={Dimensions.get('window').width} theme={VictoryTheme.material} style={{marginRight:20}}>
                                <VictoryBar data={ this.state.BMI} x="time" y="BMI"/>
                            </VictoryChart>
                        </View>
                        <Text style={{fontSize:20,color:subColor,alignSelf:"center"}}>Date/Time</Text>
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

    Header:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:20
    }
});
