/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FAB} from 'react-native-paper';
import {colorCode} from '../desgin/colorCode';
import {Calendar} from 'react-native-calendars';
import {styles} from '../desgin/style';
import Realm from 'realm';
import ActionSheet from 'react-native-actions-sheet';
import ImageView from 'react-native-image-viewing';
import Schema from '../Database/Schema';
import moment from 'moment';

const ExpenseCalendar = ({navigation}) => {
  const [selectedDateExpense, setSelectedDateExpense] = useState([]);
  const [expenseDates, setExpenseDates] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [visible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const actionSheetRef = useRef();

  const openImageViewer = (item) => {
    setSelectedExpense(item);
    setIsVisible(true);
  };

  const expenseListItem = (item, index) => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', justifyContent: 'space-between'}}
        key={index}
        onPress={() => openImageViewer(item)}>
        <View style={{flexDirection: 'row'}}>
          {item.Image !== 'no image' ? (
            <Image
              style={{
                width: wp(10),
                height: wp(10),
                backgroundColor: 'red',
                borderRadius: wp(2),
                margin: wp(2),
              }}
              source={{uri: 'file://' + item.Image}}
            />
          ) : (
            // <View
            //   style={{
            //     width: wp(10),
            //     height: wp(10),
            //     backgroundColor: 'red',
            //     borderRadius: wp(2),
            //     margin: wp(2),
            //     justifyContent: 'center',
            //     alignItems: 'center',
            //   }}>
            //   <Text style={{color: 'white', fontSize: wp(6)}}>G</Text>
            // </View>
            <View
              style={{
                width: wp(10),
                height: wp(10),
                backgroundColor: categories.filter(
                  (category) => category.name === item.Category,
                )[0].avatarColor,
                borderRadius: wp(2),
                margin: wp(2),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: wp(6)}}>
                {item.Category[0]}
              </Text>
            </View>
          )}
          <View style={[{justifyContent: 'center'}]}>
            <Text
              style={{
                color: 'white',
                fontSize: hp(2.5),
              }}>
              {item.Title}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: hp(2),
              }}>
              {moment(item.DateOfCreation).format('HH:mm A')}
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: 'white',
            fontSize: hp(2.5),
            alignSelf: 'center',
            marginRight: wp(2),
          }}>
          &#8377; {item.Amount}
        </Text>
      </TouchableOpacity>
    );
  };

  const getExpenseOfThisDate = (date) => {
    Realm.open({schema: [Schema.Expense]}).then((realm) => {
      const thisMonthExpense = realm
        .objects('Expense')
        .filtered(`DateOfCreation LIKE '${date.dateString}*'`);
      setSelectedDateExpense(thisMonthExpense);
      actionSheetRef.current?.setModalVisible(true);
    });
  };
  const fetchData = () => {
    Realm.open({schema: [Schema.Expense]}).then((realm) => {
      const expenseData = realm
        .objects('Expense')
        .filtered(`DateOfCreation LIKE '${moment().format('YYYY-MM')}*'`);
      const dates = expenseData.map((item) => {
        return moment(item.DateOfCreation).format('YYYY-MM-DD');
      });
      const distinctDates = [...new Set(dates)];
      const newDates = {};
      distinctDates.forEach((item) => {
        let statusValue = 0;
        dates.forEach((dbitems) => {
          if (item.DateOfCreation === dbitems.split(' ')[0]) {
            statusValue = statusValue + dbitems.Amount;
          }
        });
        newDates[item] =
          statusValue > 3000
            ? {
                customStyles: {
                  container: {
                    backgroundColor: 'red',
                  },
                  text: {
                    color: 'white',
                  },
                },
              }
            : {
                customStyles: {
                  container: {
                    backgroundColor: '#32cd32',
                  },
                  text: {
                    color: 'white',
                  },
                },
              };
      });
      setExpenseDates(newDates);
    });
  };

  const totalExpenseDays = () => {
    let count = 0;
    for (const value in expenseDates) {
      count = count + 1;
    }
    return count;
  };

  const fetchCategories = () => {
    Realm.open({schema: [Schema.Category]}).then((realm) => {
      const category = realm.objects('Category');
      setCategories(category);
    });
  };

  return (
    <ScrollView style={{flex: 1}}>
      <Calendar
        markingType={'custom'}
        markedDates={{
          ...expenseDates,
          [moment().format('YYYY-MM-DD')]: {
            selected: true,
            marked: true,
            selectedColor: 'red',
          },
        }}
        onDayPress={(date) => {
          getExpenseOfThisDate(date);
        }}
      />
      <View style={{padding: wp(4), backgroundColor: '#FFFF99'}}>
        <Text style={{fontSize: wp(8)}}>Note</Text>
        <Text style={{fontSize: wp(4), marginBottom: wp(2)}}>
          1- Please click on the the date to get the list of expenses of that
          day.
        </Text>
        <Text style={{fontSize: wp(4), marginBottom: wp(2)}}>
          2- Red highlighted dates means those dates on which you have pass
          through your daily expense threshold.
        </Text>
        <Text style={{fontSize: wp(4), marginBottom: wp(2)}}>
          3- Green highlighted dates means those dates on which you have not
          pass through your daily expense threshold.
        </Text>
        <Text style={{fontSize: wp(4), marginBottom: wp(2)}}>
          4- No highlighted dates means those dates on which you have not any
          expense.
        </Text>
        <Text />
      </View>
      <ActionSheet ref={actionSheetRef}>
        <ImageBackground
          style={{width: wp(100), height: hp(75)}}
          source={require('../assets/images/background3.jpg')}>
          <View style={[styles.row]}>
            <Text
              style={{
                fontSize: wp(5),
                paddingHorizontal: 20,
                marginVertical: 20,
                color: 'white',
                width: wp(80),
              }}>
              Total days on which you spend money of this category.
            </Text>
            <View style={[inlineStyles.avatar]}>
              <Text style={{fontSize: hp(4), color: 'white'}}>
                {totalExpenseDays()}
              </Text>
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
            <Text style={{fontSize: hp(2.5), color: 'white'}}>
              &#8377;{' '}
              {selectedDateExpense.length
                ? selectedDateExpense
                    .map((item) => item.Amount)
                    .reduce((a, b) => a + b)
                : 0}
            </Text>
          </View>
          <ScrollView>
            {selectedDateExpense.map((item, index) =>
              expenseListItem(item, index),
            )}
          </ScrollView>
        </ImageBackground>
      </ActionSheet>
      {/* <FAB
        icon="plus"
        animated={true}
        style={{
          backgroundColor: 'orange',
          position: 'absolute',
          right: wp(6),
          bottom: hp(5),
        }}
        onPress={() => actionSheetRef.current?.setModalVisible()}
      /> */}
      {selectedExpense && selectedExpense.Image && (
        <ImageView
          images={
            selectedExpense && selectedExpense.Image === 'no image'
              ? [require('../assets/images/noImage.jpg')]
              : [{uri: 'file://' + selectedExpense.Image}]
          }
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
          FooterComponent={() => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: wp(4),
              }}>
              <View>
                <Text style={{color: 'white', fontSize: wp(5)}}>
                  {selectedExpense && selectedExpense.Title}
                </Text>
                <Text style={{color: 'white', fontSize: wp(4)}}>
                  {selectedExpense && selectedExpense.Category}
                </Text>
                <Text style={{color: 'white', fontSize: wp(4)}}>
                  {selectedExpense && selectedExpense.DateOfCreation}
                </Text>
              </View>
              <View>
                <Text style={{color: 'white', fontSize: wp(5)}}>
                  &#8377; {selectedExpense && selectedExpense.Amount}
                </Text>
              </View>
            </View>
          )}
        />
      )}
      {/* {selectedExpense && selectedExpense.Image === 'no image' && visible && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            zIndex: 200000,
            backgroundColor: 'red',
            position: 'absolute',
          }}>
          <Text>G</Text>
        </View>
      )} */}
    </ScrollView>
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
