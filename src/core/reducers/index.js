import { combineReducers } from "@reduxjs/toolkit";
import AuthUserReducer from "./AuthUserReducer";

const reducers = combineReducers({
  authUser: AuthUserReducer,
});

export default reducers;
