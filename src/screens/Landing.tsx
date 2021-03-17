import React, {
  ReactElement,
  useState,

} from 'react';
import {
  Container,
  H1,
  H2,
  Button,
  Text,
  H3,
} from 'native-base';
import {
  Image,
} from 'react-native';

import { useHistory } from 'react-router-native';
import Modal from 'react-native-modal';
import * as Permissions from 'expo-permissions';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { makeStyles } from '../services/theme';
import Comparison from '../assets/img/comparison.png';
import ImagePicker, {
  Data,
} from '../components/ImagePicker';
import {
  AddAlbumAction,
  AlbumType,
} from '../actions/album.type';
import withSafeArea from '../services/withSafeArea';

const useStyles = makeStyles((theme) => ({
  container: {
    marginHorizontal: 35,
    flex: 1,
  },
  heading: {
    fontSize: 30,
    lineHeight: 45,
    color: theme.color.text,
  },
  text: {
    color: theme.color.text,
    fontSize: 25,
    lineHeight: 25,
    marginVertical: 25,
    textAlign: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    borderRadius: 15,
    marginVertical: 10,
  },
  button: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#d1d1d1',
    borderRadius: 15,
    padding: 25,
  },
  buttonText: {
    color: theme.color.text,
    fontSize: 20,
    textTransform: 'uppercase',
  },
  termsOfService: {
    color: theme.color.text,
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 10,
  },
  modal: {
    margin: 0,
  },
}));

const Landing = (): ReactElement => {
  const [isShowModal, setIsShowModal] = useState(false);
  const dispatch = useDispatch();
  const styles = useStyles();
  const history = useHistory();

  const onSelectPhoto = (data: Data[]): void => {
    if (data.length > 0) {
      const photos = _.map(data, 'uri');
      dispatch<AddAlbumAction>({
        type: AlbumType.ADD_ALBUM,
        photos,
      });
      history.push('/album');
    }
  };

  const onOpenModal = async (): Promise<void> => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

    if (status === 'granted') {
      setIsShowModal(true);
    } else {
      alert('Media permission is denied. Please go to your phone setting and enable it again');
    }
  };

  return (
    <>
      <Container style={styles.container}>
        <H1 style={styles.heading}>Professional retouching</H1>
        <H1 style={styles.heading}>Powered by A.I.</H1>

        <Image
          style={styles.image}
          source={Comparison}
        />

        <H2 style={styles.text}>Select a photo to start</H2>
        <Button large style={styles.button} onPress={onOpenModal}>
          <Text style={styles.buttonText}>Select Photo</Text>
        </Button>
        <H3 style={styles.termsOfService}>By selecting a photo, you agree to our Term of Service and Privacy Policy</H3>
      </Container>

      <Modal isVisible={isShowModal} useNativeDriver style={styles.modal} hasBackdrop={false}>
        <ImagePicker onSelect={onSelectPhoto} setIsShowModal={setIsShowModal} />
      </Modal>
    </>
  );
};

export default withSafeArea(Landing);

