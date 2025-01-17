import { createAsyncThunk } from '@reduxjs/toolkit';
import { sliceName } from '../constant';
import { getIngredientsApi as api } from '@api';

import { TIngredient } from '@utils-types';

type ThunkApiConfig = {
  extra: typeof api;
};

export const fetchIngredient = createAsyncThunk<
  TIngredient[],
  void,
  ThunkApiConfig
>(`${sliceName.ingredient}/fetch`, async (_, { extra }) => {
  return await extra();
});
