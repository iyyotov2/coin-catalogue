import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as authService from "../../services/authService";
import { IsActiveContext } from "../../contexts/IsActiveContext";
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
    const [err, setErr] = useState('');
    const { userLogin } = useContext(AuthContext);
    const { isActiveHandler } = useContext(IsActiveContext);
    const navigate = useNavigate();

    const authErrorHandler = (message) => {
        setErr(message);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');

        if (password !== confirmPassword) {
            authErrorHandler('Your password and confirmation password do not match');

            return;
        }

        try {
            const authData = await authService.register(email, password);
            userLogin(authData);

            if (authData.code === 403) {
                navigate('/login');
            } else {
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
                            <h1 className="page-title">Registration</h1>
                        </header>
                        <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <h3 className="thin text-center">Register a new account</h3>
                                    <p className="text-center text-muted">
                                        Already a member? <Link to="/login">Login</Link>
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
                                                Email Address <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                placeholder="ivan@gmail.com"
                                            />
                                        </div>
                                        <div className="row top-margin">
                                            <div className="col-sm-6">
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
                                            <div className="col-sm-6">
                                                <label htmlFor="confirm-password">
                                                    Confirm Password <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="confirm-password"
                                                    name="confirm-password"
                                                    placeholder="******"
                                                />
                                            </div>
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

export default Register;