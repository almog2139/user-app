import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserFilter } from "../cmps/UserFilter";
import { UsersList } from "../cmps/UserList";
import { userService } from "../services/userService.";
import { loadUsers ,removeUser,setFilter} from "../store/actions/userActions";


export const UserApp=()=>{

    const { users, filterBy } = useSelector(state => state.userReducer);
    const dispatch = useDispatch()
 
useEffect(() => {
    dispatch(loadUsers(filterBy))
}, [filterBy])

const onSetFilter = filterBy => dispatch(setFilter(filterBy))
const onDeleteUser = useCallback(userId =>
    dispatch(removeUser(userId)),
    [removeUser, dispatch] )

return (
    <div className="users">
        <div className=" filter flex cloumn align-center space-around">
        <UserFilter onSetFilter={onSetFilter} />
        <button className="add-btn"><Link to={ `/user/edit/` }>Add New User</Link></button>
        </div>
        <UsersList users={users} onDeleteUser={onDeleteUser}/>
    </div>
)
}