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
import {TextInput, List} from 'react-native-paper';
import Realm from 'realm';
import * as Animatable from 'react-native-animatable';
import Schema from '../Database/Schema';
import moment from 'moment';
import {useSelector} from 'react-redux';
import Icon from '../component/Icon';
import {styles} from '../desgin/style';

const Payment = ({navigation}) => {
  const [paymentTitle, setPaymentTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const currentProfile = useSelector((state) => state.appData.userData);
  const [listItem, setListItem] = useState('Category');
  const [expanded, setExpanded] = useState(false);
  const makePayment = () => {
    Realm.open({schema: [Schema.User, Schema.Expense]}).then((realm) => {
      realm.write(() => {
        realm.create('Expense', {
          id:
            realm.objects('Expense')[realm.objects('Expense').length - 1].id +
            1,
          Title: paymentTitle,
          Image: 'no Image',
          Amount: parseInt(amount),
          Category: listItem,
          DateOfCreation: moment().format('DD/MM/YYYY'),
          User: currentProfile.id,
        });
      });
    });
    navigation.goBack();
  };

  const backToDashboard = () => {
    navigation.goBack();
  };

  const selectCategory = () => {
    setListItem('General');
    setExpanded(false);
  };

  return (
    <View>
      <Text style={[inlineStyles.heading]}>Payment Details</Text>
      <TextInput
        label="Payment Title"
        mode="outlined"
        placeholder="Enter the payment title"
        style={{marginHorizontal: wp(4)}}
        onChangeText={(text) => setPaymentTitle(text)}
      />
      <TextInput
        label="Amount"
        mode="outlined"
        placeholder="Enter the amount"
        style={{marginHorizontal: wp(4)}}
        onChangeText={(text) => setAmount(text)}
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
      <List.Accordion
        title={listItem}
        description={
          listItem === 'Category'
            ? 'Select Category in which you want add this expense'
            : null
        }
        expanded={expanded}
        onPress={() => setExpanded(!expanded)}
        left={(props) =>
          listItem === 'Category' ? (
            <Image
              style={[
                inlineStyles.avatar,
                styles.mhSm,
                {backgroundColor: 'white'},
              ]}
              source={require('../assets/images/category.png')}
            />
          ) : (
            <View style={[inlineStyles.avatar, styles.mhSm]} />
          )
        }>
        <List.Item
          title="General"
          left={(props) => <View style={[inlineStyles.avatar, styles.mhSm]} />}
          onPress={selectCategory}
        />
      </List.Accordion>
      {/* <TouchableOpacity style={[{backgroundColor:'#e3e3e3',borderRadius:10},styles.row,styles.between,styles.phSm,styles.pvSm,styles.mhSm,styles.mvSm]} onPress={selectCategory}>
                <View>
                    <Text style={[styles.sm,{color:colorCode.dark}]}>Category</Text>
                </View>
                <View>
                    <Text style={[styles.sm]}> General</Text>
                </View>
            </TouchableOpacity> */}
      <TouchableOpacity
        style={[
          {backgroundColor: '#008080', marginHorizontal: wp(4)},
          styles.pvSm,
          styles.mvSm,
        ]}
        onPress={makePayment}>
        <Text style={[inlineStyles.submitText]}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={backToDashboard}>
        <Text style={[inlineStyles.submitText, {color: 'blue'}]}>Cancel</Text>
      </TouchableOpacity>
    </View>
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
    backgroundColor: colorCode.danger,
    borderRadius: 25,
    marginHorizontal: wp(32),
  },
  submitText: {
    fontSize: hp(2),
    textAlign: 'center',
    color: colorCode.light,
  },
  avatar: {
    width: wp(9),
    height: wp(9),
    backgroundColor: 'red',
    borderRadius: wp(9) / 2,
  },
});
