import { put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

import {
  AlbumType,
  AddAlbumAction,
  AddAlbumActionSuccess,
  AddPhotoAction,
  AddPhotoActionSuccess,
} from './album.type';

class AlbumController {
  static* addAlbum({ photos }: AddAlbumAction): SagaIterator {
    const payload = {
      id: uuidv4(),
      name: `New Album ${dayjs().format('mm:HH DD-MM-YYYY')}`,
      photos,
    };
    return yield put<AddAlbumActionSuccess>({ type: AlbumType.ADD_ALBUM_SUCCESS, payload });
  }

  static* addPhoto(payload: AddPhotoAction): SagaIterator {
    return yield put<AddPhotoActionSuccess>({ type: AlbumType.ADD_PHOTO_SUCCESS, payload });
  }
}

export default AlbumController;

