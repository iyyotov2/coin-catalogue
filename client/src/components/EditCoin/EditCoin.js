import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import * as coinService from '../../services/coinService';
import { CoinContext } from "../../contexts/CoinContext";

const EditCoin = () => {
    const { editCoin } = useContext(CoinContext);
    const { coinId } = useParams();
    const [currentCoin, setCurrentCoin] = useState({});

    useEffect(() => {
        async function fetchData () {
            const coinData = await coinService.getOne(coinId);

            setCurrentCoin(coinData);
        }

        try {
            fetchData();
        } catch (err) {
            console.log(err);
        }
    }, [coinId]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const coinData = Object.fromEntries(new FormData(e.target));

        const result = await coinService.edit(coinId, coinData);

        editCoin(coinId, result);
    }

    return (
        <>
            <header id="head" className="secondary" />
            <div className="container">
                <div className="row">
                    <article className="col-xs-12 maincontent bottom-padding">
                        <header className="page-header">
                            <h1 className="page-title">Edit Coin</h1>
                        </header>
                        <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <p className="text-center text-muted">All fields are required</p>
                                    <form onSubmit={onSubmit}>
                                        <div className="top-margin">
                                            <label htmlFor="title">
                                                Coin Title <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="title"
                                                name="title"
                                                defaultValue={currentCoin.title}
                                                required
                                            />
                                        </div>
                                        <div className="top-margin">
                                            <label htmlFor="year">
                                                Coin Year <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="year"
                                                name="year"
                                                placeholder="Enter coin year..."
                                                defaultValue={currentCoin.year}
                                                required
                                            />
                                        </div>
                                        <div className="top-margin">
                                            <label htmlFor="value">
                                                Coin Value <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="value"
                                                name="value"
                                                placeholder="Enter coin value..."
                                                defaultValue={currentCoin.value}
                                                required
                                            />
                                        </div>
                                        <div className="top-margin">
                                            <label htmlFor="imageUrl">
                                                Coin Image <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="imageUrl"
                                                name="imageUrl"
                                                placeholder="Upload a photo..."
                                                defaultValue={currentCoin.imageUrl}
                                                required
                                            />
                                        </div>
                                        <div className="top-margin">
                                            <label htmlFor="country">
                                                Coin Country <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="country"
                                                name="country"
                                                placeholder="Enter coin country..."
                                                defaultValue={currentCoin.country}
                                                required
                                            />
                                        </div>
                                        <div className="top-margin">
                                            <label htmlFor="weight">
                                                Coin Weight <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="weight"
                                                name="weight"
                                                placeholder="Enter coin weight..."
                                                defaultValue={currentCoin.weight}
                                                required
                                            />
                                        </div>
                                        <div className="top-margin">
                                            <label htmlFor="diameter">
                                                Coin Diameter <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="diameter"
                                                name="diameter"
                                                placeholder="Enter coin diameter..."
                                                defaultValue={currentCoin.diameter}
                                                required
                                            />
                                        </div>
                                        <hr />
                                        <div className="row"> 
                                            <div className="col-lg-12 text-right">
                                                <Link className="btn btn-danger" to={`/catalog/${currentCoin._id}`}>Cancel</Link> <input className="btn btn-success" type="submit" value="Edit" />
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

export default EditCoin;