import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import  styles  from '../desgin/style';

const Sidebar = ({navigation}) => {

    const toProfileScreen = () => {
        navigation.navigate('Profile')
    }

    return (
        <View style={[{flex:1}]}>
            <View style={[{backgroundColor:'#EAC697'}]}>
                <SafeAreaView style={[styles.mvSm, styles.ctr,]}>
                    <Text style={[styles.md]}>Expense</Text>
                    <Text style={[styles.sm]}>Manage your Expenses</Text>
                </SafeAreaView>
            </View>
            <View style={[{marginLeft:wp(5)}]}>
                <TouchableOpacity onPress={() => toProfileScreen()}>
                <View >
                    <Text style={[inlineStyles.sideBarItem]}>Profile</Text>
                </View>
                </TouchableOpacity>
                <View>
                    <Text style={[inlineStyles.sideBarItem]}>Food</Text>
                </View>
                <View>
                    <Text style={[inlineStyles.sideBarItem]}>Gaming</Text>
                </View>
            </View>
        </View>
            
       
    )
}

const inlineStyles = StyleSheet.create({
    sideBarItem: {
        paddingVertical: hp(1),
        fontSize:hp(3)
    }
});

export default Sidebar;