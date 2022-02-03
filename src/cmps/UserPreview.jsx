import React from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Link } from 'react-router-dom';
import userImg from '../assets/imgs/user.png'

export default function UserPreview({ user ,onDeleteUser}) {
    const img = (user.picture?.medium) ? (user.picture?.large) : userImg;
    return (
        <div className='card-grid'>
            <Link   style={{'width':'100%'}} to={ `/user/${user._id}` }>
            <div className='user-details flex space-around align-center'>
                <img src={img} />
                {user.id?.value && <p>Id :{user.id.value}</p>}
            </div>
               </Link>
            <h2 className='m-t-10'>{user.name.title.toUpperCase()} {user.name.first} {user.name.last}</h2>
            <p className='m-t-10'>Email :{user.email}</p>
            <div className='user-location m-t-10'>
                <small>Location : {user.location.country} ,{user.location.city} ,{user.location.street.name}{user.location.street.number}</small>
            </div>
            <div className="buttons flex align-items space-around">
               <DeleteOutlineIcon  onClick={ () => onDeleteUser(user._id) }/>
            <Link className='btn' to={ `/user/edit/${user._id}` }><EditOutlinedIcon className='user-edit relative'/></Link>
            
            </div>


        </div>
        )
}
