
import React from 'react';
import { ThemeProvider } from 'styled-components';
import {

  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import { Dashboard } from './src/screens/Dashboard';

import AppLoading from 'expo-app-loading';

import theme from './src/global/styles/theme'
import { Register } from './src/screens/Register';
import { CategorySelect } from './src/screens/CategorySelect';


export default function App() {
  const [fontsLoadead] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoadead){
    return <AppLoading />
  }
  return (
    <ThemeProvider theme={theme}>
        {/* <Dashboard /> */}
        <Register />
    </ThemeProvider>
   
  );
}
