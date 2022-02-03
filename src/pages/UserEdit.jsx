import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { userService } from '../services/userService.';
import Close from '@material-ui/icons/Close';
import userImg from '../assets/imgs/user.png'
import { saveUser } from "../store/actions/userActions";
import { useDispatch, useSelector } from 'react-redux';

export function UserEdit({ match, history }) {
    const [user, setUser] = useState(null);
    const [msg, setMsg] = useState('')
    const { users} = useSelector(state => state.userReducer);
    const dispatch = useDispatch()


    useEffect(() => {
        const { id } = match.params
        console.log('id', id);
        const loadUser = async () => {
            const user = id ? await userService.getById(id) : userService.getEmptyUser()
            setUser(user)
        }
        loadUser()
    }, [match.params, setUser])

    const onSaveUser = async (ev) => {
        ev.preventDefault()
        const isOkToSave = validate()
        if (isOkToSave) {
            dispatch(saveUser(user))
            history.push('/')
        }
    }
    const validate = () => {
        if (!user.name.first || !user.name.last || !user.location.street.number || !user.location.street.name || !user.location.city || !user.location.country || !user.email) {
            setMsg('all fields are require!')
            setTimeout(() => {
                setMsg('')
            }, 5000)
            return false

        }
        if (user.name?.first.length < 3 || user.name?.last.length < 3) {
            setMsg('Name must contain at least 3 characters!')
            setTimeout(() => {
                setMsg('')
            }, 5000)
            return false
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email)) {
            setMsg('Invalid Email!')
            setTimeout(() => {
                setMsg('')
            }, 5000)
            return false
        }
        let isEmailExist=users.find(currUser=>currUser.email===user.email &&currUser._id!==user._id)
        if(isEmailExist){
            setMsg('This email address is already in use')
            setTimeout(() => {
                setMsg('')
            }, 5000)
            return false
        }
        return true



    }
    const handelUserChange = (ev) => {
        const name = ev.target.name
        const value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }))

    };
    const changeName = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value
        let copyUser = { ...user }
        copyUser.name[name] = value
        setUser(copyUser)
    }
    const changeLocation = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value
        let copyUser = { ...user }
        copyUser.location[name] = value
        setUser(copyUser)

    }
    const changeLocationStreet = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value
        let copyUser = { ...user }
        copyUser.location.street[name] = value
        setUser(copyUser)

    }
    if (!user) return <div>loading</div>
    const img = (user.picture?.large) ? (user.picture?.large) : userImg;
    return (
        <>
            <form className="user-deatilss " onSubmit={onSaveUser}>
                <button className='close-btn' onClick={() => history.push('/')}><Close /></button>
                <img src={img} />
                <h3 className="msg">{msg}</h3>
                <secrion className='user-fields flex column'>
                    <div className='flex m-t-7 space-between'>
                        <label htmlFor="">Title Name:</label>
                        <input type="text" name="title" placeholder="Title Name" value={user.name.title} onChange={changeName} />
                    </div>
                    <div className='flex m-t-7 space-between'>
                        <label htmlFor="">First Name:</label>
                        <input type="text" name="first" placeholder="First Name" value={user.name.first} onChange={changeName} />
                    </div>
                    <div className='flex m-t-7 space-between'>
                        <label htmlFor="">Last Name:</label>
                        <input type="text" name="last" placeholder="Last Name" value={user.name.last} onChange={changeName} />
                    </div>
                    <div className='flex m-t-7 space-between'>
                        <label htmlFor="">Street Name:</label>
                        <input type="text" name="name" placeholder="Street Name" value={user.location.street.name} onChange={changeLocationStreet} />
                    </div>
                    <div className='flex m-t-7 space-between'><label htmlFor="">Street Number:</label>
                        <input type="number" name="number" placeholder="Street Number" value={user.location.street.number} onChange={changeLocationStreet} />
                    </div>
                    <div className='flex m-t-7 space-between'><label htmlFor="">City:</label>
                        <input type="text" name="city" placeholder="City" value={user.location.city} onChange={changeLocation} />
                    </div>
                    <div className='flex m-t-7 space-between' >
                        <label htmlFor="">Country:</label>
                        <input type="text" name="country" placeholder="Country" value={user.location.country} onChange={changeLocation} />
                    </div>
                    <div className='flex m-t-7 space-between'>
                        <label htmlFor="">Email:</label>
                        <input className="email-input" type="email" name="email" placeholder="Email" value={user.email} onChange={handelUserChange} />
                    </div>
                    <button className='btn-save'>Save</button>
                </secrion>
            </form>
        </>
    )

}
