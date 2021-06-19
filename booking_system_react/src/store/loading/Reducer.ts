import { LoadingActionTypes, LoadingState, TOGGLE_LOADING } from "./Actions";

const initialState: LoadingState = {
    isLoading: false
}
export default function loadingReducer(state: LoadingState = initialState, action: LoadingActionTypes): LoadingState
{
    switch(action.type){
        case TOGGLE_LOADING:
            return {isLoading: action.payload};
        default:
            return state;
    }
}