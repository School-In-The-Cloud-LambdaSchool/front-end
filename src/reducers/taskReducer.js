import {
    FETCH_TASK_START,
    FETCH_TASK_SUCCESS,
    FETCH_TASK_FAIL,
    POST_TASK_START,
    POST_TASK_SUCCESS,
    POST_TASK_FAIL
} from '../actions/formActions';


const initialState = {
    tasks: [{
        studentId: null,
        taskPairId: null,
        task: '',
        completed: false
    }],
    isFetching: false,
    isPosting: false,
    error: ''
}

const taskReducer = (state = initialState, action) =>{
    switch(action.type) {
        case FETCH_TASK_START:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_TASK_SUCCESS:
            return {
                ...state,
                isFetching: false,
                tasks: action.payload
            }
        case FETCH_TASK_FAIL:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        case POST_TASK_START:
            return {
                ...state,
                isPosting: true
            }
        case POST_TASK_SUCCESS:
            return {
                ...state,
                isPosting: false,
                tasks: [
                    ...state.tasks,
                    action.payload
                ]
            }
        case POST_TASK_FAIL:
            return {
                ...state,
                isPosting: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default taskReducer