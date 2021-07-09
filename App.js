/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Button,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { globalStyle } from "./src/styles/GlobalStyles" ;
import Login from "./src/components/screens/Login";
import Profile from "./src/components/screens/Profile";
import Splash from "./src/components/screens/Splash";
import ForgotEmail from "./src/components/screens/ForgotEmail";
import OtpVerify from "./src/components/screens/OtpVerify";
import ForgotPassword from "./src/components/screens/ForgotPassword";
import Home from "./src/components/screens/Home";
const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Splash"}
            screenOptions={{
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: globalStyle.secondaryThemeColor,
              },
            }}>
      <Stack.Screen name="Splash" component={Splash} 
          options={{
            headerShown: false,
          }}
          />
            <Stack.Screen name="ForgotEmail" component={ForgotEmail} 
          options={{
            headerShown: false,
          }}
          />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} 
          options={{
            headerShown: false,
          }}
          />
                    <Stack.Screen name="Home" component={Home} 
          options={{
            headerShown: false,
          }}
          />
          <Stack.Screen name="OtpVerify" component={OtpVerify} 
          options={{
            headerShown: false,
          }}
          />
          <Stack.Screen name="Login" component={Login} 
          options={{
            headerShown: false,
          }}
          />
          <Stack.Screen name="Profile" component={Profile} options={{
              headerShown: false,
            }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
