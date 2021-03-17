import {
  SagaAction,
  Action,
} from '../services/utils';

enum AlbumType {
  ADD_ALBUM = 'ADD_ALBUM',
  ADD_ALBUM_SUCCESS = 'ADD_ALBUM_SUCCESS',
  ADD_PHOTO = 'ADD_PHOTO',
  ADD_PHOTO_SUCCESS = 'ADD_PHOTO_SUCCESS',
}

interface AlbumPayload {
  id: string;
  name: string;
  photos: string[];
}

interface PhotoPayload {
  photo: string;
}

type AddAlbumAction = SagaAction<AlbumType.ADD_ALBUM, Pick<AlbumPayload, 'photos'>>;
type AddPhotoAction = SagaAction<AlbumType.ADD_PHOTO, PhotoPayload>;

type AddAlbumActionSuccess = Action<AlbumType.ADD_ALBUM_SUCCESS, AlbumPayload>;
type AddPhotoActionSuccess = Action<AlbumType.ADD_PHOTO_SUCCESS, PhotoPayload>;

export {
  PhotoPayload,
  AlbumType,
  AlbumPayload,
  AddAlbumAction,
  AddPhotoAction,
  AddAlbumActionSuccess,
  AddPhotoActionSuccess,
};
