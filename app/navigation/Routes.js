import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
import Realm from 'realm';
import Icon from '../component/Icon';
import Schema from '../Database/Schema';

const Drawer = createDrawerNavigator();
const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppScreen = ({navigation}) => {
  useEffect(() => {
    Realm.open({
      schema: [Schema.User],
    }).then((realm) =>
      realm.objects('User').length > 0
        ? navigation.navigate('Dashboard')
        : null,
    );
  }, [navigation]);

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
        activeTintColor: 'red',
      }}>
      <Tab.Screen
        name="Status"
        component={AppScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="account-balance"
                iconType="MaterialIcons"
                color={focused ? 'red' : 'gray'}
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
                color={focused ? 'red' : 'gray'}
                size={20}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
      <Drawer.Screen name="Profile" component={Tabs} options={headerOptions} />
    </Drawer.Navigator>
  );
};

export default Routes;

const headerOptions = {
  headerStyle: {
    backgroundColor: '#2e5090',
  },
  headerTintColor: colorCode.light,
};
