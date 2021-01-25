import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
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
  }, [route.params.name]);

  let sampleData = categoryExpenseData.map((item) => {
    return {x: item.DateOfCreation.split(' ')[0], y: item.Amount};
  });

  const actionSheetRef = useRef();

  const totalAmount = categoryExpenseData.length
    ? categoryExpenseData.map((item) => item.Amount).reduce((a, b) => a + b)
    : 0;

  const ExpensePercentage = sampleData.length
    ? category && ((totalAmount / category.Threshold) * 100).toFixed(1)
    : 0;

  return (
    <View>
      <View style={{marginTop: wp(4)}}>
        {totalAmount > 0 ? (
          <PureChart
            data={[{x: 2020 - 11 - 23, y: 0}, ...sampleData]}
            type="line"
            width={'100%'}
            height={hp(40)}
          />
        ) : null}
      </View>
      <ScrollView style={{height: hp(50)}}>
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
              width:
                ExpensePercentage > 100
                  ? '100%'
                  : ExpensePercentage
                  ? `${ExpensePercentage}%`
                  : null,
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
              Threshold(
              {(100 - ExpensePercentage).toFixed(1)}%)
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
          <Text style={{fontSize: hp(3)}}>Threshold Amount</Text>
          <Text style={{fontSize: hp(2.5)}}>
            &#8377; {category && category.Threshold}
          </Text>
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
          <Text style={{fontSize: hp(2.5)}}>&#8377; {totalAmount}</Text>
        </View>
        <View>
          {categoryExpenseData.map((item, index) => (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
              key={index}>
              <View style={{flexDirection: 'row'}}>
                {console.log(item, 'testttttttt')}
                {item.Image === 'no image' ? (
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
                ) : (
                  <Image
                    style={{
                      width: wp(10),
                      height: wp(10),
                      borderRadius: wp(2),
                      margin: wp(2),
                    }}
                    source={{uri: 'file://' + item.Image}}
                  />
                )}
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
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryDetails;
