import createSagaMiddleware from 'redux-saga';
import {
  Action,
  Reducer,
  Store,
  StoreEnhancer,
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import {
  Persistor,
  persistStore,
} from 'redux-persist';
import persistReducer, {
  PersistPartial,
} from 'redux-persist/es/persistReducer';

import AsyncStorage from '@react-native-community/async-storage';
import reducers from '../reducers';
import rootSaga from './saga';

// TODO: Delete this
AsyncStorage.clear();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

interface InitStore {
  store: Store<PersistPartial, Action<any>>;
  persistor: Persistor;
}

const initStore = (combinedReducers: Reducer<any, any>, enhancer?: StoreEnhancer): InitStore => {
  const persistedReducer = persistReducer(persistConfig, combinedReducers);

  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};

const sagaMiddleware = createSagaMiddleware();

const { store, persistor } = initStore(reducers, compose(
  applyMiddleware(sagaMiddleware),
));
sagaMiddleware.run(rootSaga);

export { store, persistor };
