import {combineReducers} from 'redux'

const initAuth = {
    id: '',
    username: '',
    Task: [],
}

const AuthReducer = (state = initAuth, action) =>{
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return{
                ...state,
                id: action.payload.id,
                username: action.payload.username
            }
        case 'LOGOUT_SUCCESS':
            return{
                ...state,
                id:'',
                username:''
            }
        default:
            return state
    }
}

export default combineReducers(
    {
        auth: AuthReducer
    }
)