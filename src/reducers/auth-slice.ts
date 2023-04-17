import { TokenResponse } from "@react-oauth/google";
import { createSlice } from "@reduxjs/toolkit";
import { isPast } from "date-fns";
import { toDate } from "date-fns-tz";

interface Credential extends TokenResponse {
  dateExpired: Date | null;
}

const initialState = {
  isAuthenticated: false, // TODO
  credentials: null as unknown as Credential,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    getAccessTokenGoogle(state) {
      const storageStr = localStorage.getItem("google_cre");
      state.credentials = localStorage.getItem("google_cre") ? JSON.parse(storageStr as string) : null;

      if (state.credentials) {
        const dateExpired = state.credentials.dateExpired as Date;
        if (isPast(toDate(dateExpired, { timeZone: "Asia/Ho_Chi_Minh" }))) {
          localStorage.setItem("google_cre", "");
          state.isAuthenticated = false;
        } else {
          state.isAuthenticated = true;
        }
      }
    },
    authenticated(state) {
      state.isAuthenticated = true;
    },
    clear(state) {
      state.isAuthenticated = false;
    }
  }
});

export const AuthActions = authSlice.actions;
export default authSlice.reducer;