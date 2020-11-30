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
import Icon from '../component/Icon';
import {useSelector, useDispatch} from 'react-redux';
import * as wpActions from '../Store/actions';
import moment from 'moment';
import {showMessage} from 'react-native-flash-message';
import Schema from '../Database/Schema';
import ImageOptionModal from '../component/ImageOptionModal';
import {ImagePicker, openGallery} from '../component/ImagePicker';
import {styles} from '../desgin/style';

const Category = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('no image');
  const [threshold, setThreshold] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [validationError, setValidationError] = useState({});
  const user = useSelector((state) => state.appData.userData);
  const dispatch = useDispatch();

  const createCategory = () => {
    Realm.open({
      schema: [Schema.User, Schema.Expense, Schema.Income, Schema.Category],
    }).then((realm) => {
      const id = realm.objects('Category').length + 1;
      realm.write(() => {
        realm.create('Category', {
          id,
          name: title,
          Image: image,
          DateOfCreation: moment().format('YYYY-MM-DD HH:mm:ss'),
          Threshold: parseInt(threshold),
          TotalAmount: 0,
          User: user.id,
        });
      });
      navigation.navigate('Dashboard');
    });
  };

  const validationData = () => {
    const error = {};
    if (title === '') {
      error.title = {
        type: 'required',
        message: 'Please enter your category title It is a required field.',
      };
    }
    if (title.length >= 60) {
      error.title = {
        type: 'strength',
        message: 'Please enter category title in between 1 - 60',
      };
    }
    if (threshold === '') {
      error.threshold = {
        type: 'required',
        message: 'Please enter your threshold. It is a required field.',
      };
    }
    if (isNaN(threshold)) {
      error.threshold = {
        type: 'invalid',
        message: 'Please enter valid threshold input in this field.',
      };
    }
    if (parseInt(threshold) < 100) {
      error.threshold = {
        type: 'strength',
        message: 'Please enter amount greater than 100',
      };
    }
    if (Object.keys(error).length === 0) {
      createCategory();
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
      <Text style={[inlineStyles.heading]}>Category Details</Text>
      <TextInput
        label="Category Name"
        mode="outlined"
        placeholder="Enter your category name"
        onChangeText={(text) => setTitle(text)}
        style={{marginHorizontal: wp(4)}}
      />
      {validationError &&
        validationError.title &&
        validationError.title.type === 'required' && (
          <Text
            style={{
              marginHorizontal: wp(5),
              color: colorCode.danger,
              marginVertical: hp(1),
            }}>
            {validationError.title.message}
          </Text>
        )}
      {validationError &&
        validationError.title &&
        validationError.title.type === 'strength' && (
          <Text
            style={{
              marginHorizontal: wp(5),
              color: colorCode.danger,
              marginVertical: hp(1),
            }}>
            {validationError.title.message}
          </Text>
        )}
      <TextInput
        label="Category Threshold"
        mode="outlined"
        placeholder="Enter your category threshold amount"
        onChangeText={(text) => setThreshold(text)}
        style={{marginHorizontal: wp(4)}}
      />
      {validationError &&
        validationError.threshold &&
        validationError.threshold.type === 'required' && (
          <Text
            style={{
              marginHorizontal: wp(5),
              color: colorCode.danger,
              marginVertical: hp(1),
            }}>
            {validationError.threshold.message}
          </Text>
        )}
      {validationError &&
        validationError.threshold &&
        validationError.threshold.type === 'invalid' && (
          <Text
            style={{
              marginHorizontal: wp(5),
              color: colorCode.danger,
              marginVertical: hp(1),
            }}>
            {validationError.threshold.message}
          </Text>
        )}
      {validationError &&
        validationError.threshold &&
        validationError.threshold.type === 'strength' && (
          <Text
            style={{
              marginHorizontal: wp(5),
              color: colorCode.danger,
              marginVertical: hp(1),
            }}>
            {validationError.threshold.message}
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
        style={[inlineStyles.captureBtn, styles.row]}
        onPress={() => setShowModal(true)}>
        <Icon iconType="FontAwesome" name="camera" size={40} color="grey" />
        <Text
          style={{
            fontSize: hp(2),
            textAlign: 'center',
            marginHorizontal: wp(2),
            color: colorCode.dark,
          }}>
          Capture Image
          <Text
            style={{
              fontSize: hp(1.5),
              textAlign: 'center',
              color: colorCode.DarkGray,
            }}>
            (Optional)
          </Text>
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
      <TouchableOpacity
        onPress={navigation.goBack}
        style={[inlineStyles.cancelBtn]}>
        <Text style={[inlineStyles.submitText]}>Cancel</Text>
      </TouchableOpacity>
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
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: hp(5),
  },
  submitText: {
    fontSize: hp(2),
    textAlign: 'center',
    color: colorCode.light,
  },
  cancelBtn: {
    fontSize: hp(2),
    textAlign: 'center',
    backgroundColor: 'tomato',
    alignSelf: 'center',
    padding: wp(2),
    borderRadius: 50,
    marginBottom: hp(5),
  },
});

export default Category;
