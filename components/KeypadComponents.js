import React from "react";
import {
  Button,
} from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import theme from "../Theme";
import constants from "../Constants";

const breakpoint = constants.breakpoint;
const styles = StyleSheet.create({
  myInputText: {
    width: wp2dp('100%') < breakpoint ? wp2dp('12%') : wp2dp('6%'),
    height: wp2dp('100%') < breakpoint ? wp2dp('4.8%') : wp2dp('2.4%'),
    fontSize: wp2dp('100%') < breakpoint ? wp2dp('4%') : wp2dp('2%'),
  },
  centerRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  keypadKey: {
    width: wp2dp('100%') < breakpoint ? wp2dp('12%') : wp2dp('4%'),
    height: wp2dp('100%') < breakpoint ? wp2dp('12%') : wp2dp('4%'),
    borderRadius: wp2dp('100%') < breakpoint ? wp2dp('3%') : wp2dp('1%'),
    minWidth: wp2dp('1%'),
    justifyContent: "center",
  },
});

export const MyKeypad = ({ handleClick, acceptDecimal }) => {
  const keypadTexts = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "×", "÷"];
  const keypadColors = [theme.colors.red, theme.colors.orange, theme.colors.yellow, theme.colors.lime, theme.colors.green, theme.colors.cyan, theme.colors.blue, theme.colors.purple];
  var randomIndex = Math.floor(Math.random() * keypadColors.length);
  if (acceptDecimal) {
    keypadTexts.push(".");
  }
  keypadTexts.push("<");

  return (
    <>
      <View style={styles.centerRow}>
        {
          keypadTexts.map((key, index) => {
            if (index < 8) {
              return <Button
                key={index}
                value={key}
                mode="contained"
                style={[{
                  color: theme.colors.myBlack,
                  backgroundColor: keypadColors[(index + randomIndex) % keypadColors.length]
                }, styles.keypadKey]}
                onPress={e => { handleClick(e, key) }}
              >
                <Text style={styles.myInputText}>
                  {key}
                </Text>
              </Button>
            }
          })
        }
      </View>
      <View style={styles.centerRow}>
        {
          keypadTexts.map((key, index) => {
            if (index > 7) {
              return <Button
                key={index}
                value={key}
                mode="contained"
                style={[{
                  color: theme.colors.myBlack,
                  backgroundColor: keypadColors[(index + randomIndex + 3) % keypadColors.length]
                }, styles.keypadKey]}
                onPress={e => { handleClick(e, key) }}
              >
                <Text style={styles.myInputText}>
                  {key}
                </Text>
              </Button>
            }
          })
        }
      </View>
    </>
  )
}

