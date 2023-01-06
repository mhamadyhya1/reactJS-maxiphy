import { configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import reducers from "core/reducers";

const rootPersistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(rootPersistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
});
export default store;
export const persistor = persistStore(store);
