import {useFetchWrapper} from "../util/fetchWrapper";
import {useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {authAtom} from "../../states/auth.atom";
import {RegistrationModel} from "../models/registration.model";

const useUserActions = () => {
    const setAuth =  useSetRecoilState(authAtom);
    const navigate = useNavigate();
    const PUBLIC_URL = process.env.REACT_APP_API_URI;
    const fetchWrapper = useFetchWrapper();

    const login = (email: string, password: string) => {
        return new Promise((resolve, reject) => {
            fetchWrapper.post(`${PUBLIC_URL}/login`, { email, password })
                .then(user => {
                    if (user.status) {
                        localStorage.setItem('user', JSON.stringify(user));
                        setAuth(user);
                        navigate('/');
                    } else {
                        resolve(user);
                    }
                });
        });
    }

    const register = (userData: RegistrationModel) => {
        return new Promise((resolve, reject) => {
            fetchWrapper.post(`${PUBLIC_URL}/register`, {userData})
                .then(user => {
                    console.log('register=>', user);
                    if (user.status) {
                        localStorage.setItem('user', JSON.stringify(user));
                        setAuth(user);
                        navigate('/');
                    } else {
                        resolve(user);
                    }
                });
        });
    }

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('user');
        setTimeout(() => {
            navigate('/login');
        }, 200);
    }

    return {login, register, logout};
}

export default useUserActions;