import {
  SagaAction,
  Action,
} from '../services/utils';
import { Data } from '../components/ImagePicker';

enum AlbumType {
  ADD_ALBUM = 'ADD_ALBUM',
  ADD_ALBUM_SUCCESS = 'ADD_ALBUM_SUCCESS',
  DELETE_PHOTO = 'DELETE_ALBUM',
  DELETE_PHOTO_SUCCESS = 'DELETE_ALBUM_SUCCESS',
}

interface AlbumPayload {
  id: string;
  name: string;
  photos: string[];
}

type AddAlbumAction = SagaAction<AlbumType.ADD_ALBUM, Pick<AlbumPayload, 'photos'>>;
type DeletePhotoAction = SagaAction<AlbumType.DELETE_PHOTO, string[]>;

type AddAlbumActionSuccess = Action<AlbumType.ADD_ALBUM_SUCCESS, AlbumPayload>;
type DeletePhotoActionSuccess = Action<AlbumType.DELETE_PHOTO_SUCCESS, Pick<AlbumPayload, 'id' | 'photos'>>;

export {
  AlbumType,
  AlbumPayload,
  AddAlbumAction,
  DeletePhotoAction,
  AddAlbumActionSuccess,
  DeletePhotoActionSuccess,
};
