import {
  AssetsSelector,
} from 'expo-images-picker';
import { Ionicons } from '@expo/vector-icons';
import React, {
  Dispatch,
  FunctionComponent,
  memo,
  ReactElement,
  SetStateAction,
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  onSelect: (data: Data[]) => any;
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
}

interface Data {
  creationTime: number,
  duration: number,
  filename: string,
  height: number,
  id: string,
  mediaSubtypes: string[],
  mediaType: 'photo' | 'video',
  modificationTime: number,
  uri: string,
  width: number,
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 2,
    width: 100,
  },
  container: {
    flex: 1,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
});

const NoAsset = (): ReactElement => <View />;

const ImagePicker: FunctionComponent<Props> = (props) => {
  const { setIsShowModal, onSelect: onSelectProp } = props;
  const onGoBack = (): void => setIsShowModal(false);

  const onSelect = (data: Data[]): void => {
    onSelectProp(data);
    setIsShowModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AssetsSelector
        options={{
          assetsType: ['photo'],
          maxSelections: 50,
          margin: 3,
          portraitCols: 4,
          landscapeCols: 5,
          widgetWidth: 100,
          widgetBgColor: 'white',
          spinnerColor: 'white',
          videoIcon: {
            Component: Ionicons,
            iconName: 'ios-videocam',
            color: 'white',
            size: 20,
          },
          selectedIcon: {
            Component: Ionicons,
            iconName: 'ios-checkmark-circle-outline',
            color: 'white',
            bg: 'rgba(137, 137, 137, 0.8)',
            size: 20,
          },
          defaultTopNavigator: {
            continueText: 'Done',
            goBackText: 'Back',
            buttonStyle: styles.button,
            textStyle: styles.text,
            backFunction: onGoBack,
            doneFunction: onSelect,
          },
          noAssets: {
            Component: NoAsset,
          },
        }}
      />
    </SafeAreaView>
  );
};

export default memo(ImagePicker);
export { Data };
