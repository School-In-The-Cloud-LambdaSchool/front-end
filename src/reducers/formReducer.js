import {
    FETCH_FORM_START,
    FETCH_FORM_SUCCESS,
    FETCH_FORM_FAIL,
    POST_FORM_START,
    POST_FORM_SUCCESS,
    POST_FORM_FAIL
} from '../actions/formActions';

const initialState = {
    userData: {
        token: '',
        user: {
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            adminCode: '',
            role: ''
        }
    },
    results: [],
    isFetching: false,
    isPosting: false,
    error: ''
}

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FORM_START:
            return{
                ...state,
                isFetching: true
            }
        case FETCH_FORM_SUCCESS:
            return{
                ...state,
                isFetching: false,
                results: action.payload
            }
        case FETCH_FORM_FAIL:
            return{
                ...state,
                isFetching: false,
                error: action.payload
            }
        case POST_FORM_START:
            return{
                ...state,
                isPosting: true
            }
        case POST_FORM_SUCCESS:
            return{
                ...state,
                isPosting: false,
                userData: {
                    token: action.payload.token,
                    user: action.payload.user
                }
            }
        case POST_FORM_FAIL:
            return{
                ...state,
                isPosting: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default formReducer