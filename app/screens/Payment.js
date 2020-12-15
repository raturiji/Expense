import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Modal,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colorCode} from '../desgin/colorCode';
import {TextInput, List} from 'react-native-paper';
import Realm from 'realm';
import * as Animatable from 'react-native-animatable';
import Schema from '../Database/Schema';
import moment from 'moment';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import Icon from '../component/Icon';
import {ImagePicker, openGallery} from '../component/ImagePicker';
import ImageOptionModal from '../component/ImageOptionModal';
import {styles} from '../desgin/style';

const Payment = ({navigation}) => {
  const [paymentTitle, setPaymentTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [validationError, setValidationError] = useState(null);
  const currentProfile = useSelector((state) => state.appData.userData);
  const [listItem, setListItem] = useState({name: 'Category'});
  const [expanded, setExpanded] = useState(false);
  const [image, setImage] = useState('no image');
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    Realm.open({schema: [Schema.Category, Schema.Expense]}).then((realm) => {
      const category = realm.objects('Category');
      const expense = realm.objects('Expense');
      setCategories(category);
      setExpenseData(expense);
    });
  }, []);

  const makePayment = () => {
    Realm.open({schema: [Schema.User, Schema.Expense, Schema.Category]}).then(
      (realm) => {
        const category = realm
          .objects('Category')
          .filtered(`name = '${listItem.name}'`);
        const totalAmount = category[0].TotalAmount + parseInt(amount);
        realm.write(() => {
          realm.create('Expense', {
            id:
              realm.objects('Expense')[realm.objects('Expense').length - 1].id +
              1,
            Title: paymentTitle,
            Image: image === undefined ? 'no image' : image,
            Amount: parseInt(amount),
            Category: listItem.name,
            DateOfCreation: moment().format('YYYY-MM-DD HH:mm:ss'),
            User: currentProfile.id,
          });
          realm.create(
            'Category',
            {id: category[0].id, TotalAmount: totalAmount},
            'modified',
          );
        });
      },
    );
    navigation.goBack();
  };

  const validationData = () => {
    const error = {};
    if (paymentTitle === '') {
      error.title = {
        type: 'required',
        message: 'Please enter Payment Title input. It is a required field.',
      };
    }
    if (paymentTitle.length >= 60) {
      error.title = {
        type: 'strength',
        message: 'Please enter Payment Title in between 1 - 60.',
      };
    }
    if (amount === '') {
      error.amount = {
        type: 'required',
        message: 'Please enter Amount input. It is a required field.',
      };
    }
    if (isNaN(amount)) {
      error.amount = {
        type: 'invalid',
        message: 'Please enter valid amount input in this field.',
      };
    }
    if (listItem.name === 'Category') {
      error.category = {
        type: 'required',
        message: ' Please select a category from the list.',
      };
    }
    if (Object.keys(error).length === 0) {
      if (
        amount > expenseData.map((item) => item.Amount).reduce((a, b) => a + b)
      ) {
        setAlert(true);
      } else {
        makePayment();
      }
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

  const backToDashboard = () => {
    navigation.goBack();
  };

  const selectCategory = (category) => {
    const categoryExpenseData = expenseData.map(
      (item) => item.Category === category,
    );
    setListItem(category);
    setExpenseData(categoryExpenseData);
    setExpanded(false);
  };

  const fetchImageData = async (option) => {
    option === 'openCamera' ? ImagePicker(callback) : openGallery(callback);
  };

  const callback = (res) => {
    setImage(res.path);
    setShowModal(false);
  };

  return (
    <ImageBackground
      source={require('../assets/images/background2.jpg')}
      style={{flex: 1}}>
      <ScrollView>
        <Text style={[inlineStyles.heading]}>Payment Details</Text>
        <TextInput
          label="Payment Title"
          mode="outlined"
          placeholder="Enter the payment title"
          style={{marginHorizontal: wp(4)}}
          onChangeText={(text) => setPaymentTitle(text)}
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
          label="Amount"
          mode="outlined"
          placeholder="Enter the amount"
          style={{marginHorizontal: wp(4)}}
          onChangeText={(text) => setAmount(text)}
        />
        {validationError &&
          validationError.amount &&
          validationError.amount.type === 'required' && (
            <Text
              style={{
                marginHorizontal: wp(5),
                color: colorCode.danger,
                marginVertical: hp(1),
              }}>
              {validationError.amount.message}
            </Text>
          )}
        {validationError &&
          validationError.amount &&
          validationError.amount.type === 'invalid' && (
            <Text
              style={{
                marginHorizontal: wp(5),
                color: colorCode.danger,
                marginVertical: hp(1),
              }}>
              {validationError.amount.message}
            </Text>
          )}
        {image !== 'no image' && image !== undefined && (
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
        {showModal ? (
          <ImageOptionModal fetchImage={fetchImageData} close={setShowModal} />
        ) : null}
        <List.Accordion
          title={listItem.name}
          titleStyle={{fontSize: hp(2), fontWeight: 'bold'}}
          description={
            listItem.name === 'Category'
              ? 'Select Category in which you want add this expense.'
              : null
          }
          expanded={expanded}
          onPress={() => setExpanded(!expanded)}
          left={(props) =>
            listItem.name === 'Category' ? (
              <Image
                style={[
                  inlineStyles.avatar,
                  styles.mhSm,
                  {backgroundColor: 'white'},
                ]}
                source={require('../assets/images/category.png')}
              />
            ) : (
              <View
                style={[
                  inlineStyles.avatar,
                  styles.mhSm,
                  {backgroundColor: listItem.avatarColor},
                ]}>
                <Text style={{color: 'white'}}>{listItem.name[0]}</Text>
              </View>
            )
          }>
          {categories.map((item, index) => (
            <List.Item
              title={item.name}
              titleStyle={{fontSize: hp(2), fontWeight: 'bold'}}
              left={(props) =>
                item.Image !== 'no image' ? (
                  <Image
                    style={[inlineStyles.avatar, styles.mhSm]}
                    source={{uri: 'file://' + item.Image}}
                  />
                ) : (
                  <View
                    style={[
                      inlineStyles.avatar,
                      styles.mhSm,
                      {backgroundColor: item.avatarColor},
                    ]}>
                    <Text style={{color: 'white'}}>{item.name[0]}</Text>
                  </View>
                )
              }
              onPress={() => selectCategory(item)}
              key={index}
            />
          ))}
        </List.Accordion>
        {validationError &&
          validationError.category &&
          validationError.category.type === 'required' && (
            <Text
              style={{
                marginHorizontal: wp(5),
                color: colorCode.danger,
                marginVertical: hp(1),
              }}>
              {validationError.category.message}
            </Text>
          )}
        <TouchableOpacity
          style={[
            {backgroundColor: '#008080', marginHorizontal: wp(4)},
            styles.pvSm,
            styles.mvSm,
          ]}
          onPress={validationData}>
          <Text style={[inlineStyles.submitText]}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={backToDashboard}
          style={[inlineStyles.cancelBtn]}>
          <Text style={[inlineStyles.submitText]}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
      {alert ? (
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
            style={{backgroundColor: 'white', padding: wp(2), width: wp(80)}}>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              By making this payment you are crosssing your threshold limit of
              this category. Do you want to continue
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              backgroundColor: 'white',
              paddingVertical: wp(3),
              width: wp(80),
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                paddingHorizontal: wp(3),
                paddingVertical: wp(2),
                borderRadius: wp(1),
              }}>
              <Text style={{color: 'white'}}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'tomato',
                paddingHorizontal: wp(3),
                paddingVertical: wp(2),
                borderRadius: wp(1),
              }}>
              <Text style={{color: 'white'}}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </ImageBackground>
  );
};

export default Payment;

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
  avatar: {
    width: wp(12),
    height: wp(12),
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(12) / 2,
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
