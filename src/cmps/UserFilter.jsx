import { useEffect } from "react";
import { useState } from "react";

export function UserFilter({ onSetFilter }) {
    const [filterBy, setFilterBy] = useState({
        name: '',
        location: '',
        id: '',
        email: ''
    })
    useEffect(() => {
        onSetFilter({ ...filterBy })
    }, [filterBy])

    const handelChange = (ev) => {
       
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        const field = ev.target.name;
        setFilterBy(prevFilterBy => ({
            ...prevFilterBy,
            [field]: value
        }))
     

    };

    return <div className="user-filter">
        <input type="text" placeholder="Search first/last:" value={filterBy.name} name="name" onChange={handelChange} autoFocus />
        <input type="text" placeholder="Search User By Id" value={filterBy.id} name="id" onChange={handelChange} />
        <input type="email" placeholder="Search User By Email" value={filterBy.email} name="email" onChange={handelChange} />
        <input type="location" placeholder="Search User By Location" value={filterBy.location} name="location" onChange={handelChange} />
    </div>



}