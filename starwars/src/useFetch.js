import React, { useEffect, useReducer } from 'react';

const initialState = {
    result: null,
    loading: true,
    error: null
}

const fetchReducer = (state = initialState, action) => {
    if(action.type === 'LOADING') {
        return { ...state, 
            response: null, 
            loading: true, 
            error: null 
        }
    } else if(action.type === 'RESPONSE_COMPLETE') {
        return { ...state, 
            response: action.payload.response, 
            loading: false, 
            error: null 
        }
    } else if(action.type === 'RESPONSE_FAILED') {
        return {  ...state, 
            response: null, 
            loading: false, 
            error: action.payload.error 
        }
    }
    return state;
}

//custom hook for fetching data
export default (url) => {
    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        dispatch({
            type: 'LOADING'
        })
  
        fetch(url)
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: 'RESPONSE_COMPLETE',
                payload: {
                    response: data
                }
            })
        })
        .catch(error => {
            dispatch({
                type: 'RESPONSE_FAILED',
                payload: {
                    error: error
                }
            })
        });
    }, [])

    return [state.response, state.loading, state.error];
}