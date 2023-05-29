import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from '../../services/authService';
import { IsActiveContext } from "../../contexts/IsActiveContext";
import { AuthContext } from "../../contexts/AuthContext";

const Logout = () => {
    const navigate = useNavigate();
    const { user, userLogout } = useContext(AuthContext);
    const { isActiveHandler } = useContext(IsActiveContext);

    useEffect(() => {
        async function fetchData () {
            await authService.logout(user.accessToken);
            userLogout();
            navigate('/');
            isActiveHandler('/');
        }

        try {
            fetchData();
        } catch (error) {
            navigate('/');
            isActiveHandler('/');
        }
    });

    return null;
}

export default Logout;