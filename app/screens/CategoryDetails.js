import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {styles} from '../desgin/style';
import ActionSheet from 'react-native-actions-sheet';
import Schema from '../Database/Schema';
import Realm from 'realm';
import PureChart from 'react-native-pure-chart';
const CategoryDetails = ({route, navigation}) => {
  const [categoryExpenseData, setCategoryExpenseData] = useState([]);
  const [category, setCategory] = useState(null);
  const {name} = route.params;
  useEffect(() => {
    Realm.open({schema: [Schema.Expense, Schema.Category]}).then((realm) => {
      const data = realm
        .objects('Expense')
        .filtered(
          `Category = '${name}' AND DateOfCreation LIKE '${moment().format(
            'YYYY-MM',
          )}*' `,
        );
      const categories = realm.objects('Category').filtered(`name = '${name}'`);
      setCategoryExpenseData(data);
      setCategory(categories[0]);
    });
  }, []);

  let sampleData = categoryExpenseData.map((item) => {
    return {x: item.DateOfCreation.split(' ')[0], y: item.Amount};
  });

  const actionSheetRef = useRef();

  const ExpensePercentage =
    category && (category.TotalAmount / category.Threshold) * 100;

  return (
    <ScrollView>
      <View style={{marginTop: wp(4)}}>
        {category && category.TotalAmount ? (
          <PureChart
            data={[{x: 2020 - 11 - 23, y: 0}, ...sampleData]}
            type="line"
            width={'100%'}
            height={hp(40)}
          />
        ) : null}
      </View>
      <View style={{height: hp(50)}}>
        <View style={[styles.row]}>
          <Text
            style={{
              fontSize: wp(5),
              paddingHorizontal: 20,
              marginVertical: 20,
              color: 'black',
            }}>
            You are reaching to your monthly threshold of this category
          </Text>
        </View>
        <View
          style={{
            height: hp(5),
            backgroundColor: '#0066b2',
            marginHorizontal: wp(5),
            borderRadius: 5,
            flexDirection: 'row',
          }}>
          <View
            style={{
              backgroundColor: '#89CFF0',
              height: hp(5),
              width: ExpensePercentage,
              justifyContent: 'center',
              borderRadius: 5,
              paddingLeft: wp(2),
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp(5),
            marginVertical: wp(4),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: wp(3),
                width: wp(3),
                backgroundColor: '#89CFF0',
                alignItems: 'center',
                marginRight: wp(2),
              }}
            />
            <Text style={{color: 'black', fontWeight: '600', fontSize: wp(4)}}>
              Expense({ExpensePercentage}%)
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: wp(3),
                width: wp(3),
                backgroundColor: '#0066b2',
                alignItems: 'center',
                marginLeft: wp(5),
                marginRight: wp(2),
              }}
            />
            <Text style={{color: 'black', fontWeight: '600', fontSize: wp(4)}}>
              Threshold({100 - ExpensePercentage}%)
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
          <Text style={{fontSize: hp(3)}}>Total</Text>
          <Text style={{fontSize: hp(2.5)}}>
            &#8377; {categoryExpenseData.length ? category.TotalAmount : 0}
          </Text>
        </View>
        <ScrollView>
          {categoryExpenseData.map((item, index) => (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
              key={index}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: wp(10),
                    height: wp(10),
                    backgroundColor: 'red',
                    borderRadius: wp(2),
                    margin: wp(2),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white', fontSize: wp(6)}}>
                    {item.Title[0]}
                  </Text>
                </View>
                <View style={[{justifyContent: 'center'}]}>
                  <Text
                    style={{
                      fontSize: hp(2.5),
                    }}>
                    {item.Title}
                  </Text>
                  <Text
                    style={{
                      fontSize: hp(2),
                    }}>
                    {moment(item.DateOfCreation).format('YYYY-MM-DD  HH:mm A')}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: hp(2.5),
                  alignSelf: 'center',
                  marginRight: wp(2),
                }}>
                &#8377; {item.Amount}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      {/* <ActionSheet ref={actionSheetRef}>
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
      </ActionSheet> */}
    </ScrollView>
  );
};

export default CategoryDetails;
