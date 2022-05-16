import {atom} from "recoil";

const authAtom = atom({
    key: 'auth',
    default: JSON.parse(localStorage.getItem('user') as string)
})

export {authAtom}
