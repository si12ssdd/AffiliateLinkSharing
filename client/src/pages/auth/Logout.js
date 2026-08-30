import axios from "axios";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { serverEndpoint } from "../../config/config";
import { useDispatch } from "react-redux";
import { CLEAR_USER } from "../../redux/user/actions";

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = useCallback(async () => {
        try {
            await axios.post(`${serverEndpoint}/auth/logout`, {}, {
                withCredentials: true
            });
            document.cookie = `jwtToken=;
             expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            document.cookie = `refreshToken=; 
              expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            dispatch({
                type: CLEAR_USER
            });
        } catch (error) {
            console.log(error);
            navigate('/error');
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        handleLogout();
    }, [handleLogout]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Logging out...</span>
            </div>
        </div>
    );
}

export default Logout;