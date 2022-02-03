import React from 'react';
import { useState } from 'react';
import { userService } from '../services/userService.';
import { useEffect } from 'react';
import Close from '@material-ui/icons/Close';
import userImg from '../assets/imgs/user.png'

export function UserDetails({match, history}) {
    const [user, setUser] = useState(null)

    useEffect(() => {

        const loadUser = async () => {
            const { id } = match.params
            const user = await userService.getById(id)
            setUser(user)
        }

        loadUser()
    }, [match.params])


    if (!user) return <div>Loading</div>
    const img = (user.picture?.large) ? (user.picture?.large) : userImg;
    return (
        <div className='user-deatilss'>
            <button className='close-btn'onClick={() => history.goBack()}><Close /></button>
            <img src={img} />
        <div className=' flex space-around align-center m-t-10'>
            {user.id?.value && <p>Id :{user.id.value}</p>}
        </div>
        <h2 className='m-t-10'>{user.name.title.toUpperCase()} {user.name.first} {user.name.last}</h2>
        <p className='m-t-10'>Email :{user.email}</p>
        <p className='m-t-10'>Phone :{user.phone}</p>
        <div className='user-location m-t-10'>
            <small>Location : {user.location.country} ,{user.location.city} ,{user.location.street.name}{user.location.street.number}</small>
        </div>
       
       


    </div>
    );
}
