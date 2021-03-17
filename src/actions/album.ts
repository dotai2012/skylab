import { put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

import {
  AlbumType,
  AddAlbumAction,
  DeletePhotoAction,
  AddAlbumActionSuccess,
  DeletePhotoActionSuccess,
} from './album.type';

class AlbumController {
  static* addAlbum({ photos }: AddAlbumAction): SagaIterator {
    const payload = {
      id: uuidv4(),
      name: dayjs().format('DD-MM-YYYY'),
      photos,
    };
    return yield put<AddAlbumActionSuccess>({ type: AlbumType.ADD_ALBUM_SUCCESS, payload });
  }

  // static* deleteAlbum(payload: DeleteAlbumAction): SagaIterator {
  //   return yield put<DeleteAlbumActionSuccess>({ type: AlbumType.DELETE_WATCH_SUCCESS, payload });
  // }
}

export default AlbumController;

