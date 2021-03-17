import React, {
  ReactElement,
  useState,
} from 'react';
import {
  NativeRouter,
} from 'react-router-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import {
  Root as NativeBaseRoot,
} from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Routes from './Routes';
import {
  themeConfig,
  ThemeContext,
} from './services/theme';
import {
  persistor,
  store,
} from './services/store';

const onLoad = async (): Promise<void> => {
  await Font.loadAsync({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    ...Ionicons.font,
  });
};

const onLoadError = (e: Error): void => {
  console.error(e);
};

const Root = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(true);

  const onLoadCompleted = (): void => {
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <AppLoading
        startAsync={onLoad}
        onError={onLoadError}
        onFinish={onLoadCompleted}
      />
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={undefined} persistor={persistor}>
        <NativeBaseRoot>
          <NativeRouter>
            <ThemeContext.Provider value={themeConfig}>
              <StatusBar />
              <SafeAreaProvider>
                <Routes />
              </SafeAreaProvider>
            </ThemeContext.Provider>
          </NativeRouter>
        </NativeBaseRoot>
      </PersistGate>
    </Provider>
  );
};

export default Root;
