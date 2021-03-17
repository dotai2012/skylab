import { combineReducers } from 'redux';
import albums from './albums';

const rootReducer = combineReducers({
  albums,
});

type RootState = ReturnType<typeof rootReducer>;
type RootStateSelector<T extends keyof RootState> = (state: RootState) => Pick<RootState, T>;

export default rootReducer;
export {
  RootState,
  RootStateSelector,
};
