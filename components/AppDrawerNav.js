import {createDrawerNavigator} from 'react-navigation-drawer';

import BMITestScreen from '../Screens/BMITestScreen';
import RecordsScreen from '../Screens/RecordsScreen';
import MainScreen from '../Screens/MainScreen';
import MyProfileScreen from '../Screens/MyProfile';
import ChartScreen from '../Screens/ChartScreen'
import Recommendation from '../Screens/Recommendation'

import CustomSideBarMenu  from './CustomSideBarMenu';

export const AppDrawerNavigator = createDrawerNavigator({
    Home : {screen : MainScreen},
    MainScreen:{screen : MainScreen},
    BMITestScreen:{screen : BMITestScreen},
    RecordsScreen:{screen : RecordsScreen},
    ChartScreen:{screen : ChartScreen},
    MyProfileScreen:{screen : MyProfileScreen},
    Recommendation:{screen:Recommendation}
  },{contentComponent:CustomSideBarMenu},{initialRouteName : 'Home',
}
)
