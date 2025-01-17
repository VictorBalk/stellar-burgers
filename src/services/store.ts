import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  ingredientReducer,
  burgerReducer,
  authReducer,
  feedsReducer,
  orderReducer
} from '@slices';
import { sliceName } from './constant';

const rootReducer = combineReducers({
  [sliceName.ingredient]: ingredientReducer,
  [sliceName.burger]: burgerReducer,
  [sliceName.auth]: authReducer,
  [sliceName.feeds]: feedsReducer,
  [sliceName.order]: orderReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: getIngredientsApi } }),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
