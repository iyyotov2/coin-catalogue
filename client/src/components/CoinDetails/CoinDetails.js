import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import * as coinService from '../../services/coinService';
import { AuthContext } from "../../contexts/AuthContext";
import DeleteCoin from '../DeleteCoin/DeleteCoinPopup/DeleteCoinPopup';

const CoinDetails = () => {
    const { user } = useContext(AuthContext);
    const { coinId } = useParams();
    const [coin, setCoin] = useState({});
    const [buttonPopup, setButtonPopup] = useState(false);

    useEffect(() => {
        async function getCoin () {
            const result = await coinService.getOne(coinId);

            setCoin(result);
        }

        try {
            getCoin();
        } catch (error) {
            console.log(error);
        }
    }, [coinId]);

    return (
        <>
            <header id="head" className="secondary" />
            <div className="container container-details">
                <ol className="breadcrumb">
                    <li><Link to="/catalog">Back to Catalog</Link></li>
                </ol>
                <div className="row">
                    <aside className="col-md-4 sidebar sidebar-left">
                        <img src={coin.imageUrl} alt="" />
                    </aside>
                    <article className="col-md-8 maincontent">
                        <header className="page-header">
                            <h2 className="page-title">Title: {coin.title}</h2>
                        </header>
                        <div className="bottom-padding">
                            <h3>Year: {coin.year}</h3>
                            <h3>Value: {coin.value}</h3>
                            <h3>Country: {coin.country}</h3>
                            <h3>Weight: {coin.weight}</h3>
                            <h3>Diameter: {coin.diameter}</h3>
                        </div>
                        {user._id === coin._ownerId
                            ? <>
                                <div className="h-body">
                                    <Link className="btn btn-action btn-lg" to={`/catalog/${coin._id}/edit`}>Edit</Link> <button className="btn btn-action btn-lg" onClick={() => setButtonPopup(true)}>Delete</button>
                                </div>
                            </>
                            : ''
                        }
                    </article>
                </div>
            </div>
            <DeleteCoin trigger={buttonPopup} setTrigger={setButtonPopup} coinId={coin._id} />
        </>
    );
}

export default CoinDetails;