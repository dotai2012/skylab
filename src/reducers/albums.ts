import produce from 'immer';
import {
  AlbumType,
  AlbumPayload,
  AddAlbumActionSuccess,
  AddPhotoActionSuccess,
} from '../actions/album.type';

type AlbumAction = AddAlbumActionSuccess | AddPhotoActionSuccess;

const defaultState: AlbumPayload[] = [];

const albums = produce((state: AlbumPayload[], action: AlbumAction): AlbumPayload[] => {
  switch (action.type) {
    case AlbumType.ADD_ALBUM_SUCCESS:
      state.unshift(action.payload);
      break;
    case AlbumType.ADD_PHOTO_SUCCESS:
      console.log('Hello');
      state[0].photos.unshift(action.payload.photo);
      break;
    default:
      break;
  }

  return state;
}, defaultState);

export default albums;

