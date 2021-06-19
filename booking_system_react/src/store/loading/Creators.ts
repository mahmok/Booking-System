import * as actions from './Actions';

export function toggleLoading(isLoading: boolean): actions.LoadingActionTypes
{
    return {
        type: actions.TOGGLE_LOADING,
        payload: isLoading
    };
}