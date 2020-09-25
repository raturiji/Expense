import React from 'react';
import { View, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Icon = ({ name, size, color, iconStyle, close, iconType }) => {
    let Icon 
	switch (iconType) {
		case 'AntDesign':
            console.log('reach')
			Icon = (
					<AntDesign name={name} size={size} color={color} style={iconStyle} />
			);
        break;
		case 'Entypo':
			Icon = (
					<Entypo name={name} size={size} color={color} style={iconStyle} />
			);
        break;

		case 'EvilIcons':
			Icon = (
					<EvilIcons name={name} size={size} color={color} style={iconStyle} />
			);
        break;

		case 'Feather':
			Icon = (
					<Feather name={name} size={size} color={color} style={iconStyle} />
			);
        break;

		case 'FontAwesome':
			Icon = (
					<FontAwesome name={name} size={size} color={color} style={iconStyle} />
			);
        break;

		case 'Fontisto':
			Icon = (
					<Fontisto name={name} size={size} color={color} style={iconStyle} />
			);
        break;

		case 'Ionicons':
			Icon = (
					<Ionicons name={name} size={size} color={color} style={iconStyle} />
			);
        break;

		case 'MaterialIcons':
			Icon = (
					<MaterialIcons name={name} size={size} color={color} style={iconStyle} />
			);
        break;

		case 'MaterialCommunityIcons':
			Icon = (
					<MaterialCommunityIcons name={name} size={size} color={color}  style={iconStyle}/>
			);
        break;

		case 'Octicons':
			Icon = (
					<Octicons name={name} size={size} color={color} style={iconStyle}/>
			);
        break;

		case 'Zocial':
			Icon = (
					<Zocial name={name} size={size} color={color} style={iconStyle}/>
			);
            break;
		case 'SimpleLineIcons':
			Icon = (
					<SimpleLineIcons name={name} size={size} color={color} style={iconStyle} />
            );
            break;
    }
	return Icon;
};

export default Icon;
