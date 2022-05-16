import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {authAtom} from "../../states/auth.atom";

const useFetchWrapper = () => {
    const [auth, setAuth] = useRecoilState(authAtom);
    const navigate = useNavigate();

    const authHeader = (url: string): any => {
        // return auth header with jwt if user is logged in and request is to the api url
        const token = auth?.token;
        const isLoggedIn = !!token;
        const isApiUrl = url.startsWith(process.env.REACT_APP_API_URI || 'http://localhost:3515');
        if (isLoggedIn && isApiUrl) {
            return { Authorization: `Bearer ${token}` };
        } else {
            return {};
        }
    }



    const request = (method: string) => {
        return (url: string, body?: any, pureBody?: boolean) => {
            const requestOptions: any = {
                method,
                headers: authHeader(url)
            };
            if (body) {
                console.log(body);
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = pureBody ? body : JSON.stringify(body);
            }
            return fetch(url, requestOptions).then(handleResponse);
        }
    }

    const handleResponse =(response: any) => {
        console.log('response type=>', typeof response);
        return response.text().then((text: any) => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if ([401, 403].includes(response.status) && auth?.token) {
                    localStorage.removeItem('user');
                    setAuth(null);
                    navigate('/login');
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
    }

    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE'),
    };
}
export {useFetchWrapper};
