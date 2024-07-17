import { configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.jsx";
import { createLogger } from "redux-logger";
import thunk from 'redux-thunk'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const logger = createLogger();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(store);
