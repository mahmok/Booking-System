export type LoadingState = {
    isLoading: boolean
}

export type TOGGLE_LOADING_ACTIONS = {
    type: string,
    payload: boolean
}


export const TOGGLE_LOADING = "TOGGLE_LOADING";



export type LoadingActionTypes = TOGGLE_LOADING_ACTIONS