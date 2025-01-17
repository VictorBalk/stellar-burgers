import { createSlice, isPending, isFulfilled } from '@reduxjs/toolkit';
import { sliceName } from '../constant';

import { createOrder, fetchOrders, getOrderByNumber } from '@thunk';
import { TOrder } from '@utils-types';

export interface ordersState {
  orders: TOrder[];
  orderModalData: TOrder | null;
  orderByNumber: TOrder | null;
  isOrderRequest: boolean;
  isLoading: boolean;
}

const initialState: ordersState = {
  orders: [],
  orderModalData: null,
  orderByNumber: null,
  isOrderRequest: false,
  isLoading: false
};

const orderslice = createSlice({
  name: sliceName.order,
  initialState: initialState,
  reducers: {
    clearModalData: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
      state.orderByNumber = payload.orders[0];
    });
    builder.addCase(getOrderByNumber.pending, (state) => {
      state.orderByNumber = null;
    });
    builder.addCase(createOrder.pending, (state) => {
      state.isOrderRequest = true;
      state.orderModalData = null;
    });
    builder.addCase(createOrder.fulfilled, (state, { payload }) => {
      state.isOrderRequest = false;
      state.orderModalData = payload.order;
    });
    builder.addCase(fetchOrders.pending, (state) => {
      state.orders = [];
    });
    builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {
      state.orders = payload;
    });

    builder.addMatcher(
      isPending(getOrderByNumber, createOrder, fetchOrders),
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      isFulfilled(getOrderByNumber, createOrder, fetchOrders),
      (state) => {
        state.isLoading = false;
      }
    );
  },
  selectors: {
    selectAll: (state) => state,
    selectOrders: (state) => state.orders,
    selectIsOrderRequest: (state) => state.isOrderRequest,
    selectOrdersIsLoading: (state) => state.isLoading,
    selectOrderByNumber: (state) => state.orderByNumber
  }
});

export const orderReducer = orderslice.reducer;
export const orderSelectors = orderslice.selectors;
export const orderActions = orderslice.actions;
