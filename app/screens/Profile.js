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
import Realm from 'realm';
import {useSelector, useDispatch} from 'react-redux';
import * as wpActions from '../Store/actions';
import moment from 'moment';
import Schema from '../Database/Schema';
import {styles} from '../desgin/style';

const Profile = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [income, setIncome] = useState(0);
  const [savings, setSavings] = useState(0);
  const dispatch = useDispatch();
  const createProfile = () => {
    Realm.open({
      schema: [Schema.User, Schema.Expense, Schema.Income, Schema.Category],
    }).then((realm) => {
      const id = realm.objects('User').length + 1;
      realm.write(() => {
        realm.create('User', {
          id,
          FirstName: firstName,
          LastName: lastName,
          Image: 'asfdsf',
          DateOfCreation: moment().format('DD/MM/YYYY'),
          Income: parseInt(income),
          Savings: parseInt(savings),
        });
        realm.create('Expense', {
          id: realm.objects('Expense').length + 1,
          Title: 'Initial Expense',
          Amount: parseInt(income) - parseInt(savings),
          Image: 'fghfgh',
          Category: 'General',
          DateOfCreation: moment().format('DD/MM/YYYY'),
          User: id,
        });
        realm.create('Income', {
          id: realm.objects('Income').length + 1,
          Title: 'Initial Savings',
          Amount: parseInt(savings),
          Image: 'fhgdfh',
          DateOfCreation: moment().format('DD/MM/YYYY'),
          User: id,
        });
        realm.create('Category', {
          id: realm.objects('Income').length + 1,
          name: 'General',
          TotalAmount: 0,
          Image: 'fhgdfh',
          DateOfCreation: moment().format('DD/MM/YYYY'),
          User: id,
        });
      });
      dispatch(wpActions.saveUser(realm.objects('User').filtered('id = id')));
      navigation.navigate('Dashboard');
    });
  };

  return (
    <View>
      <Text style={[inlineStyles.heading]}>Profile Details</Text>
      <TextInput
        label="First Name"
        mode="outlined"
        placeholder="Enter the First Name"
        onChangeText={(text) => setFirstName(text)}
        style={{marginHorizontal: wp(4)}}
      />
      <TextInput
        label="Last Name"
        mode="outlined"
        placeholder="Enter the Last Name"
        onChangeText={(text) => setLastName(text)}
        style={{marginHorizontal: wp(4)}}
      />
      <TextInput
        label="Income"
        mode="outlined"
        placeholder="Enter the income"
        onChangeText={(text) => setIncome(text)}
        style={{marginHorizontal: wp(4)}}
      />
      <TextInput
        label="Savings"
        mode="outlined"
        placeholder="Enter the savings"
        onChangeText={(text) => setSavings(text)}
        style={{marginHorizontal: wp(4)}}
      />
      {/* <View style={{height:hp(20),backgroundColor:'white',marginVertical:hp(5),marginHorizontal:wp(30)}}>

            </View> */}
      <TouchableOpacity
        style={[inlineStyles.captureBtn, styles.pvSm, styles.mvSm]}>
        <Text
          style={{
            fontSize: hp(2),
            textAlign: 'center',
            color: colorCode.light,
          }}>
          Capture Image
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          {backgroundColor: '#008080', marginHorizontal: wp(4)},
          styles.pvSm,
          styles.mvSm,
        ]}
        onPress={() => createProfile()}>
        <Text style={[inlineStyles.submitText]}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const inlineStyles = StyleSheet.create({
  heading: {
    fontSize: hp(4),
    textAlign: 'center',
    marginVertical: hp(4),
  },
  captureBtn: {
    backgroundColor: colorCode.danger,
    borderRadius: 25,
    marginHorizontal: wp(32),
  },
  submitText: {
    fontSize: hp(2),
    textAlign: 'center',
    color: colorCode.light,
  },
});

export default Profile;
