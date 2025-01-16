import { createAsyncThunk } from '@reduxjs/toolkit';
import { sliceName } from '../constant';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TNewOrderResponse,
  TOrderResponse
} from '@api';
import { TOrder } from '@utils-types';

export const fetchOrders = createAsyncThunk<TOrder[]>(
  `${sliceName.order}/getOrdersForUser`,
  async () => {
    return await getOrdersApi();
  }
);

export const getOrderByNumber = createAsyncThunk<TOrderResponse, number>(
  `${sliceName.order}/getOrderByNumber`,
  async (number) => {
    return await getOrderByNumberApi(number);
  }
);

export const createOrder = createAsyncThunk<TNewOrderResponse, string[]>(
  `${sliceName.order}/createOrder`,
  async (number) => {
    return await orderBurgerApi(number);
  }
);
