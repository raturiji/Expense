import {createStore, combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import Reducer from './reducers';

const Reducers = {
  appData: Reducer,
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['navigation'],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(Reducers),
);

export const Store = createStore(persistedReducer);

export const persistor = persistStore(Store);
