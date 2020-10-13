/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FAB} from 'react-native-paper';
import {colorCode} from '../desgin/colorCode';
import {CalendarList} from 'react-native-calendars';
import ExpenseDetailsModal from '../component/ExpenseDetailsModal';
import {styles} from '../desgin/style';

const Calendar = ({navigation}) => {
  const nextScreen = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={{flex: 1}}>
      <CalendarList
        markingType={'custom'}
        markedDates={{
          '2020-09-22': {
            customStyles: {
              container: {
                backgroundColor: 'orange',
              },
              text: {
                color: 'white',
              },
            },
          },
          '2020-09-23': {
            customStyles: {
              container: {
                backgroundColor: 'white',
                elevation: 2,
              },
              text: {
                color: 'blue',
              },
            },
          },
        }}
      />
      {/* <TouchableOpacity
        style={{
          backgroundColor: 'green',
          position: 'absolute',
          borderRadius: 60 / 2,
          right: wp(6),
          bottom: hp(5),
          elevation: 80,
          width: 60,
          height: 60,
        }}>
        <Text style={{fontSize: hp(6), color: 'white'}}>+</Text>
      </TouchableOpacity> */}
      <FAB
        icon="plus"
        animated={true}
        style={{
          backgroundColor: 'orange',
          position: 'absolute',
          right: wp(6),
          bottom: hp(5),
        }}
      />
    </View>
  );
};

export default Calendar;
