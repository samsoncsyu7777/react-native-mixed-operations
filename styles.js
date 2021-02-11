import {
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import theme from "./Theme";
import constants from "./Constants";

const breakpoint = constants.breakpoint;

const styles = StyleSheet.create({
  centerRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: 'wrap',
  },
  formulaColumn: {
    width: wp2dp('100%') < breakpoint? wp2dp('95%'): wp2dp('70%'),
    maxWidth: wp2dp('100%') < breakpoint? wp2dp('95%'): wp2dp('70%'),
    alignSelf: "center",
  },
  formulaLine: {
    fontSize: wp2dp('100%') < breakpoint? wp2dp('5%'): wp2dp('2.5%'),
    letterSpacing: wp2dp('0.6%'),
  },
  formulaBox: {
    width: wp2dp('100%') < breakpoint? wp2dp('70%'): wp2dp('50%'),
  },
  verticalCenterRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: 'wrap',
  },
  commonPadding: {
    margin: wp2dp('1%'),
  },
  commonText: {
    fontSize: wp2dp('100%') < breakpoint? wp2dp('4%'): wp2dp('2%'),
    margin: wp2dp('0.5%'),
  },
  okButton: {
    height: wp2dp('100%') < breakpoint? wp2dp('10%'): wp2dp('3%'),
    width: wp2dp('100%') < breakpoint? wp2dp('12%'): wp2dp('6%'),
    fontSize: wp2dp('100%') < breakpoint? wp2dp('4%'): wp2dp('2%'),
    margin: wp2dp('0.5%'),
    justifyContent: "center",    
  },
  resetArrow: {
    fontSize: wp2dp('100%') < breakpoint? wp2dp('12%'): wp2dp('6%'),
  },
});

export default styles;