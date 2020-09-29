import React from 'react';
import {View,Text ,TouchableOpacity} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Dashboard from '../screens/Dashboard';
import Sidebar from '../component/Sidebar';
import { colorCode } from '../desgin/colorCode';
import Calendar from '../screens/Calendar';
import Payment from '../screens/Payment';
import Setting from '../screens/Settings';
import Profile from '../screens/Profile';
import Icon from '../component/Icon'

const Drawer = createDrawerNavigator();
const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppScreen = ({navigation}) => {
    return (
        <AppStack.Navigator
            screenOptions={{
                headerBackTitle: null,
                headerTruncatedBackTitle: false,
                headerTitleStyle: {fontSize: 18},
                headerLeft: () => (
                    <TouchableOpacity style={{marginLeft:wp(4)}}  onPress={() => navigation.toggleDrawer()}>
                        <Icon
                        name="menu"
                        size={20}
                        color="#fff"
                        iconType="SimpleLineIcons"
                        />
                    </TouchableOpacity>
                ),
                gestureEnabled: false,
            }}
        >
            <AppStack.Screen 
                name="Profile"
                component={Profile}
                options={headerOptions}
            />
            <AppStack.Screen 
                name="Dashboard"
                component={Dashboard}
                options={headerOptions}
            />
            <AppStack.Screen 
                name="Payment"
                component={Payment}
                options={headerOptions}
            />
        </AppStack.Navigator>
    );
};

// const AuthScreen = ({navigation}) => {
//     return (
//         <AuthStack.Navigator
//             screenOptions={{
//                 headerBackTitle: null,
//                 headerTruncatedBackTitle: false,
//                 headerTitleStyle: {fontSize: 18},
//                 headerLeft: () => (
//                     <TouchableOpacity style={{marginLeft:wp(4)}}  onPress={() => navigation.toggleDrawer()}>
//                         <Icon
//                         name="menu"
//                         size={20}
//                         color="#fff"
//                         iconType="SimpleLineIcons"
//                         />
//                     </TouchableOpacity>
//                 ),
//                 gestureEnabled: false,
//             }}
//         >
//             <AuthStack.Screen 
//                 name="Profile"
//                 component={Profile}
//                 options={headerOptions}
//             />
            
//         </AuthStack.Navigator>
//     );
// };

const Details = () => {
    return (
        <DetailsStack.Navigator>
            <DetailsStack.Screen 
                name="Calendar"
                component={Calendar}
                options={headerOptions}
            />
            <DetailsStack.Screen 
                name="Settings"
                component={Settings}
                options={headerOptions}
            />
        </DetailsStack.Navigator>
    ); 
}

const Tabs = () => {
    return (
        <Tab.Navigator
        tabBarOptions={{
            activeTintColor: 'red',
          }}
        >
            <Tab.Screen 
            name="Status" 
            component={AppScreen} 
            options={{
                tabBarIcon:({focused}) => {
                    return <Icon 
                    name='account-balance' 
                    iconType='MaterialIcons'   
                    color = {focused ? "red" : "gray"}
                    size={20} 
                    />
                },
            }}  />
            <Tab.Screen 
            name="Details" 
            component={Details}
            options={{
                tabBarIcon:({focused}) => {
                    return <Icon 
                    name='calendar-blank-multiple' 
                    iconType='MaterialCommunityIcons'   
                    color = {focused ? "red" : "gray"}
                    size={20} 
                    />
                },
            }}  />
        </Tab.Navigator>
    )  
}

export default Routes = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
            <Drawer.Screen
                name = "Profile"
                component={Tabs}
                options={headerOptions}
            />
        </Drawer.Navigator>
    )
}

const headerOptions = {
    headerStyle: {
        backgroundColor:'#2e5090'
    },
    headerTintColor:colorCode.light
}


