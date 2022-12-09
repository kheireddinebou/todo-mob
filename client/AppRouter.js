import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CurrentUserContext } from "./contextApi/currentUserContext";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";

export default function AppRouter() {
  const Stack = createNativeStackNavigator();
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentUser ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
