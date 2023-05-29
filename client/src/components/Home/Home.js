import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { IsActiveContext } from '../../contexts/IsActiveContext';
import { AuthContext } from '../../contexts/AuthContext';
import LastCoin from './LastCoin/LastCoin';

const Home = ({
    lastThreeCoins
}) => {
    const { user } = useContext(AuthContext);
    const { isActiveHandler } = useContext(IsActiveContext);

    return (
        <>
            <div id="head">
                <div className="container">
                    <div className="row">
                        <h1 className="lead">WELCOME TO OUR COIN CATALOG</h1>
                        <p>
                            {user.email
                                ? <Link className="btn btn-action btn-lg" to="/create" onClick={() => isActiveHandler('/create')}>ADD COIN</Link>
                                : <Link className="btn btn-action btn-lg" to="/login" onClick={() => isActiveHandler('/login')}>LOGIN / REGISTER</Link>
                            }
                        </p>
                    </div>
                </div>
            </div>
            <div className="container text-center">
                <br /> <br />
                <h2 className="thin">
                    Create your own account completely free of charge and participate in the development of the catalog.
                </h2>
            </div>
            <div className="jumbotron top-space">
                <div className="container">
                    {lastThreeCoins.length > 0
                        ? <>
                            <h3 className="text-center thin">Last uploaded</h3>
                            <div className="row">
                                {lastThreeCoins.map(x => <LastCoin key={x._id} coin={x} />)}
                            </div>
                        </>
                        : <h3 className="text-center thin">No coins uploaded yet</h3>
                    }
                </div>
            </div>
        </>
    );
}

export default Home;