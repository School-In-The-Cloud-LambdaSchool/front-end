
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
        case 'FETCH_FORM_START':
            return{
                ...state,
                isFetching: true
            }
        case 'FETCH_FORM_SUCCESS':
            return{
                ...state,
                isFetching: false,
                results: action.payload
            }

    
        default:
            break;
    }
}

export default formReducer