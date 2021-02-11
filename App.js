import React from "react";
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MathsLearning from "./screens/MathsLearning";
import theme from "./Theme";

const RootStack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <NavigationContainer >
          <RootStack.Navigator>
            <RootStack.Screen name="MathsLearning" component={MathsLearning} options={theme.headerStyle}/>
          </RootStack.Navigator>
        </NavigationContainer>
      </PaperProvider>

    );
  }
}


