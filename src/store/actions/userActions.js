import { userService } from "../../services/userService."

export function loadUsers(filterBy) { // Action Creator
    return async(dispatch) => {
        const users = await userService.query(filterBy)
        const action = {
            type: 'SET_USERS',
            users
        }
        dispatch(action)
    }
}
export function removeUser(userId) {
    return async(dispatch) => {
        await userService.removeUser(userId)
        const action = {
            type: 'REMOVE_USER',
            userId
        }
        dispatch(action)

    }
}
export function setFilter(filterBy) {
    return (dispatch) => {
        const action = {
            type: 'SET_FILTER',
            filterBy
        }
        dispatch(action)
    }
}

export function saveUser(userTosave) {
    console.log('userToSave', userTosave);
    return async(dispatch) => {
        const typeRes = (userTosave._id) ? 'UPDATE_USER' : 'ADD_USER'
        const user = await userService.save(userTosave)

        const action = {
            type: typeRes,
            user
        }
        dispatch(action)

    }
}