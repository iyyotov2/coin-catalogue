import { useContext } from 'react';
import { Link } from "react-router-dom";

import { IsActiveContext } from '../../contexts/IsActiveContext';
import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
    const { user } = useContext(AuthContext);
    const { isActive, isActiveHandler } = useContext(IsActiveContext);

    return (
        <header className="navbar navbar-inverse navbar-fixed-top headroom">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
                    <Link className="navbar-brand" to="/" onClick={() => isActiveHandler('/')}><p>Coin Catalog</p></Link>
                </div>
                <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav pull-right">
                        <li className={isActive.toLowerCase() === '/' ? 'active' : ''}><Link to="/" onClick={() => isActiveHandler('/')}>Home</Link></li>
                        <li className={isActive.toLowerCase().startsWith('/catalog') ? 'active' : ''}><Link to="/catalog" onClick={() => isActiveHandler('/catalog')}>All Coins</Link></li>
                        {/* <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li> */}
                        {user.email
                            ? <>
                                <li className={isActive.toLowerCase() === '/create' ? 'active' : ''}><Link to="/create" onClick={() => isActiveHandler('/create')}>Add Coin</Link></li>
                                <li><Link to="/logout">Logout</Link></li>
                            </>
                            :  <li className={isActive.toLowerCase() === '/login' ? 'active' : ''}><Link to="/login" onClick={() => isActiveHandler('/login')}>LOGIN / REGISTER</Link></li>
                        }
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;