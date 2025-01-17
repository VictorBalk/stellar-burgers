import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TabMode, TConstructorIngredient, TIngredient } from '@utils-types';
import { sliceName } from '../constant';

export interface burgerState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: burgerState = {
  ingredients: [],
  bun: null
};

const burgerSlice = createSlice({
  name: sliceName.burger,
  initialState: initialState,
  reducers: {
    addIngredient: {
      prepare: (ingredient: TIngredient) => {
        return {
          payload: { ...ingredient, id: nanoid() }
        };
      },

      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === TabMode.bun
          ? (state.bun = action.payload)
          : state.ingredients.push(action.payload);
      }
    },

    swap: (state, action: PayloadAction<{ index: number; up: boolean }>) => {
      const swap = function (index1: number, index2: number) {
        [state.ingredients[index1], state.ingredients[index2]] = [
          state.ingredients[index2],
          state.ingredients[index1]
        ];
      };

      if (
        action.payload.up === true &&
        state.ingredients.length > action.payload.index
      ) {
        swap(action.payload.index, action.payload.index - 1);
      } else if (
        action.payload.up === false &&
        state.ingredients.length > action.payload.index
      ) {
        swap(action.payload.index, action.payload.index + 1);
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    clearIngredient: (state) => {
      state.bun = initialState.bun;
      state.ingredients = initialState.ingredients;
    }
  },

  selectors: {
    selectBun: (state) => state.bun,
    selectingredient: (state) => state.ingredients,
    selectAll: (state) => state
  }
});

export const burgerReducer = burgerSlice.reducer;
export const burgerSelectors = burgerSlice.selectors;
export const burgerAction = burgerSlice.actions;
