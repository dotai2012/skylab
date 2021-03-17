import React, {
  ReactElement,
  useRef,
  useState,
} from 'react';
import {
  Text,
  Image,
  FlatList,
  ListRenderItem,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  Button,
  Container,
  Icon,
} from 'native-base';
import { Camera } from 'expo-camera';

import { AlbumPayload } from '../actions/album.type';
import { RootStateSelector } from '../reducers';
import {
  LookUp,
  Unpacked,
} from '../services/utils';
import { makeStyles } from '../services/theme';

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
  const cameraRef = useRef<Camera>(null);
  const [useCamera, setUseCamera] = useState(false);
  const styles = useStyles();
  const { albums } = useSelector(selector);

  const onSelectCamera = async (): Promise<void> => {
    const { status } = await Camera.requestPermissionsAsync();

    if (status === 'granted') {
      setUseCamera(true);
      // const photo = await cameraRef.current?.takePictureAsync();
    } else {
      alert('Camera permission is denied. Please go to your phone setting and enable it again');
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
        <Camera
          style={styles.cameraContainer}
          ref={cameraRef}
        />
      );
    }

    return (
      <Container>
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

