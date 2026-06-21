import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsReducer from './slices/ingredientsSlice';
import feedReducer from './slices/feedSlice';
import burgerReducer from './slices/burgerConstructorSlice';
import userReducer from './slices/userSlice';
import profileOrdersReducer from './slices/profileOrdersSlice';
import orderReducer from './slices/orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  BurgerConstructor: burgerReducer,
  user: userReducer,
  profileOrders: profileOrdersReducer,
  order: orderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
