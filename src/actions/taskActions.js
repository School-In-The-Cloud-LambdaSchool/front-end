import axios from 'axios';
import {axiosWithAuth} from '../utils/axiosWithAuth';

export const FETCH_TASK_START = 'FETCH_TASK_START';
export const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS';
export const FETCH_TASK_FAIL = 'FETCH_TASK_FAIL';

export const POST_TASK_START = 'POST_TASK_START';
export const POST_TASK_SUCCESS = 'POST_TASK_SUCCESS';
export const POST_TASK_FAIL = 'POST_TASK_FAIL';


export const getTask = () => dispatch => {
    dispatch({type: FETCH_TASK_START})
    axiosWithAuth()
    .get('/')
    .then(res => {
        console.log('FETCH FORM LOG: ', res)
        // dispatch({type: FETCH_TASK_SUCCESS, payload: res})
    })
    .catch(err => {
        console.log('FETCH FORM ERROR: ', err)
        // dispatch({type: FETCH_TASK_FAIL, payload: err})
    })
}

export const postTask = () => dispatch => {
    dispatch({type: POST_TASK_START})
    axios
    .post('/')
    .then(res => {
        console.log('FETCH FORM LOG: ', res)
        // dispatch({type: POST_TASK_SUCCESS, payload: res})
    })
    .catch(err => {
        console.log('FETCH FORM ERROR: ', err)
        // dispatch({type: POST_TASK_FAIL, payload: err})
    })
}