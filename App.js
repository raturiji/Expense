import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './app/navigation/Routes';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { colorCode } from './app/desgin/colorCode';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: colorCode.success,
    accent: '#f1c40f',
    text:'blue'
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </PaperProvider>

  )
}

export default App