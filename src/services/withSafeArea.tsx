import React, {
  ComponentType,
  ReactElement,
} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

interface Props {
  [x: string]: any;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const withSafeArea = (WrappedComponent: ComponentType) => ({ ...props }: Props): ReactElement => (
  <SafeAreaView style={styles.container}>
    <WrappedComponent {...props} />
  </SafeAreaView>
);

export default withSafeArea;
