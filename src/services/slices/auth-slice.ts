import {
  createSlice,
  isPending,
  isFulfilled,
  isRejected
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { sliceName } from '../constant';
import {
  forgotPasswordAuth,
  getUserAuth,
  loginUserAuth,
  logoutUserAuth,
  refreshTokenAuth,
  registerUserAuth,
  resetPasswordAuth,
  updateUserAuth
} from '@thunk';

export interface authState {
  isCheck: boolean;
  isLoading: boolean;
  isAuth: boolean;
  user: TUser;
}

const initialState: authState = {
  isCheck: false,
  isLoading: false,
  isAuth: false,
  user: { email: '', name: '' }
};

const authSlice = createSlice({
  name: sliceName.auth,
  initialState: initialState,
  reducers: {
    setIsCheck: (state) => {
      state.isCheck = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUserAuth.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.user = { ...initialState.user };
        state.isAuth = false;
      }
    });

    builder.addMatcher(
      isFulfilled(loginUserAuth, registerUserAuth, getUserAuth),
      (state, { payload }) => {
        if (payload.success && payload.user) {
          state.user = payload.user;
          state.isAuth = true;
        }
      }
    );

    builder.addMatcher(
      isPending(
        refreshTokenAuth,
        registerUserAuth,
        loginUserAuth,
        forgotPasswordAuth,
        resetPasswordAuth,
        getUserAuth,
        updateUserAuth,
        logoutUserAuth
      ),
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      isFulfilled(
        refreshTokenAuth,
        registerUserAuth,
        loginUserAuth,
        forgotPasswordAuth,
        resetPasswordAuth,
        getUserAuth,
        updateUserAuth,
        logoutUserAuth
      ),
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      isRejected(
        refreshTokenAuth,
        registerUserAuth,
        loginUserAuth,
        forgotPasswordAuth,
        resetPasswordAuth,
        getUserAuth,
        updateUserAuth,
        logoutUserAuth
      ),
      (state) => {
        state.isLoading = false;
      }
    );
  },

  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectIsAuth: (state) => state.isAuth,
    selectIsCheck: (state) => state.isCheck,
    selectUser: (state) => state.user
  }
});

export const authReducer = authSlice.reducer;
export const authSelectors = authSlice.selectors;
export const authActions = authSlice.actions;
