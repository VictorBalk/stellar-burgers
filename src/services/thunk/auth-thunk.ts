import { createAsyncThunk } from '@reduxjs/toolkit';
import { sliceName } from '../constant';

import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  refreshToken,
  registerUserApi,
  resetPasswordApi,
  TAuthResponse,
  TForgotPasswordData,
  TLoginData,
  TRegisterData,
  TresetPasswordData,
  TServerResponse,
  TUserResponse,
  updateUserApi
} from '@api';

export const refreshTokenAuth = createAsyncThunk(
  `${sliceName.auth}/refreshToken`,
  async () => {
    return await refreshToken();
  }
);

export const registerUserAuth = createAsyncThunk<TAuthResponse, TRegisterData>(
  `${sliceName.auth}/registerUser`,
  async (data: TRegisterData) => {
    return await registerUserApi(data);
  }
);

export const loginUserAuth = createAsyncThunk<TAuthResponse, TLoginData>(
  `${sliceName.auth}/loginUser`,
  async (data: TLoginData) => {
    return await loginUserApi(data);
  }
);

export const forgotPasswordAuth = createAsyncThunk<
  TServerResponse<{}>,
  TForgotPasswordData
>(`${sliceName.auth}/forgorPassword`, async (data: TForgotPasswordData) => {
  return await forgotPasswordApi(data);
});

export const resetPasswordAuth = createAsyncThunk<
  TServerResponse<{}>,
  TresetPasswordData
>(`${sliceName.auth}/resetPassword`, async (data: TresetPasswordData) => {
  return await resetPasswordApi(data);
});

export const getUserAuth = createAsyncThunk<TUserResponse>(
  `${sliceName.auth}/getUserAuth`,
  async () => {
    return await getUserApi();
  }
);

export const updateUserAuth = createAsyncThunk<
  TUserResponse,
  Partial<TRegisterData>
>(`${sliceName.auth}/getUserAuth`, async (user: Partial<TRegisterData>) => {
  return await updateUserApi(user);
});

export const logoutUserAuth = createAsyncThunk<TServerResponse<{}>>(
  `${sliceName.auth}/logout`,
  async () => {
    return await logoutApi();
  }
);
