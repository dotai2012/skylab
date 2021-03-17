import React, {
  ReactElement,
  useState,
} from 'react';
import {
  Text,
  Image,
  FlatList,
  ListRenderItem,
  View,
  Alert,
} from 'react-native';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Button,
  Container,
  Icon,
} from 'native-base';
import {
  Camera,
  CameraCapturedPicture,
} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AddAlbumAction,
  AlbumPayload,
  AlbumType,
} from '../actions/album.type';
import { RootStateSelector } from '../reducers';
import {
  LookUp,
  Unpacked,
} from '../services/utils';
import { makeStyles } from '../services/theme';
import TakePhoto from '../components/TakePhoto';

const selector: RootStateSelector<'albums'> = ({ albums }) => ({ albums });

const useStyles = makeStyles((theme) => ({
  album: {
    color: theme.color.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 50,
    marginBottom: 25,
  },
  image: {
    aspectRatio: 1,
    flex: 1,
    margin: 5,
    maxWidth: 100,
    maxHeight: 100,
  },
  cameraContainer: {
    width: '100%',
    height: '100%',
  },
  camera: {
    backgroundColor: theme.color.primary,
    width: 65,
    height: 65,
    borderRadius: 65,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
}));

const Album = (): ReactElement => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [useCamera, setUseCamera] = useState(false);
  const styles = useStyles();
  const { albums } = useSelector(selector);

  const onSavePhoto = async (photo: CameraCapturedPicture): Promise<void> => {
    try {
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      dispatch<AddAlbumAction>({
        type: AlbumType.ADD_ALBUM,
        photos: [photo.uri],
      });
      setUseCamera(false);
    } catch (e) {
      console.error(e);
      Alert.alert('Failed to save the photo');
    }
  };

  const onSelectCamera = async (): Promise<void> => {
    const { status } = await Camera.requestPermissionsAsync();

    if (status === 'granted') {
      setUseCamera(true);
    } else {
      Alert.alert('Camera permission is denied. Please go to your phone setting and enable it again');
    }
  };

  const renderPhotos: ListRenderItem<Unpacked<LookUp<AlbumPayload, 'photos'>>> = ({ item: uri }) => (
    <Image
      style={styles.image}
      source={{
        uri,
      }}
    />
  );

  const renderAlbums: ListRenderItem<AlbumPayload> = ({ item: { name, photos } }) => (
    <View>
      <Text style={styles.album}>
        {name}
      </Text>
      <FlatList
        numColumns={4}
        data={photos}
        renderItem={renderPhotos}
        keyExtractor={(uri): string => uri}
      />
    </View>
  );

  const renderCamera = (): ReactElement => {
    if (useCamera) {
      return (
        <TakePhoto onSave={onSavePhoto} />
      );
    }

    return (
      <Container style={{ marginTop: insets.top, marginBottom: insets.bottom }}>
        <FlatList
          data={albums}
          renderItem={renderAlbums}
          keyExtractor={({ id }): string => id}
        />
        <Button style={styles.camera} onPress={onSelectCamera}>
          <Icon name="camera" />
        </Button>
      </Container>
    );
  };

  return renderCamera();
};

export default Album;

