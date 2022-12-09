import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AppRouter from "./AppRouter";
import { CurrentUserProvider } from "./contextApi/currentUserContext";

export default function App() {
  return (
    <CurrentUserProvider>
      <AppRouter />
    </CurrentUserProvider>
  );
}
