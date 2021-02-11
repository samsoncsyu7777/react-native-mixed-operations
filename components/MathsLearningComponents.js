import React from "react";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import theme from "../Theme";
import constants from "../Constants";

const breakpoint = constants.breakpoint;

const styles = StyleSheet.create({
  headingSelectRow: {
    flexDirection: "row",
    padding: wp2dp('0.5%'),
    paddingBottom: wp2dp('1.4%'),
    alignItems: "center",
  },
  pickerBorder: {
    borderWidth: wp2dp('0.4%'),
    borderColor: theme.colors.blue,
    borderRadius: wp2dp('1.4%'),
  },
  picker: {
    fontSize: wp2dp('100%') < breakpoint ? wp2dp('2.8%') : wp2dp('1.4%'),
    color: theme.colors.myBlue,
    borderRadius: wp2dp('1%'),
    borderWidth: wp2dp('0%'),
    height: wp2dp('100%') < breakpoint ? wp2dp('6%') : wp2dp('3%'),
    width: wp2dp('100%') < breakpoint ? wp2dp('65%') : wp2dp('27%'),
    padding: wp2dp('100%') < breakpoint ? wp2dp('6%') : wp2dp('0%'),
  },
  selectLabel: {
    fontSize: wp2dp('100%') < breakpoint ? wp2dp('3.6%') : wp2dp('1.8%'),
    color: theme.colors.myBlack,
    width: wp2dp('100%') < breakpoint ? wp2dp('27%') : wp2dp('18%'),
  },
  selectText: {
    fontSize: wp2dp('100%') < breakpoint ? wp2dp('2.8%') : wp2dp('1.4%'),
    color: theme.colors.myBlue,
    height: wp2dp('100%') < breakpoint ? wp2dp('4%') : wp2dp('2%'),
    width: wp2dp('100%') < breakpoint ? wp2dp('10%') : wp2dp('2%'),
  },
  selectWidth: {
    width: wp2dp('100%') < breakpoint ? wp2dp('24%') : wp2dp('12%'),
    height: wp2dp('100%') < breakpoint ? wp2dp('6%') : wp2dp('3%'),
  },
  selectIcon: {
    fontSize: wp2dp('100%') < breakpoint ? wp2dp('4%') : wp2dp('2%'),
  },
});

export const HeadingSelect = ({ selectLabel, selectIndex, setItemIndex, itemsArray }) => {
  const handleSelect = (event, setItemIndex) => {
    setItemIndex(event);
  };

  return (
    <View style={styles.headingSelectRow}>
      <Text style={styles.selectLabel}>{selectLabel}:</Text>
      <View style={styles.pickerBorder}>
        <Picker
          style={styles.picker}
          selectedValue={selectIndex}
          onValueChange={e => { handleSelect(e, setItemIndex) }}
        >
          {
            itemsArray.map((language, index) => {
              return <Picker.Item key={index} label={language} style={styles.selectText} value={index} />
            })
          }
        </Picker>
      </View>
    </View>
  )
}