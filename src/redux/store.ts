import { applyMiddleware, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import reducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["ApiManager"],
};

const rootReducer = persistReducer(persistConfig, reducer);

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
