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
import Profile from "./src/components/screens/Profile";
import EditProfile from "./src/components/screens/EditProfile";

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
        <Stack.Navigator initialRouteName={"EditProfile"}
            screenOptions={{
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: globalStyle.secondaryThemeColor,
              },
            }}>
          <Stack.Screen name="Profile" component={Profile} options={{
              headerShown: false,
            }}
            />
            <Stack.Screen name="EditProfile" component={EditProfile} 
          options={{
            headerShown: true,
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
