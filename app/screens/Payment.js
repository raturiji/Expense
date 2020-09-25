import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colorCode } from '../desgin/colorCode';
import { TextInput } from 'react-native-paper';

export default (Payment = () => {
	return (
		<View>
			<Text style={[inlineStyles.heading]}>Payment Details</Text>
			<TextInput
				label="Payment Info"
				mode="outlined"
				placeholder="Enter the payment info"
				style={{ marginHorizontal: wp(4) }}
			/>
			<TextInput
				label="Amount"
				mode="outlined"
				placeholder="Enter the amount"
				style={{ marginHorizontal: wp(4) }}
			/>
			{/* <View style={{height:hp(20),backgroundColor:'white',marginVertical:hp(5),marginHorizontal:wp(30)}}>

            </View> */}
            <TouchableOpacity style={[inlineStyles.captureBtn,styles.pvSm,styles.mvSm]}>
                <Text style={{fontSize: hp(2),textAlign: 'center',color: colorCode.light}}>
                    Capture Image
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{backgroundColor:'#008080',marginHorizontal:wp(4)},styles.pvSm,styles.mvSm]}>
                <Text style={[inlineStyles.submitText]}>
                    Submit
                </Text>
            </TouchableOpacity>
		</View>
	);
});

const inlineStyles = StyleSheet.create({
	heading:{
        fontSize: hp(4),
        textAlign: 'center',
        marginVertical: hp(4) 
    },
    captureBtn:{
        backgroundColor: colorCode.danger,
        borderRadius: 25,
        marginHorizontal:wp(32)
    },
    submitText:{
        fontSize: hp(2),
        textAlign: 'center',
        color: colorCode.light
    },
    
});
