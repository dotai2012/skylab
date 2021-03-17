import _ from 'lodash';
import produce from 'immer';
import {
  AlbumType,
  DeletePhotoActionSuccess,
  AlbumPayload,
  AddAlbumActionSuccess,
} from '../actions/album.type';

type AlbumAction = AddAlbumActionSuccess | DeletePhotoActionSuccess;

const defaultState: AlbumPayload[] = [];

const albums = produce((state: AlbumPayload[], action: AlbumAction): AlbumPayload[] => {
  switch (action.type) {
    case AlbumType.ADD_ALBUM_SUCCESS:
      state.unshift(action.payload);
      break;
    // case AlbumType.DELETE_PHOTO_SUCCESS:
    //   _.remove(state, ({ id }) => id === action.payload.id);
    //   break;
    default:
      break;
  }

  return state;
}, defaultState);

export default albums;

