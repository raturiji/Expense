import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colorCode} from './colorCode';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorCode.light,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  between: {
    justifyContent: 'space-between',
  },
  around: {
    justifyContent: 'space-around',
  },
  ctr: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // spacing
  mvSm: {
    marginVertical: hp(2),
  },

  mhSm: {
    marginHorizontal: wp(2),
  },

  pvSm: {
    paddingVertical: hp(2),
  },
  phSm: {
    paddingHorizontal: hp(2),
  },
  mv: {
    marginVertical: hp(6),
  },

  mh: {
    marginHorizontal: wp(6),
  },

  pv: {
    paddingVertical: hp(6),
  },
  ph: {
    paddingHorizontal: hp(6),
  },

  // text
  sm: {
    fontSize: hp(2),
  },
  md: {
    fontSize: hp(4),
  },
  lg: {
    fontSize: hp(8),
  },
  headerTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});
