import {
  createContext,
  useContext,
} from 'react';
import { StyleSheet } from 'react-native';

const themeConfig = {
  color: {
    primary: '#373761',
    text: '#737373',
  },
  flexBox: {
    flex: 1,
  },
};

type Theme = typeof themeConfig;
type ThemeProperty<T> = StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>;
type Callback<T extends ThemeProperty<T>> = (theme: Theme) => T;

const ThemeContext = createContext(themeConfig);

const makeStyles = <P extends ThemeProperty<P>>(callback: Callback<P>) => (): P => {
  const theme = useContext(ThemeContext) as Theme;

  if (theme) {
    const styles = callback(theme);

    return StyleSheet.create(styles);
  }

  throw new Error(
    'makeStyles must be used within a component wrapped with ThemeProvider',
  );
};

export {
  themeConfig,
  Theme,
  ThemeProperty,
  Callback,
  ThemeContext,
  makeStyles,
};
