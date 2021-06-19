export type AuthenticationState = {
    isAuthenticated: boolean
}

export type TOGGLE_AUTHENTICATION_ACTIONS = {
    type: string,
    payload: boolean
}


export const TOGGLE_AUTHENTICATION = "TOGGLE_AUTHENTICATION";



export type AuthenticationActionTypes = TOGGLE_AUTHENTICATION_ACTIONS