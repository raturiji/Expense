import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colorCode} from '../desgin/colorCode';
import {TextInput} from 'react-native-paper';

export default Settings = () => {
  return (
    <View>
      <View>
        <Text>Color Scheme</Text>
      </View>
    </View>
  );
};

const inlineStyles = StyleSheet.create({
  overviewDetails: {
    borderLeftWidth: 4,
    borderLeftColor: '#39B7CD',
    paddingVertical: hp(1),
    paddingLeft: hp(1.5),
  },
  detailsBtn: {
    backgroundColor: colorCode.success,
    width: wp(28),
    padding: wp(1),
    borderRadius: 50,
  },
  customHeading: {
    fontFamily: 'DroidSans-Bold',
    color: colorCode.light,
    fontSize: hp(2),
    width: wp(65),
  },
  listItem: {
    paddingVertical: hp(1),
    borderBottomWidth: 2,
    borderBottomColor: colorCode.light,
  },
  priceTag: {
    fontSize: hp(2),
    color: colorCode.light,
    fontFamily: 'DroidSans-Bold',
  },
  paymentBtn: {
    backgroundColor: '#008080',
    width: wp(35),
    paddingHorizontal: wp(1),
    paddingVertical: wp(1),
    borderRadius: 25,
    position: 'absolute',
    bottom: '2%',
    left: '35%',
    elevation: 24,
  },
});
