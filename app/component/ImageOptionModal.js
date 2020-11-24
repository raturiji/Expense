/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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
import Icon from '../component/Icon';
import {ImagePicker, openGallery} from '../component/ImagePicker';

const ImageOptionModal = (props) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        width: wp(100),
        height: hp(100),
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: wp(60),
          backgroundColor: 'white',
          borderColor: '#A9A9A9',
          borderWidth: 1,
          elevation: 1000,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            padding: hp(2),
            alignItems: 'center',
          }}
          onPress={() => props.fetchImage('openCamera')}>
          <Icon iconType="FontAwesome" name="camera" size={40} color="grey" />
          <Text style={{fontSize: hp(2), marginLeft: wp(2)}}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            padding: hp(2),
            alignItems: 'center',
          }}
          onPress={() => props.fetchImage('openGallery')}>
          <Icon
            iconType="MaterialIcons"
            name="photo-size-select-actual"
            size={40}
            color="grey"
          />
          <Text style={{fontSize: hp(2), marginLeft: wp(2)}}>
            Open from Storage
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.close(false)}>
          <Text
            style={{
              padding: hp(2),
              fontSize: hp(2),
              textAlign: 'center',
              color: 'red',
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageOptionModal;
