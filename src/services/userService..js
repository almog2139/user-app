import axios from 'axios';
import { storageService } from './storageService';
import { utilService } from './utils';

export const userService = {
    query,
    removeUser,
    _loadUsers,
    getUsers,
    getById,
    getEmptyUser,
    save
}
const STORAGE_KEY = 'users'
var gUsers = _loadUsers()

async function _loadUsers() {
    let users = storageService.load(STORAGE_KEY)
    if (!users || !users.length) users = await getUsers();
    gUsers = [...users]
    console.log('g', gUsers);
    storageService.store(STORAGE_KEY, gUsers)
    return gUsers
}

function getEmptyUser() {
    return {

        "name": {
            "title": "",
            "first": "",
            "last": ""
        },
        "location": {
            "street": {
                "number": 0,
                "name": ""
            },
            "city": "",
            "country": "",
        },
        "email": ""
    }
}
async function getUsers() {
    const url = 'https://randomuser.me/api/?results=10'
    const users = (await axios.get(url)).data
    users.results.forEach(user => user._id = utilService.makeId());
    return users.results;
}

async function query(filterBy) {
    const users = await gUsers;
    let userToReturn = users;
    userToReturn.map(user => { if (!user.id.value) user.id.value = '' })
    console.log('users', users);
    if (filterBy) {
        console.log('here', filterBy);
        userToReturn = users.filter(user => {
            if (
                user.id.value.toLowerCase().includes(filterBy.id) &&
                user.email.toLowerCase().includes(filterBy.email) &&
                (user.name.first.toLowerCase().includes(filterBy.name) || user.name.last.toLowerCase().includes(filterBy.name) || user.name.title.toLowerCase().includes(filterBy.name)) &&
                ((user.location.street.number + '').includes(filterBy.location) || user.location.street.name.toLowerCase().includes(filterBy.location) || user.location.city.toLowerCase().includes(filterBy.location) || user.location.country.toLowerCase().includes(filterBy.location))
            ) return user
        })
        console.log('after', userToReturn);


        console.log('userToReturn', userToReturn);
        return userToReturn

    }
}

async function removeUser(userId) {
    const users = await gUsers
    const idx = users.findIndex(user => user._id === userId)
    users.splice(idx, 1)
    gUsers = [...users]
    storageService.store(STORAGE_KEY, gUsers)

}
async function getById(id) {
    const users = await gUsers
    const user = users.find(user => user._id === id)
    return user
}

async function save(userToSave) {
    const users = await gUsers
    console.log('gUsers', gUsers);
    if (userToSave._id) {
        const idx = users.findIndex(user => user._id === userToSave._id)
        users.splice(idx, 1, userToSave)


    } else {
        userToSave._id = utilService.makeId()
        users.push(userToSave)
    }
    gUsers = users
    storageService.store(STORAGE_KEY, gUsers)
    return Promise.resolve(userToSave);
}