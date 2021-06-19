import SessionStorage from "../../utils/SessionStorage";
import { AuthenticationActionTypes, AuthenticationState, TOGGLE_AUTHENTICATION } from "./Actions";

const initialState: AuthenticationState = {
    isAuthenticated: new SessionStorage().tokenExists()
}
export default function authenticationReducer(state: AuthenticationState = initialState, action: AuthenticationActionTypes): AuthenticationState
{
    switch(action.type){
        case TOGGLE_AUTHENTICATION:
            return {isAuthenticated: action.payload};
        default:
            return state;
    }
}