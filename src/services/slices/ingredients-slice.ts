import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { sliceName } from '../constant';
import { fetchIngredient } from '@thunk';

export interface ingredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: null | SerializedError;
}

const initialState: ingredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

const ingredientSlice = createSlice({
  name: sliceName.ingredient,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredient.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }),
      builder.addCase(fetchIngredient.fulfilled, (state, { payload }) => {
        state.ingredients = payload;
        state.isLoading = false;
      });
    builder.addCase(fetchIngredient.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    });
  },
  selectors: {
    selectAll: (state) => state,
    selectIngredients: (state) => state.ingredients,
    selectIngredientsIsLoading: (state) => state.isLoading,
    selectIngredientById: (state, id) =>
      state.ingredients.find((item) => item._id === id)
  }
});

export const ingredientReducer = ingredientSlice.reducer;
export const ingredientSelectors = ingredientSlice.selectors;
