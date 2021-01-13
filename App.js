import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './app/navigation/Routes';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {colorCode} from './app/desgin/colorCode';
import {Store, persistor} from './app/Store';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import {
  TourGuideProvider, // Main provider
  TourGuideZone, // Main wrapper of highlight component
  TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
  useTourGuideController, // hook to start, etc.
} from 'rn-tourguide';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: colorCode.darkGray,
    accent: '#f1c40f',
    text: '#090C08',
  },
};

const App = () => {
  return (
    <StoreProvider store={Store}>
      <TourGuideProvider {...{borderRadius: 16}}>
        <PaperProvider theme={theme}>
          <PersistGate persistor={persistor}>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
            <FlashMessage position="top" />
          </PersistGate>
        </PaperProvider>
      </TourGuideProvider>
    </StoreProvider>
  );
};

export default App;
