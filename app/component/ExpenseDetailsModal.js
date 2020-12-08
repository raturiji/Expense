import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,,
} from 'react-native-responsive-screen';
import {colorCode} from '../desgin/colorCode';

export default ExpenseDetailsModal = () => {
  return (
    <ScrollView
      style={[inlineStyles.detailsModal, styles.phSm, styles.pvSm, styles.mh]}>
      <View style={[inlineStyles.listItem, styles.row, styles.between]}>
        <View>
          <Text style={[inlineStyles.customHeading]}>Electricity Bill</Text>
          <Text style={{color: colorCode.light}}>3:00 PM 21/09/2020</Text>
        </View>
        <View>
          <Text style={inlineStyles.priceTag}>&#8377; 50000</Text>
        </View>
      </View>
      <View style={[inlineStyles.listItem, styles.row, styles.between]}>
        <View>
          <Text style={[inlineStyles.customHeading]}>Electricity Bill</Text>
          <Text style={{color: colorCode.light}}>3:00 PM 21/09/2020</Text>
        </View>
        <View>
          <Text style={inlineStyles.priceTag}>&#8377; 50000</Text>
        </View>
      </View>
      <View style={[inlineStyles.listItem, styles.row, styles.between]}>
        <View>
          <Text style={[inlineStyles.customHeading]}>Electricity Bill</Text>
          <Text style={{color: colorCode.light}}>3:00 PM 21/09/2020</Text>
        </View>
        <View>
          <Text style={inlineStyles.priceTag}>&#8377; 50000</Text>
        </View>
      </View>
      <View style={[inlineStyles.listItem, styles.row, styles.between]}>
        <View>
          <Text style={[inlineStyles.customHeading]}>Electricity Bill</Text>
          <Text style={{color: colorCode.light}}>3:00 PM 21/09/2020</Text>
        </View>
        <View>
          <Text style={inlineStyles.priceTag}>&#8377; 50000</Text>
        </View>
      </View>
      <View style={[inlineStyles.listItem, styles.row, styles.between]}>
        <View>
          <Text style={[inlineStyles.customHeading]}>Electricity Bill</Text>
          <Text style={{color: colorCode.light}}>3:00 PM 21/09/2020</Text>
        </View>
        <View>
          <Text style={inlineStyles.priceTag}>&#8377; 50000</Text>
        </View>
      </View>
      <View style={[inlineStyles.listItem, styles.row, styles.between]}>
        <View>
          <Text style={[inlineStyles.customHeading]}>Electricity Bill</Text>
          <Text style={{color: colorCode.light}}>3:00 PM 21/09/2020</Text>
        </View>
        <View>
          <Text style={inlineStyles.priceTag}>&#8377; 50000</Text>
        </View>
      </View>
      <View style={[inlineStyles.listItem, styles.row, styles.between]}>
        <View>
          <Text style={[inlineStyles.customHeading]}>Electricity Bill</Text>
          <Text style={{color: colorCode.light}}>3:00 PM 21/09/2020</Text>
        </View>
        <View>
          <Text style={inlineStyles.priceTag}>&#8377; 50000</Text>
        </View>
      </View>
      <View style={[inlineStyles.listItem, styles.row, styles.between]}>
        <View>
          <Text style={[inlineStyles.customHeading]}>Electricity Bill</Text>
          <Text style={{color: colorCode.light}}>3:00 PM 21/09/2020</Text>
        </View>
        <View>
          <Text style={inlineStyles.priceTag}>&#8377; 50000</Text>
        </View>
      </View>
      <View
        style={[
          inlineStyles.listItem,
          styles.row,
          styles.between,
          {paddingBottom: hp(5)},
        ]}>
        <View>
          <Text style={[inlineStyles.customHeading]}>Total</Text>
        </View>
        <View>
          <Text style={inlineStyles.priceTag}>&#8377; 50000</Text>
        </View>
      </View>
    </ScrollView>
  );;
};

const inlineStyles = StyleSheet.create({
  overviewDetails: {
    borderLeftWidth: 4,
    borderLeftColor: '#39B7CD',
    paddingVertical: hp(1),
    paddingLeft: hp(1.5),
  },
  detailsModal: {
    position: 'absolute',
    backgroundColor: 'grey',
    top: hp(10),
    borderRadius: 15,
    height: hp(60),
    elevation: 20,
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
});
