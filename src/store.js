import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme";
import userReducer from "./features/user";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfigTheme = {
  key: "theme",
  version: 1,
  storage,
};
const persistConfigUser = {
  key: "user",
  version: 1,
  storage,
};
const persistedThemeReducer = persistReducer(persistConfigTheme, themeReducer);
const persistedUserReducer = persistReducer(persistConfigUser, userReducer);

export const store = configureStore({
  reducer: {
    theme: persistedThemeReducer,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
