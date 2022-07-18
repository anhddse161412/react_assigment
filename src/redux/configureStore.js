import { createStore, applyMiddleware } from "redux";
import { Reducer } from "./reducer";
import thunk from "redux-thunk";

export const configureStore = () => {
   return createStore(Reducer, applyMiddleware(thunk));
};
export default configureStore;
