import React ,{useState,useEffect} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { colorCode } from '../desgin/colorCode';
import Icon from '../component/Icon';
import Pie from 'react-native-pie';

export default  Dashboard = ({navigation}) => {
    const nextScreen = () => {
        navigation.navigate('Payment')
    }
    return (
        <>
        <ScrollView>
            <View style={[styles.mhSm,styles.mvSm,{backgroundColor:colorCode.light,borderRadius:4}]}>
                <View style={[styles.row,styles.between,styles.mhSm,styles.mvSm]}>
                    <Text style={[{fontSize:hp(3)}]}>Overview - December</Text>
                    <Icon iconType='AntDesign' color='black' size={20} name='caretdown'/>
                </View>
                <View style={[styles.row,styles.between,styles.mhSm,{marginVertical:hp(1)}]}>
                    <Text style={[inlineStyles.overviewDetails,{borderLeftColor: '#39B7CD'}]}>Income</Text>
                    <Text style={[styles.sm]}>&#8377; 50000</Text>
                </View>
                <View style={[styles.row,styles.between,styles.mhSm,{marginVertical:hp(1)}]}>
                    <Text style={[inlineStyles.overviewDetails,{borderLeftColor: colorCode.danger}]}>Expenses</Text>
                    <Text style={[styles.sm]}>&#8377; 50000</Text>
                </View>
                <View style={[styles.row,styles.between,styles.mhSm,{marginVertical:hp(1)}]}>
                    <Text style={[inlineStyles.overviewDetails,{borderLeftColor: colorCode.success}]}>Savings</Text>
                    <Text style={[styles.sm]}>&#8377; 50000</Text>
                </View>
            </View>
            <View style={[styles.mhSm,styles.mvSm,{backgroundColor:colorCode.light,borderRadius:4}]}>
                <Text style={[styles.mhSm,styles.mvSm,{fontSize:hp(3)}]}>Expenses by Category</Text>
                <View style={[styles.row,styles.between,styles.mhSm,styles.mvSm]}>
                    <Pie
                    radius={50}
                    innerRadius={20}
                    sections={[
                        {
                        percentage: 70,
                        color: '#39B7CD',
                        },
                        {
                        percentage: 20,
                        color: 'red',
                        },
                        {
                        percentage: 30,
                        color: 'green',
                        },
                    ]}
                    strokeCap={'butt'}
                    />
                    <View style={[styles.mhSm]}>
                        <Text style={[{fontFamily:'DroidSans-Bold',color:'#111E6C',fontSize:hp(3),width:wp(65)}]}>You have saved &#8377; 50000 by now.</Text>
                        <Text style={[{fontFamily:'DroidSans-Bold',color:colorCode.dark,fontSize:hp(2),width:wp(65)}]}>You are few bucks away to reach your goal</Text>
                        <View style={[inlineStyles.detailsBtn,styles.row,styles.ctr,{marginVertical:hp(1)}]}>
                            <Text style={[{color:colorCode.light}]}>View Details</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.mhSm,styles.mvSm,{backgroundColor:colorCode.light,borderRadius:4}]}> 
                <Text style={[styles.mhSm,styles.mvSm,{fontSize:hp(3)}]}>Recent Activity</Text> 
                <View style={[{backgroundColor:'#893F45',borderRadius:10},styles.row,styles.between,styles.phSm,styles.pvSm,styles.mhSm,styles.mvSm]}>
                    <View>
                        <Text style={[inlineStyles.customHeading]}>
                            Electricity Bill
                        </Text>
                        <Text style={{color:colorCode.light}}>3:00 PM 21/09/2020</Text>
                    </View>
                    <View>
                        <Text style={inlineStyles.priceTag}>&#8377; 50000</Text>
                    </View>
                </View>
                <View style={[{backgroundColor:'#893F45',borderRadius:10},styles.row,styles.between,styles.phSm,styles.pvSm,styles.mhSm,styles.mvSm]}>
                    <View>
                    <Text style={[inlineStyles.customHeading]}>
                            Electricity Bill
                        </Text>
                        <Text style={{color:colorCode.light}}>3:00 PM 21/09/2020</Text>
                    </View>
                    <View>
                        <Text style={inlineStyles.priceTag}>&#8377; 50000</Text>
                    </View>
                </View>
                <View style={[{backgroundColor:'#893F45',borderRadius:10},styles.row,styles.between,styles.phSm,styles.pvSm,styles.mhSm,styles.mvSm]}>
                    <View>
                    <Text style={[inlineStyles.customHeading]}>
                            Electricity Bill
                        </Text>
                        <Text style={{color:colorCode.light}}>3:00 PM 21/09/2020</Text>
                    </View>
                    <View>
                        <Text style={inlineStyles.priceTag}>&#8377; 50000</Text>
                    </View>
                </View>
            </View> 
        </ScrollView>
        <TouchableOpacity style={{position:'absolute',bottom:'2%',left:'35%',}} onPress={() => nextScreen()}>
            <View style={[inlineStyles.paymentBtn,styles.row,styles.ctr]}>
                <Text style={{color:colorCode.light,fontSize:wp(8)}}>+</Text>
                <Text style={{color:colorCode.light,fontSize:wp(4)}}> New Payment</Text>
            </View>
        </TouchableOpacity>
        </>
    )
}
 
const inlineStyles = StyleSheet.create({
    overviewDetails: {
        borderLeftWidth:4,
        borderLeftColor: '#39B7CD',
        paddingVertical:hp(1),
        paddingLeft:hp(1.5)
    },
    detailsBtn:{
        backgroundColor:colorCode.success,
        width:wp(28),
        padding:wp(1),
        borderRadius:50
    },
    customHeading:{
        fontFamily:'DroidSans-Bold',
        color:colorCode.light,
        fontSize:hp(2),
        width:wp(65)
    },
    listItem:{
        paddingVertical:hp(1),
        borderBottomWidth:2,
        borderBottomColor:colorCode.light
    },
    priceTag:{
        fontSize:hp(2),
        color:colorCode.light,
        fontFamily:'DroidSans-Bold'
    },
    paymentBtn:{
        backgroundColor:'#008080',
        width:wp(35),
        paddingHorizontal:wp(1),
        paddingVertical:wp(1),
        borderRadius:25,
    }
})
