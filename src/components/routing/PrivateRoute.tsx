import {useRecoilValue} from "recoil";
import {authAtom} from "../../states/auth.atom";
import {Navigate, Outlet} from "react-router-dom";
import Header from "./Header";

const PrivateRoute: React.FC = () => {
    const isLoggedin = useRecoilValue(authAtom);
    return(
        isLoggedin ?
            <>
                <Header/>
                <Outlet />
            </>
            :
            <Navigate to="/login" />
    );
}

export default PrivateRoute;