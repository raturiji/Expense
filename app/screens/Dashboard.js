import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
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
import {RNCamera} from 'react-native-camera';

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

  return (
    <ImageBackground
      source={require('../assets/images/background2.jpg')}
      style={{flex: 1}}>
      <ScrollView>
        <View
          style={[
            styles.mhSm,
            styles.mvSm,
            {
              backgroundColor: colorCode.light,
              borderRadius: 4,
              paddingBottom: 20,
            },
          ]}>
          <View style={[styles.row, styles.between, styles.mhSm, styles.mvSm]}>
            <Text style={styles.headerTitle}>Overview - December</Text>
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
              {
                borderLeftWidth: 5,
                borderLeftColor: '#0c9',
              },
            ]}>
            <Text style={[inlineStyles.overviewDetails]}>Income</Text>
            <Text style={[styles.sm]}>&#8377; {user && user.Income}</Text>
          </View>
          <View
            style={[
              styles.row,
              styles.between,
              styles.mhSm,
              {
                marginVertical: hp(1),
                borderLeftWidth: 5,
                borderLeftColor: 'tomato',
              },
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
              {
                borderLeftWidth: 5,
                borderLeftColor: '#0cf',
              },
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
          <Text style={styles.headerTitle}>Expenses by Category</Text>
          <View style={[styles.row, styles.between, styles.mhSm, styles.mvSm]}>
            {saving && (
              <Pie
                radius={50}
                innerRadius={20}
                sections={[
                  {
                    percentage: 100,
                    color: '#39B7CD',
                  },
                  {
                    percentage: parseInt(ExpensePercentage),
                    color: 'red',
                  },
                  {
                    percentage: parseInt(SavingPercentage),
                    color: 'green',
                  },
                ]}
                strokeCap={'butt'}
              />
            )}
            <View style={[styles.mhSm]}>
              <Text
                style={[
                  {
                    fontFamily: 'DroidSans-Bold',
                    color: '#111E6C',
                    fontSize: 16,
                    width: '80%',
                    paddingBottom: 5,
                  },
                ]}>
                You have saved &#8377; {saving} by now.
              </Text>
              <Text
                style={[
                  {
                    fontFamily: 'DroidSans-Bold',
                    color: colorCode.darkGray,
                    fontSize: 14,
                    width: wp(65),
                    paddingBottom: 10,
                  },
                ]}>
                You are few bucks away to reach your goal
              </Text>
              <View style={[inlineStyles.detailsBtn, styles.row, styles.ctr]}>
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
          <Text style={styles.headerTitle}>Recent Activity</Text>
          {data
            .slice(-4)
            .reverse()
            .map((item) => (
              <View style={[styles.row, styles.between, {padding: 15}]}>
                <View>
                  <Text style={[inlineStyles.customHeading]}>{item.Title}</Text>
                  {/* <Text style={{color: colorCode.dark}}>
                    {item.DateAndTime}
                  </Text> */}
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
      <FAB
        icon="plus"
        label="New Payment"
        style={{
          position: 'absolute',
          bottom: '5%',
          alignSelf: 'center',
          backgroundColor: '#008080',
        }}
        onPress={nextScreen}
      />
    </ImageBackground>
  );
};

const inlineStyles = StyleSheet.create({
  overviewDetails: {
    fontSize: 16,
    textTransform: 'uppercase',
    paddingLeft: 10,
    letterSpacing: 1.2,
  },
  detailsBtn: {
    backgroundColor: 'orange',
    width: wp(28),
    padding: wp(1),
    borderRadius: 50,
  },
  customHeading: {
    color: '#008b8b',
    fontSize: 18,
    width: wp(65),
    fontWeight: 'bold',
  },
  listItem: {
    paddingVertical: hp(1),
    borderBottomWidth: 2,
    borderBottomColor: colorCode.light,
  },
  priceTag: {
    color: 'orange',
    fontSize: hp(3),
    fontWeight: 'bold',
    textAlign: 'right',
  },
  paymentBtn: {
    backgroundColor: '#008080',
    paddingVertical: wp(1),
    paddingHorizontal: wp(4),
    borderRadius: 25,
  },
});

export default Dashboard;
