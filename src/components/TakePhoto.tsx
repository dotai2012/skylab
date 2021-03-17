import React, {
  FunctionComponent,
  memo,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  Camera,
  CameraCapturedPicture,
} from 'expo-camera';
import { LookUp } from '../services/utils';

interface Props {
  onSave: (photo: CameraCapturedPicture) => any;
}

interface CameraPreviewProps {
  photo: CameraCapturedPicture;
  onRetake: () => void;
  onSave: LookUp<Props, 'onSave'>;
}

const styles = StyleSheet.create({
  cameraButton: {
    borderRadius: 25,
    height: 25,
    width: 25,
  },
  cameraButtonText: {
    fontSize: 20,
  },
  cameraContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  cameraInner: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    left: '5%',
    position: 'absolute',
    top: '10%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
  },
  previewContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  previewImageButton: {
    alignItems: 'center',
    borderRadius: 4,
    height: 40,
    width: 130,
  },
  previewImageButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  previewImageContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'flex-end',
  },
  previewImageInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  takePhotoButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    bottom: 0,
    height: 70,
    width: 70,
  },
  takePhotoContainer: {
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    position: 'absolute',
    width: '100%',
  },
  takePhotoInner: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
});

const CameraPreview: FunctionComponent<CameraPreviewProps> = memo(({ photo, onRetake, onSave }) => (
  <View style={styles.previewContainer}>
    <ImageBackground
      source={{ uri: photo?.uri }}
      style={styles.flex}
    >
      <View style={styles.previewImageContainer}>
        <View style={styles.previewImageInner}>
          <TouchableOpacity
            onPress={onRetake}
            style={styles.previewImageButton}
          >
            <Text style={styles.previewImageButtonText}>
              Re-take
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(): void => onSave(photo)}
            style={styles.previewImageButton}
          >
            <Text style={styles.previewImageButtonText}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  </View>
));

const TakePhoto: FunctionComponent<Props> = ({ onSave }) => {
  const cameraRef = useRef<Camera>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>();
  const [cameraType, setCameraType] = useState<'front' | 'back'>(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState<'on' |'off' | 'auto'>('off');

  const onSnap = async (): Promise<void> => {
    const photo = await cameraRef.current?.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const onRetake = (): void => {
    setCapturedImage(undefined);
    setPreviewVisible(false);
  };

  const onFlashModeChange = (): void => {
    if (flashMode === 'on') {
      setFlashMode('off');
    } else if (flashMode === 'off') {
      setFlashMode('on');
    } else {
      setFlashMode('auto');
    }
  };

  const onSwitchCamera = (): void => {
    if (cameraType === 'back') {
      setCameraType('front');
    } else {
      setCameraType('back');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {previewVisible && capturedImage ? (
          <CameraPreview photo={capturedImage} onSave={onSave} onRetake={onRetake} />
        ) : (
          <Camera
            autoFocus
            type={cameraType}
            flashMode={flashMode}
            style={styles.flex}
            ref={cameraRef}
          >
            <View style={styles.cameraContainer}>
              <View style={styles.cameraInner}>
                <TouchableOpacity
                  onPress={onFlashModeChange}
                  style={[styles.cameraButton, { backgroundColor: flashMode === 'off' ? '#000' : '#fff' }]}
                >
                  <Text style={styles.cameraButtonText}>
                    ⚡️
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onSwitchCamera}
                  style={[styles.cameraButton, { marginTop: 20 }]}
                >
                  <Text
                    style={styles.cameraButtonText}
                  >
                    {cameraType === 'front' ? '🤳' : '📷'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.takePhotoContainer}>
                <View style={styles.takePhotoInner}>
                  <TouchableOpacity
                    onPress={onSnap}
                    style={styles.takePhotoButton}
                  />
                </View>
              </View>
            </View>
          </Camera>
        )}
      </View>
    </View>
  );
};

export default memo(TakePhoto);
