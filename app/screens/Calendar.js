import React ,{useState,useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { colorCode } from '../desgin/colorCode';
import {CalendarList} from 'react-native-calendars';
import ExpenseDetailsModal from '../component/ExpenseDetailsModal';

export default  Dashboard = ({navigation}) => {

    const nextScreen = () => {
        navigation.navigate('Settings')
    }

    return ( 
        <View style={{flex:1}}>
            <CalendarList 
                markingType={'custom'}
                markedDates={{
                '2020-09-22': {
                    customStyles: {
                    container: {
                        backgroundColor: 'orange'
                    },
                    text: {
                        color: 'white',
                    }
                }
                },
                '2020-09-23': {
                    customStyles: {
                    container: {
                        backgroundColor: 'white',
                        elevation: 2
                    },
                    text: {
                        color: 'blue'
                    }
                    }
                }
                }}
            />
            <TouchableOpacity style={[{backgroundColor:'green',position:'absolute',paddingHorizontal:wp(4.5),borderRadius:30,right:wp(6),bottom:hp(5),elevation:80},styles.row,styles.ctr]} >
                <Text style={{fontSize:hp(6),color:'white'}}>+</Text>
            </TouchableOpacity>
            {/* <ExpenseDetailsModal /> */}
        </View>
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
    }
})
