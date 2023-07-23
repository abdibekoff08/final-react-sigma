import { combineReducers, createStore, applyMiddleware } from "redux";
import { shop } from "./reducers/shop";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  shop: shop,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const confstore = configureStore({
  reducer: rootReducer,
});

export { store, confstore, AppDispatch }; // Export the type alias AppDispatch

