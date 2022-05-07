import React from "react";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import { ThemeProvider } from "styled-components";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import AppLoading from "expo-app-loading";

import theme from "./src/global/styles/theme";
import { Routes } from "./src/routes";
import { AppRoutes } from "./src/routes/app.routes";
import { StatusBar } from "react-native";
import { SignIn } from "./src/screens/Signin";
import { AuthProvider } from "./src/hooks/auth";

export default function App() {
  const [fontsLoadead] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoadead) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
