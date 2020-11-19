import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
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
import {showMessage} from 'react-native-flash-message';
import Schema from '../Database/Schema';
import ImageOptionModal from '../component/ImageOptionModal';
import {ImagePicker, openGallery} from '../component/ImagePicker';
import {styles} from '../desgin/style';

const Profile = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [income, setIncome] = useState('');
  const [savings, setSavings] = useState('');
  const [image, setImage] = useState('no image');
  const [showModal, setShowModal] = useState(false);
  const [validationError, setValidationError] = useState({});
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
          Image: image,
          DateOfCreation: moment().format('DD/MM/YYYY'),
          Income: parseInt(income),
          Savings: parseInt(savings),
        });
        realm.create('Expense', {
          id: realm.objects('Expense').length + 1,
          Title: 'Initial Expense',
          Amount: parseInt(income) - parseInt(savings),
          Image: image,
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

  const validationData = () => {
    const error = {};
    if (firstName === '') {
      error.firstName = {
        type: 'required',
        message: 'Please enter your first name. It is a required field.',
      };
    }
    if (firstName.length >= 60) {
      error.firstName = {
        type: 'strength',
        message: 'Please enter first name in between 1 - 60',
      };
    }
    if (lastName === '') {
      error.lastName = {
        type: 'required',
        message: 'Please enter your last name. It is a required field.',
      };
    }
    if (lastName.length >= 60) {
      error.lastName = {
        type: 'strength',
        message: 'Please enter last name in between 1 - 60',
      };
    }
    if (income === '') {
      error.income = {
        type: 'required',
        message: 'Please enter your income. It is a required field.',
      };
    }
    if (isNaN(income)) {
      error.income = {
        type: 'invalid',
        message: 'Please enter valid income input in this field.',
      };
    }
    if (savings === '') {
      error.savings = {
        type: 'required',
        message: 'Please enter your savings. It is a required field.',
      };
    }
    if (isNaN(savings)) {
      error.savings = {
        type: 'invalid',
        message: 'Please enter valid savings input in this field.',
      };
    }
    if (Object.keys(error).length === 0) {
      createProfile();
    } else {
      setValidationError(error);
      showMessage({
        message: 'Invalid Input!',
        description:
          'Please enter the valid input in the following input fields.',
        type: 'danger',
      });
    }
  };

  const fetchImageData = async (option) => {
    option === 'openCamera' ? ImagePicker(callback) : openGallery(callback);
  };

  const callback = (res) => {
    setImage(res.path);
    setShowModal(false);
  };

  return (
    <ScrollView>
      <Text style={[inlineStyles.heading]}>Profile Details</Text>
      <TextInput
        label="First Name"
        mode="outlined"
        placeholder="Enter your First Name"
        onChangeText={(text) => setFirstName(text)}
        style={{marginHorizontal: wp(4)}}
      />
      {validationError &&
        validationError.firstName &&
        validationError.firstName.type === 'required' && (
          <Text
            style={{
              marginHorizontal: wp(5),
              color: colorCode.danger,
              marginVertical: hp(1),
            }}>
            {validationError.firstName.message}
          </Text>
        )}
      {validationError &&
        validationError.firstName &&
        validationError.firstName.type === 'strength' && (
          <Text
            style={{
              marginHorizontal: wp(5),
              color: colorCode.danger,
              marginVertical: hp(1),
            }}>
            {validationError.firstName.message}
          </Text>
        )}
      <TextInput
        label="Last Name"
        mode="outlined"
        placeholder="Enter your Last Name"
        onChangeText={(text) => setLastName(text)}
        style={{marginHorizontal: wp(4)}}
      />
      {validationError &&
        validationError.lastName &&
        validationError.lastName.type === 'required' && (
          <Text
            style={{
              marginHorizontal: wp(5),
              color: colorCode.danger,
              marginVertical: hp(1),
            }}>
            {validationError.lastName.message}
          </Text>
        )}
      {validationError &&
        validationError.lastName &&
        validationError.lastName.type === 'strength' && (
          <Text
            style={{
              marginHorizontal: wp(5),
              color: colorCode.danger,
              marginVertical: hp(1),
            }}>
            {validationError.lastName.message}
          </Text>
        )}
      <TextInput
        label="Income"
        mode="outlined"
        placeholder="Enter your income"
        onChangeText={(text) => setIncome(text)}
        style={{marginHorizontal: wp(4)}}
      />
      {validationError &&
        validationError.income &&
        validationError.income.type === 'required' && (
          <Text
            style={{
              marginHorizontal: wp(5),
              color: colorCode.danger,
              marginVertical: hp(1),
            }}>
            {validationError.income.message}
          </Text>
        )}
      {validationError &&
        validationError.income &&
        validationError.income.type === 'invalid' && (
          <Text
            style={{
              marginHorizontal: wp(5),
              color: colorCode.danger,
              marginVertical: hp(1),
            }}>
            {validationError.income.message}
          </Text>
        )}
      <TextInput
        label="Savings"
        mode="outlined"
        placeholder="Enter your savings"
        onChangeText={(text) => setSavings(text)}
        style={{marginHorizontal: wp(4)}}
      />
      {validationError &&
        validationError.savings &&
        validationError.savings.type === 'required' && (
          <Text
            style={{
              marginHorizontal: wp(5),
              color: colorCode.danger,
              marginVertical: hp(1),
            }}>
            {validationError.savings.message}
          </Text>
        )}
      {validationError &&
        validationError.savings &&
        validationError.savings.type === 'invalid' && (
          <Text
            style={{
              marginHorizontal: wp(5),
              color: colorCode.danger,
              marginVertical: hp(1),
            }}>
            {validationError.savings.message}
          </Text>
        )}
      {image !== 'no image' && (
        <Image
          source={{uri: 'file://' + image}}
          style={{
            height: hp(20),
            backgroundColor: 'white',
            marginVertical: hp(3),
            marginHorizontal: wp(30),
          }}
        />
      )}
      <TouchableOpacity
        style={[inlineStyles.captureBtn, styles.pvSm, styles.mvSm]}
        onPress={() => setShowModal(!showModal)}>
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
        onPress={validationData}>
        <Text style={[inlineStyles.submitText]}>Submit</Text>
      </TouchableOpacity>
      {showModal ? (
        <ImageOptionModal fetchImage={fetchImageData} close={setShowModal} />
      ) : null}
    </ScrollView>
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
