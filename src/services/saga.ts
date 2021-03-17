import { takeLatest } from '@redux-saga/core/effects';
import { SagaIterator } from 'redux-saga';
import AlbumController from '../actions/album';
import { AlbumType } from '../actions/album.type';

function* rootSaga(): SagaIterator {
  yield takeLatest(AlbumType.ADD_ALBUM, AlbumController.addAlbum);
}

export default rootSaga;
