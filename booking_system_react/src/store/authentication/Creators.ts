import * as actions from './Actions';

export function toggleAuthentication(isAuthenticated: boolean): actions.AuthenticationActionTypes
{
    return {
        type: actions.TOGGLE_AUTHENTICATION,
        payload: isAuthenticated
    };
}