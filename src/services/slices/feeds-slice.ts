import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sliceName } from '../constant';
import { getFetchFeeds } from '../thunk/feeds-thunk';
import { TFeeds } from '@api';

export interface feedsState {
  feeds: TFeeds;
  isLoading: boolean;
}

const initialState: feedsState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false
};

const feedslice = createSlice({
  name: sliceName.feeds,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFetchFeeds.pending, (state) => {
      state.feeds = { ...initialState.feeds };
      state.isLoading = false;
    });
    builder.addCase(getFetchFeeds.fulfilled, (state, { payload }) => {
      state.feeds = { ...payload };
      state.isLoading = true;
    });
  },
  selectors: {
    selectAll: (state) => state,
    selectFeeds: (state) => state.feeds,
    selectFeedsIsLoading: (state) => state.isLoading,
    selectFeedsByNumber: (state, number) => {
      const order = state.feeds.orders.find((item) => item.number);
      return order ? order : null;
    }
  }
});

export const feedsReducer = feedslice.reducer;
export const feedsActions = feedslice.actions;
export const feedsSelectors = feedslice.selectors;
