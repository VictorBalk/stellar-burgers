import { createAsyncThunk } from '@reduxjs/toolkit';
import { sliceName } from '../constant';
import { getFeedsApi, TFeedsResponse } from '@api';

export const getFetchFeeds = createAsyncThunk<TFeedsResponse>(
  `${sliceName.feeds}/feedsFetch`,
  async () => {
    return await getFeedsApi();
  }
);
