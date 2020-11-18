/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FAB} from 'react-native-paper';
import {colorCode} from '../desgin/colorCode';
import {Calendar} from 'react-native-calendars';
import ExpenseDetailsModal from '../component/ExpenseDetailsModal';
import {styles} from '../desgin/style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchCamera} from 'react-native-image-picker';

const ExpenseCalendar = ({navigation}) => {
  let camera;
  const nextScreen = () => {
    navigation.navigate('Settings');
  };

  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  const expenseListItem = (item) => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: wp(10),
              height: wp(10),
              backgroundColor: 'red',
              borderRadius: wp(2),
              margin: wp(2),
            }}
          />
          <Text
            style={{
              color: 'white',
              fontSize: hp(2.5),
              alignSelf: 'center',
            }}>
            Evening Snack
          </Text>
        </View>
        <Text
          style={{
            color: 'white',
            fontSize: hp(2.5),
            alignSelf: 'center',
            marginRight: wp(2),
          }}>
          &#8377; 2000
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Calendar
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
      {/* <RNCamera
        ref={(ref) => {
          camera = ref;
        }}
        style={inlineStyles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      /> */}
      <ImageBackground
        style={{width: wp(100), height: hp(100)}}
        source={require('../assets/images/background3.jpg')}>
        <View style={[styles.row]}>
          <Text
            style={{
              fontStyle: 'oblique',
              fontSize: wp(5),
              paddingHorizontal: 20,
              marginVertical: 20,
              color: 'white',
              width: wp(80),
            }}>
            Total days on which you spend money of this category.
          </Text>
          <View style={[inlineStyles.avatar]}>
            <Text style={{fontSize: hp(4), color: 'white'}}>20</Text>
          </View>
        </View>
        <View
          style={[
            styles.row,
            {
              justifyContent: 'space-between',
              paddingVertical: hp(2),
              marginHorizontal: wp(2),
              borderBottomWidth: 1,
              borderColor: '#e3e3e3',
            },
          ]}>
          <Text style={{fontSize: hp(3), color: 'white'}}>Total</Text>
          <Text style={{fontSize: hp(2.5), color: 'white'}}>&#8377; 2000</Text>
        </View>
        <ScrollView>
          {expenseListItem()}
          {expenseListItem()}
          {expenseListItem()}
          {expenseListItem()}
          {expenseListItem()}
          {expenseListItem()}
        </ScrollView>
      </ImageBackground>
      <FAB
        icon="plus"
        animated={true}
        style={{
          backgroundColor: 'orange',
          position: 'absolute',
          right: wp(6),
          bottom: hp(5),
        }}
        onPress={launchCamera}
      />
    </View>
  );
};

const inlineStyles = StyleSheet.create({
  avatar: {
    width: wp(15),
    height: wp(15),
    backgroundColor: '#ee5f70',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(15) / 2,
  },
  expensePic: {
    width: wp(10),
    height: wp(10),
  },
  preview: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: wp(100),
    height: hp(100),
    zIndex: 1000,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default ExpenseCalendar;
