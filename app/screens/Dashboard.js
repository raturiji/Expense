import React, {useState, useEffect, cloneElement} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colorCode} from '../desgin/colorCode';
import Icon from '../component/Icon';
import Pie from 'react-native-pie';
import {FAB} from 'react-native-paper';
import Realm from 'realm';
import {useSelector, useDispatch} from 'react-redux';
import * as wpActions from '../Store/actions';
import moment from 'moment';
import Schema from '../Database/Schema';
import {styles} from '../desgin/style';

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.appData.userData);
  const [user, setUser] = useState(userData);
  const [data, setData] = useState([]);
  const [saving, setSaving] = useState(null);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      user &&
        Realm.open({schema: [Schema.User]}).then((realm) => {
          dispatch(wpActions.saveUser(realm.objects('User')[0]));
          setUser(realm.objects('User')[0]);
        });
      Realm.open({schema: [Schema.Expense]}).then((realm) => {
        setData(realm.objects('Expense'));
      });
      PresentSaving();
    });
    return unsubscribe;
  }, [navigation]);

  const nextScreen = () => {
    navigation.navigate('Payment');
  };
  const PresentSaving = () => {
    Realm.open({schema: [Schema.Expense]}).then((realm) => {
      const thisMonthExpense = realm
        .objects('Expense')
        .filtered(`DateOfCreation LIKE '*/${moment().format('MM')}/*' `);
      let thisMonthSaving =
        user.Income -
        thisMonthExpense.map((item) => item.Amount).reduce((a, b) => a + b);
      setSaving(thisMonthSaving);
    });
  };

  const ExpensePercentage = ((user.Income - saving) / user.Income) * 100;
  const SavingPercentage = (saving / user.Income) * 100;
  console.log(data, 'works');
  return (
    <>
      <ScrollView>
        <View
          style={[
            styles.mhSm,
            styles.mvSm,
            {backgroundColor: colorCode.light, borderRadius: 4},
          ]}>
          <View style={[styles.row, styles.between, styles.mhSm, styles.mvSm]}>
            <Text style={[{fontSize: hp(3)}]}>Overview - December</Text>
            <Icon
              iconType="AntDesign"
              color="black"
              size={20}
              name="caretdown"
            />
          </View>
          <View
            style={[
              styles.row,
              styles.between,
              styles.mhSm,
              {marginVertical: hp(1)},
            ]}>
            <Text
              style={[
                inlineStyles.overviewDetails,
                {borderLeftColor: '#39B7CD'},
              ]}>
              Income
            </Text>
            <Text style={[styles.sm]}>&#8377; {user && user.Income}</Text>
          </View>
          <View
            style={[
              styles.row,
              styles.between,
              styles.mhSm,
              {marginVertical: hp(1)},
            ]}>
            <Text
              style={[
                inlineStyles.overviewDetails,
                {borderLeftColor: colorCode.danger},
              ]}>
              Expenses
            </Text>
            <Text style={[styles.sm]}>
              &#8377; {user && user.Income - saving}
            </Text>
          </View>
          <View
            style={[
              styles.row,
              styles.between,
              styles.mhSm,
              {marginVertical: hp(1)},
            ]}>
            <Text
              style={[
                inlineStyles.overviewDetails,
                {borderLeftColor: colorCode.success},
              ]}>
              Savings
            </Text>
            <Text style={[styles.sm]}>&#8377; {saving}</Text>
          </View>
        </View>
        <View
          style={[
            styles.mhSm,
            styles.mvSm,
            {backgroundColor: colorCode.light, borderRadius: 4},
          ]}>
          <Text style={[styles.mhSm, styles.mvSm, {fontSize: hp(3)}]}>
            Expenses by Category
          </Text>
          <View style={[styles.row, styles.between, styles.mhSm, styles.mvSm]}>
            <Pie
              radius={50}
              innerRadius={20}
              sections={[
                {
                  percentage: 100,
                  color: '#39B7CD',
                },
                {
                  percentage: ExpensePercentage,
                  color: 'red',
                },
                {
                  percentage: SavingPercentage,
                  color: 'green',
                },
              ]}
              strokeCap={'butt'}
            />
            <View style={[styles.mhSm]}>
              <Text
                style={[
                  {
                    fontFamily: 'DroidSans-Bold',
                    color: '#111E6C',
                    fontSize: hp(3),
                    width: wp(65),
                  },
                ]}>
                You have saved &#8377; {saving} by now.
              </Text>
              <Text
                style={[
                  {
                    fontFamily: 'DroidSans-Bold',
                    color: colorCode.dark,
                    fontSize: hp(2),
                    width: wp(65),
                  },
                ]}>
                You are few bucks away to reach your goal
              </Text>
              <View
                style={[
                  inlineStyles.detailsBtn,
                  styles.row,
                  styles.ctr,
                  {marginVertical: hp(1)},
                ]}>
                <Text style={[{color: colorCode.light}]}>View Details</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.mhSm,
            styles.mvSm,
            {backgroundColor: colorCode.light, borderRadius: 4},
          ]}>
          <Text style={[styles.mhSm, styles.mvSm, {fontSize: hp(3)}]}>
            Recent Activity
          </Text>
          {data
            .slice(-4)
            .reverse()
            .map((item) => (
              <View
                style={[
                  {backgroundColor: '#893F45', borderRadius: 10},
                  styles.row,
                  styles.between,
                  styles.phSm,
                  styles.pvSm,
                  styles.mhSm,
                  styles.mvSm,
                ]}>
                <View>
                  <Text style={[inlineStyles.customHeading]}>{item.Title}</Text>
                  <Text style={{color: colorCode.light}}>
                    {item.DateAndTime}
                  </Text>
                </View>
                <View>
                  <Text style={inlineStyles.priceTag}>
                    &#8377; {item.Amount}
                  </Text>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
      {/* <TouchableOpacity
        style={{position: 'absolute', bottom: '2%', left: '30%'}}
        onPress={() => nextScreen()}>
        <View style={[inlineStyles.paymentBtn, styles.row, styles.ctr]}>
          <Text style={{color: colorCode.light, fontSize: wp(8)}}>+</Text>
          <Text style={{color: colorCode.light, fontSize: wp(4)}}>
            {' '}
            New Payment
          </Text>
        </View>
      </TouchableOpacity> */}
      <FAB
        icon="plus"
        label="New Payment"
        style={{
          position: 'absolute',
          bottom: '2%',
          left: '30%',
          backgroundColor: '#008080',
        }}
        onPress={nextScreen}
      />
    </>
  );
};

const inlineStyles = StyleSheet.create({
  overviewDetails: {
    borderLeftWidth: 4,
    borderLeftColor: '#39B7CD',
    paddingVertical: hp(1),
    paddingLeft: hp(1.5),
  },
  detailsBtn: {
    backgroundColor: 'orange',
    width: wp(28),
    padding: wp(1),
    borderRadius: 50,
  },
  customHeading: {
    fontFamily: 'DroidSans-Bold',
    color: colorCode.light,
    fontSize: hp(2),
    width: wp(65),
  },
  listItem: {
    paddingVertical: hp(1),
    borderBottomWidth: 2,
    borderBottomColor: colorCode.light,
  },
  priceTag: {
    fontSize: hp(2),
    color: colorCode.light,
    fontFamily: 'DroidSans-Bold',
  },
  paymentBtn: {
    backgroundColor: '#008080',
    paddingVertical: wp(1),
    paddingHorizontal: wp(4),
    borderRadius: 25,
  },
});

export default Dashboard;
