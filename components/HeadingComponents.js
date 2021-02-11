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
import theme from "../Theme";
import constants from "../Constants";

const breakpoint = constants.breakpoint;
const styles = StyleSheet.create({
  frame: {

  },
  centerRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  topic: {
    fontSize: wp2dp('100%') < breakpoint? wp2dp('4.8%'): wp2dp('2.4%'),
    textAlign: "center",
    color: theme.colors.myOrange,
  },
  learningTool: {
    fontSize: wp2dp('100%') < breakpoint? wp2dp('3.2%'): wp2dp('1.6%'),
  },
});

export const MyFrame = (props) => {
  const { children, topic, learningTool, ...otherProps } = props; 

  return (
    <View style={styles.frame} {...otherProps}>
      <View style={styles.centerRow}>
        <Text style={styles.topic}>{topic}</Text>
      </View>
      <View style={styles.centerRow}>
        <Text style={styles.learningTool}>{learningTool}</Text>
      </View>
      {children}
    </View>
  )
}