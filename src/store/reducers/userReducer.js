const initialState = {
    filterBy: {
        name: '',
        location: '',
        id: '',
        email: ''
    },
    users: [],
}


export function userReducer(state = initialState, action) {

    switch (action.type) {
        case 'SET_USERS':
            return {...state, users: [...action.users] }

        case 'REMOVE_USER':
            return {...state, users: state.users.filter(user => user._id !== action.userId) }

        case 'ADD_USER':
            return {...state, users: [...state.users, action.user] }
        case 'UPDATE_USER':
            return {...state, users: state.users.map(user => user._id === action.user._id ? action.user : user) }

        case 'SET_FILTER':
            return {...state, filterBy: {...action.filterBy } }

        default:
            return state
    }
}