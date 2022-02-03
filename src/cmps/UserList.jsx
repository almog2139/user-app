import React from 'react';
import { utilService } from '../services/utils';
import UserPreview from './UserPreview';

export function UsersList({ users ,onDeleteUser }) {
    
    return (
        <div className='card-continer'>
            {users?.map(user =>
                <UserPreview key={utilService.makeId()} user={user} onDeleteUser={onDeleteUser} />
            )}

        </div>
    );
}
