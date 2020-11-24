/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
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
import {useSelector, useDispatch} from 'react-redux';
import {styles} from '../desgin/style';
import Icon from './Icon';
import {colorCode} from '../desgin/colorCode';
import ImagePicker from '../component/ImagePicker';
import Realm from 'realm';
import Schema from '../Database/Schema';

const Sidebar = ({navigation}) => {
  const userData = useSelector((state) => state.appData.userData);
  const [user, setUser] = useState(userData);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    Realm.open({schema: [Schema.Category]}).then((realm) => {
      const category = realm
        .objects('Category')
        .filtered(`User = ${userData.id}`);
      setCategories(category);
    });
  }, []);
  return (
    <View style={[{flex: 1, backgroundColor: '#5a5f63'}]}>
      <SafeAreaView>
        {user && user.Image && user.Image !== 'no image' ? (
          <Image
            style={[inlineStyles.avatar]}
            source={{
              uri: 'file://' + user.Image,
            }}
          />
        ) : (
          <Image
            style={[inlineStyles.avatar]}
            source={require('../assets/images/default_user.jpeg')}
          />
        )}
        <Text style={[inlineStyles.userName]}>
          {user && user.FirstName} {user && user.LastName}
        </Text>
      </SafeAreaView>
      <View>
        {categories.map((item) => (
          <ListItem title={item.name} id={item.id} image={item.Image} />
        ))}
        <TouchableOpacity
          style={[styles.row, {paddingLeft: wp(4), paddingVertical: hp(2)}]}>
          <Icon iconType="AntDesign" size={20} name="plus" color="white" />
          <Text style={{color: 'white', marginHorizontal: wp(2)}}>
            Add Category
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ListItem = ({onPress, title, active, image, id}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: active ? '#f57e16' : null,
      paddingLeft: wp(4),
      paddingVertical: hp(1),
      flexDirection: 'row',
    }}
    key={id}>
    {image !== 'no image' ? (
      <Image style={[inlineStyles.profileAvatar]} source={{uri: image}} />
    ) : (
      <View style={[inlineStyles.profileAvatar]}>
        <Text style={{color: colorCode.light}}>{title[0]}</Text>
      </View>
    )}
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
    width: wp(20),
    height: wp(20),
    alignSelf: 'center',
    borderRadius: wp(20) / 2,
    marginTop: wp(4),
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
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
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
