import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
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
  const [categories, setCategories] = useState([]);
  const [details, setDetails] = useState(false);
  const [categoryTotalPrice, setCategoryTotalPrice] = useState([]);

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
      fetchCategories();
      // totalPriceCheck();
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
        .filtered(`DateOfCreation LIKE '${moment().format('YYYY-MM')}*' `);
      let thisMonthSaving = thisMonthExpense.length
        ? user.Income -
          thisMonthExpense.map((item) => item.Amount).reduce((a, b) => a + b)
        : user.Income;
      setSaving(thisMonthSaving);
    });
  };

  const fetchCategories = () => {
    Realm.open({schema: [Schema.Category]}).then((realm) => {
      const category = realm
        .objects('Category')
        .filtered(`User = ${userData.id}`);
      setCategories(category);
      totalPriceCheck(category);
    });
  };

  const totalPriceCheck = (categories) => {
    Realm.open({schema: [Schema.Expense]}).then((realm) => {
      const thisMonthExpense = realm
        .objects('Expense')
        .filtered(`DateOfCreation LIKE '${moment().format('YYYY-MM')}*' `);
      const totalPrice = categories.map((category) => {
        const categoryData = thisMonthExpense.length
          ? thisMonthExpense.filter((item) => item.Category === category.name)
          : [];
        const categoryTotalPrice = categoryData.length
          ? categoryData.map((item) => item.Amount).reduce((a, b) => a + b)
          : 0;
        return categoryTotalPrice;
      });
      setCategoryTotalPrice(totalPrice);
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
              &#8377;{' '}
              {user && isNaN(user.Income - saving) ? 0 : user.Income - saving}
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
                // sections={[
                //   {
                //     percentage: 100,
                //     color: '#39B7CD',
                //   },
                //   {
                //     percentage: parseInt(ExpensePercentage),
                //     color: 'red',
                //   },
                //   {
                //     percentage: parseInt(SavingPercentage),
                //     color: 'green',
                //   },
                // ]}
                sections={
                  categoryTotalPrice.length && categories.length
                    ? [
                        {
                          percentage: 100,
                          color: '#e3e3e3',
                        },
                        ...categories.map((item, index) => {
                          return {
                            percentage: isNaN(
                              (categoryTotalPrice[index] / user.Income) * 100,
                            )
                              ? 0
                              : (categoryTotalPrice[index] / user.Income) * 100,
                            color: item.avatarColor,
                          };
                        }),
                      ]
                    : [
                        {
                          percentage: 0,
                          color: 'red',
                        },
                      ]
                }
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
                You are few bucks away to reach your goal.
              </Text>
              <TouchableOpacity
                style={[inlineStyles.detailsBtn, styles.row, styles.ctr]}
                onPress={() => setDetails(!details)}>
                <Text style={[{color: colorCode.light}]}>
                  {details ? 'Hide Details' : 'View Details'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {details ? (
            <View style={[styles.mvSm]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: wp(4),
                  marginVertical: wp(2),
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={[
                      inlineStyles.profileAvatar,
                      {backgroundColor: '#e3e3e3'},
                    ]}>
                    <Text style={{color: colorCode.dark}}>S</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={[
                        {
                          fontSize: 18,
                          fontWeight: 'bold',
                        },
                      ]}>
                      Savings
                    </Text>
                    <Text style={{fontWeight: 'bold', color: 'grey'}}>
                      {((saving / user.Income) * 100).toFixed(1)}%
                    </Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 18, color: 'gray'}}>
                    &#8377; {saving}
                  </Text>
                </View>
              </View>
              {categories.map((category, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: wp(4),
                    marginVertical: wp(2),
                  }}
                  key={index}>
                  <View style={{flexDirection: 'row'}}>
                    {category.Image === 'no image' ? (
                      <View
                        style={[
                          inlineStyles.profileAvatar,
                          {backgroundColor: category.avatarColor},
                        ]}>
                        <Text style={{color: colorCode.light}}>
                          {category.name[0]}
                        </Text>
                      </View>
                    ) : (
                      <Image
                        source={{uri: 'file://' + category.Image}}
                        style={[inlineStyles.profileAvatar]}
                      />
                    )}
                    <View style={{justifyContent: 'center'}}>
                      <Text
                        style={[
                          {
                            fontSize: 18,
                            fontWeight: 'bold',
                          },
                        ]}>
                        {category.name}
                      </Text>
                      <Text style={{fontWeight: 'bold', color: 'grey'}}>
                        {(categoryTotalPrice[index] / user.Income) * 100}%
                      </Text>
                    </View>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{fontWeight: 'bold', fontSize: 18, color: 'gray'}}>
                      &#8377; {categoryTotalPrice[index]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : null}
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
            .map((item, i) => (
              <View key={i} style={[styles.row, styles.between, {padding: 15}]}>
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
    backgroundColor: '#FF8243',
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
  profileAvatar: {
    width: wp(12),
    height: wp(12),
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(4),
    borderRadius: wp(12) / 2,
  },
  paymentBtn: {
    backgroundColor: '#008080',
    paddingVertical: wp(1),
    paddingHorizontal: wp(4),
    borderRadius: 25,
    marginVertical: 2,
  },
});

export default Dashboard;
