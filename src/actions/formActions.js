import axios from 'axios';
import {axiosWithAuth} from '../utils/axiosWithAuth';

export const FETCH_FORM_START = 'FETCH_FORM_START';
export const FETCH_FORM_SUCCESS = 'FETCH_FORM_SUCCESS';
export const FETCH_FORM_FAIL = 'FETCH_FORM_FAIL';

export const POST_FORM_START = 'POST_FORM_START';
export const POST_FORM_SUCCESS = 'POST_FORM_SUCCESS';
export const POST_FORM_FAIL = 'POST_FORM_FAIL';


export const getForm = () => dispatch => {
    dispatch({type: FETCH_FORM_START})
    axiosWithAuth()
    .get('/')
    .then(res => {
        console.log('FETCH FORM LOG: ', res)
        // dispatch({type: FETCH_FORM_SUCCESS, payload: res})
    })
    .catch(err => {
        console.log('FETCH FORM ERROR: ', err)
        // dispatch({type: FETCH_FORM_FAIL, payload: err})
    })
}

export const postForm = () => dispatch => {
    dispatch({type: POST_FORM_START})
    axios
    .post('/')
    .then(res => {
        console.log('FETCH FORM LOG: ', res)
        // dispatch({type: POST_FORM_SUCCESS, payload: res})
    })
    .catch(err => {
        console.log('FETCH FORM ERROR: ', err)
        // dispatch({type: POST_FORM_FAIL, payload: err})
    })
}