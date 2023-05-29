import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import * as authService from "../../services/authService";
import { IsActiveContext } from "../../contexts/IsActiveContext";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
    const [err, setErr] = useState('');
    const { userLogin } = useContext(AuthContext);
    const { isActiveHandler } = useContext(IsActiveContext);
    const navigate = useNavigate();

    const authErrorHandler = (message) => {
        setErr(message);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const {
            email,
            password
        } = Object.fromEntries(new FormData(e.target));

        try {
            const authData = await authService.login(email, password);
            userLogin(authData);

            if (authData.code === 403) {
                authErrorHandler('Wrong email or password!')
                navigate('/login');
            } else {
                authErrorHandler('');
                navigate('/');
                isActiveHandler('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <header id="head" className="secondary" />
            <div className="container container-details">
                <div className="row">
                    <article className="col-xs-12 maincontent">
                        <header className="page-header">
                            <h1 className="page-title">Login</h1>
                        </header>
                        <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <h3 className="thin text-center">Login to your account</h3>
                                    <p className="text-center text-muted">
                                        Login or <Link to="/register">create an account</Link>
                                    </p>
                                    <hr />
                                    <form onSubmit={onSubmit}>
                                        <div className="top-margin">
                                            {err !== ''
                                                ? <div class="alert alert-danger" role="alert">
                                                    {err}
                                                </div>
                                                : ''
                                            }
                                            <label htmlFor="email">
                                                Email <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                placeholder="ivan@gmail.com"
                                            />
                                        </div>
                                        <div className="top-margin">
                                            <label htmlFor="password">
                                                Password <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                placeholder="******"
                                            />
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-lg-12 text-right">
                                                <input className="btn btn-action" type="submit" value="Login" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
}

export default Login;