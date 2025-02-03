
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistReducer,
    persistStore,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";
  import ehrReducer from "@/redux/slices/ehrSlice";

  // Persist config for authentication
  const authPersistConfig = {
    key: 'auth',
    storage,
  };

  // Persist config for EHRReducer
  const ehrPersistConfig = {
    key: "ehr",
    storage,
  };

  const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
  const persistedEHRReducer = persistReducer(ehrPersistConfig, ehrReducer);

  const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        ehr: persistedEHRReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;