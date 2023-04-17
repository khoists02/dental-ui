import thunkMiddleware from "redux-thunk";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import reducer, { IRootState } from "./reducers";
import apiMiddleware from "./apiMiddleware";

export type AppThunk = ThunkAction<void, IRootState, unknown, Action<string>>;

const defaultMiddlewares = [apiMiddleware, thunkMiddleware];
const store = configureStore({
  reducer,
  middleware: defaultMiddlewares,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
