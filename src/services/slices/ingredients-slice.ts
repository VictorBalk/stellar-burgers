import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { sliceName } from '../constant';
import { fetchIngredient } from '@thunk';

export interface ingredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
}

const initialState: ingredientsState = {
  ingredients: [],
  isLoading: false
};

const ingredientSlice = createSlice({
  name: sliceName.ingredient,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredient.pending, (state) => {
      state.isLoading = false;
    }),
      builder.addCase(fetchIngredient.fulfilled, (state, { payload }) => {
        state.ingredients = payload;
        state.isLoading = true;
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
