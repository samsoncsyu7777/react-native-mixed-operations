import React from "react";
import { configureFonts, DefaultTheme } from "react-native-paper";
import customFonts from "./Fonts";

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(customFonts),
  roundness: 30,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2080aa",
    background: "#ccfeff",
    accent: "#f1c40f",
    dialog: "#f0cde8",    
    myBlack: "#111111",
    myBlue: "#0044AA",
    myGreen: "#00BB00",
    myOrange: "#DD8800",
    myYellow: "#FFDF44",
    myBrown: "#BB6611",
    myPink: "#FF9999",
    myPurple: "#AA00FF",
    myMagenta: "#FF00FF",
    myWhite: "#F0FFFA",
    red: "#FF4444",
    orange: "#FF8400",
    yellow: "#F0E900",
    lime: "#B0FF33",
    green: "#55FF77",
    cyan: "#22EEFF",
    blue: "#0088FF",
    purple: "#B400FF",
    skyGradient: "linear-gradient(to top, #AFF0FF, #EFFFFF)",
    conicGradient: "linear-gradient(to top right, aqua, blue, magenta, red, orange) 1",
  },
  headerStyle: {
    headerStyle: {backgroundColor: '#ff9977'},
    headerTintColor: '#aa0080',
  }
};

export default theme;
