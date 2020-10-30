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
import {colorCode} from '../desgin/colorCode';

const Sidebar = ({navigation}) => {
  const toProfileScreen = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={[{flex: 1, backgroundColor: '#5a5f63'}]}>
      <SafeAreaView>
        <Image
          style={[inlineStyles.avatar]}
          source={require('../assets/images/default_user.jpeg')}
        />
        <Text style={[inlineStyles.userName]}>Sagar Raturi</Text>
      </SafeAreaView>
      <View>
        <ListItem title="Profile" active={true} />
        <ListItem title="Gaming" />
        <ListItem title="Food" />
        <ListItem title="Travel" />
      </View>
    </View>
  );
};

const ListItem = ({onPress, title, active}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: active ? '#f57e16' : null,
      paddingLeft: wp(4),
      paddingVertical: hp(1),
      flexDirection: 'row',
    }}>
    <View style={[inlineStyles.profileAvatar]}>
      <Text style={{color: colorCode.light}}>P</Text>
    </View>
    <View style={{justifyContent: 'center'}}>
      <Text style={[inlineStyles.sideBarItem]}>{title}</Text>
    </View>
  </TouchableOpacity>
);
const inlineStyles = StyleSheet.create({
  sideBarItem: {
    fontSize: hp(2),
    color: colorCode.light,
  },
  avatar: {
    backgroundColor: 'red',
    width: wp(20),
    height: wp(20),
    alignSelf: 'center',
    borderRadius: wp(20) / 2,
  },
  userName: {
    fontStyle: 'italic',
    fontSize: hp(2.5),
    alignSelf: 'center',
    marginVertical: hp(2),
  },
  profileAvatar: {
    width: wp(12),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    marginRight: wp(4),
    borderRadius: wp(12) / 2,
  },
  overlay: {
    backgroundColor: 'red',
    opacity: 0.2,
    width: '100%',
    height: '100%',
  },
});

export default Sidebar;
