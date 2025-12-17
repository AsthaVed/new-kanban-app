import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slice/authSlice";
import authReducer from "@/redux/slice/authSlice";
import boardReducer from "@/redux/slice/boardSlice"
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
// Redux automatically localStorage me data save/load karega
// Redux Persist = Redux ka data refresh hone par bhi delete na ho

// With redux-persist:
// Tum login karti ho
// Redux persist data ko localStorage me save karta hai
// Page refresh → redux-persist data wapas load kar deta hai
// User logged in hi rehta hai

const persistAuthConfig = {
  key: "auth",
  storage
};
const persistBoardConfig = {
  key: "board",
  storage
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedBoarcReducer = persistReducer(persistBoardConfig, boardReducer);


export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        board: persistedBoarcReducer
    },
      middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch