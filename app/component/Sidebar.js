/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from '../desgin/style';

const Sidebar = ({navigation}) => {
  const toProfileScreen = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={[{flex: 1}]}>
      <View style={[{backgroundColor: '#EAC697'}]}>
        <SafeAreaView style={[styles.mvSm, styles.ctr]}>
          <Text style={[styles.md]}>Expense</Text>
          <Text style={[styles.sm]}>Manage your Expenses</Text>
        </SafeAreaView>
      </View>
      <View style={[{marginLeft: wp(5)}]}>
        <ListItem title="Profile" />
        <ListItem title="Gaming" />
        <ListItem title="Food" />
        <ListItem title="Travel" />
      </View>
    </View>
  );
};

const ListItem = ({onPress, title}) => (
  <TouchableOpacity onPress={onPress}>
    <View>
      <Text style={[inlineStyles.sideBarItem]}>{title}</Text>
    </View>
  </TouchableOpacity>
);
const inlineStyles = StyleSheet.create({
  sideBarItem: {
    paddingTop: hp(2),
    fontSize: hp(2),
  },
});

export default Sidebar;
