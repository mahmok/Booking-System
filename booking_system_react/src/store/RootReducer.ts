import { combineReducers } from "redux";
import loadingReducer from "./loading/Reducer";
import authenticationReducer from "./authentication/Reducer";


const rootReducer = combineReducers({
  loadingState: loadingReducer,
  authenticationState: authenticationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;