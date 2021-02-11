import React from "react";
import {
  StyleSheet,
} from "react-native";
import { 
  Button,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import theme from "../Theme";

import constants from "../Constants";

const breakpoint = constants.breakpoint;
const styles = StyleSheet.create({
  errorMessage: {
    fontSize: wp2dp('100%') < breakpoint? wp2dp('4%'): wp2dp('2%'),
    color: theme.colors.myBlack,
  },  
});

export const AlertSnackbar = ({ open, closeAlert, errorMessage, severity }) => {

  return (
    <Portal>
    <Dialog
      visible={open}
      onDismiss={closeAlert}
      style={{backgroundColor: (severity == "error"? theme.colors.red: theme.colors.green)}}
    >
      <Dialog.Title>*</Dialog.Title>
      <Dialog.Content>
        <Paragraph style={styles.errorMessage}>{errorMessage}</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={closeAlert}>Done</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
  );
};