import { createSlice } from "@reduxjs/toolkit";
import { AppSettings, defaultSetting } from "../../../types/setting";

const initialState = {
  settings: defaultSetting as AppSettings,
};

const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState,
  reducers: {}
});

export const SettingsAction = settingsSlice.actions;
export default settingsSlice.reducer;