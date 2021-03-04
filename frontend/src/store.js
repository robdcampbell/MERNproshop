import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "./reducers/productReducers";

const reducer = combineReducers({
  productlist: productListReducer,
});

const initialState = {};

const middleware = [thunk];

// instantiate store, pass in reducer,
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
