import * as React from 'react';
import { View} from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'

import AuthScreen from './Screens/AuthScreen';

import { AppDrawerNavigator } from './components/AppDrawerNav'


export default class App extends React.Component {
  render() {
    return (
      <View style={{height:"100%"}}>
        <AppContainer/>
      </View>
    );
  }
}

const AppNavigator = createSwitchNavigator({
  AuthScreen:{screen:AuthScreen},
  AppDrawerNavigator:{screen:AppDrawerNavigator}
})

const AppContainer =  createAppContainer(AppNavigator);