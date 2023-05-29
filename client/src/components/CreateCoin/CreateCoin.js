import { useState, useContext } from 'react';

import * as coinService from '../../services/coinService';
import { CoinContext } from '../../contexts/CoinContext';

const CreateCoin = () => {
    const { addCoin } = useContext(CoinContext);
    const [values, setValues] = useState({
        title: '',
        year: '',
        value: '',
        imageUrl: '',
        country: '',
        weight: '',
        diameter: ''
    });

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const result = await coinService.create(values);

        addCoin(result);
    }

    return (
        <>
            <header id="head" className="secondary" />
            <div className="container">
                <div className="row">
                    <article className="col-xs-12 maincontent bottom-padding">
                        <header className="page-header">
                            <h1 className="page-title">Add Coin</h1>
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
                                                placeholder="Enter coin title..."
                                                value={values.title}
                                                onChange={changeHandler}
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
                                                value={values.year}
                                                onChange={changeHandler}
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
                                                value={values.value}
                                                onChange={changeHandler}
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
                                                value={values.imageUrl}
                                                onChange={changeHandler}
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
                                                value={values.country}
                                                onChange={changeHandler}
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
                                                value={values.weight}
                                                onChange={changeHandler}
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
                                                value={values.diameter}
                                                onChange={changeHandler}
                                                required
                                            />
                                        </div>
                                        <hr />
                                        <div className="row"> 
                                            <div className="col-lg-12 text-right">
                                                <input className="btn btn-action" type="submit" value="Add" />
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

export default CreateCoin;