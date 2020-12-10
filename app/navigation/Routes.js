import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Dashboard from '../screens/Dashboard';
import Sidebar from '../component/Sidebar';
import {colorCode} from '../desgin/colorCode';
import ExpenseCalendar from '../screens/ExpenseCalendar';
import Payment from '../screens/Payment';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';
import Category from '../screens/Category';
import {useSelector, useDispatch} from 'react-redux';
import Icon from '../component/Icon';
import CategoryDetails from '../screens/CategoryDetails';

const Drawer = createDrawerNavigator();
const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const AppScreen = ({navigation, route}) => {
  if (route && route.state && route.state.index === 0) {
    navigation.setOptions({tabBarVisible: true});
  } else if (route.state && route.state.index !== 0) {
    navigation.setOptions({tabBarVisible: false});
  }

  return (
    <AppStack.Navigator
      screenOptions={{
        headerBackTitle: null,
        headerTruncatedBackTitle: false,
        headerTitleStyle: {fontSize: 18},
        headerLeft: () => (
          <TouchableOpacity
            style={{marginLeft: wp(4)}}
            onPress={() => navigation.toggleDrawer()}>
            <Icon
              name="menu"
              size={20}
              color="#fff"
              iconType="SimpleLineIcons"
            />
          </TouchableOpacity>
        ),
        gestureEnabled: false,
      }}>
      <AppStack.Screen name="Tabs" component={Tabs} options={dashboardHeader} />
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
      <AppStack.Screen
        name="Category"
        component={Category}
        options={headerOptions}
      />
      <AppStack.Screen
        name="CategoryDetails"
        component={CategoryDetails}
        options={headerOptions}
      />
    </AppStack.Navigator>
  );
};

const AuthScreen = ({navigation}) => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Profile"
        component={Profile}
        options={headerOptions}
      />
    </AuthStack.Navigator>
  );
};

const Details = () => {
  return (
    <DetailsStack.Navigator>
      <DetailsStack.Screen
        name="Expense Calendar"
        component={ExpenseCalendar}
        options={headerOptions}
      />
      <DetailsStack.Screen
        name="Settings"
        component={Settings}
        options={headerOptions}
      />
    </DetailsStack.Navigator>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        tabStyle: {backgroundColor: '#00538C', flexDirection: 'row'},
        showIcon: true,
      }}>
      <Tab.Screen
        name="Status"
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="account-balance"
                iconType="MaterialIcons"
                color={focused ? 'white' : 'gray'}
                size={20}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="calendar-blank-multiple"
                iconType="MaterialCommunityIcons"
                color={focused ? 'white' : 'gray'}
                size={20}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Routes = ({navigation}) => {
  const userData = useSelector((state) => state.appData.userData);
  return userData && userData.id ? (
    <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
      <Drawer.Screen
        name="Tabs"
        component={AppScreen}
        options={headerOptions}
      />
    </Drawer.Navigator>
  ) : (
    <AuthScreen />
  );
};

export default Routes;

const headerOptions = {
  headerStyle: {
    backgroundColor: '#2e5090',
  },
  headerTintColor: colorCode.light,
};

const dashboardHeader = {
  headerStyle: {
    backgroundColor: '#2e5090',
    borderBottomWidth: 0,
    shadowOffset: {height: 0, width: 0},
  },
  headerTintColor: colorCode.light,
  title: 'Dashboard',
};
