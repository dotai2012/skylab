import {
  Icon,
  Button,
} from 'native-base';
import React, {
  ReactElement,
} from 'react';
import {
  Alert,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  menu: {
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
    top: 0,
    zIndex: 10,
  },
});

const onOpenDrawer = (): void => {
  Alert.alert('More featured will be updated. This app is a demo only');
};

const Menu = ():ReactElement => (
  <Button transparent style={styles.menu} onPress={onOpenDrawer}>
    <Icon name="menu" />
  </Button>
);

export default Menu;
