import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import * as coinService from "./services/coinService"
import { IsActiveContext } from "./contexts/IsActiveContext";
import { AuthContext } from "./contexts/AuthContext";
import { CoinContext } from "./contexts/CoinContext"
import { useLocalStorage } from "./hooks/useLocalStorage";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';
import Catalog from './components/Catalog/Catalog';
import CoinDetails from './components/CoinDetails/CoinDetails';
import CreateCoin from './components/CreateCoin/CreateCoin';
import EditCoin from './components/EditCoin/EditCoin';
import DeleteCoin from './components/DeleteCoin/DeleteCoin';
import NotFoundPage from './components/404/404';
import './App.css';

function App() {
    const [isActive, setIsActive] = useState(window.location.pathname);
    const [auth, setAuth] = useLocalStorage('auth', {});
    const [coins, setCoins] = useState([]);
    const navigate = useNavigate();

    const isActiveHandler = (pathname) => {
        setIsActive(state => state = pathname);
    }

    const userLogin = (authData) => {
        setAuth(authData);
    }

    const userLogout = () => {
        setAuth({});
    }

    const addCoin = (coinData) => {
        setCoins(state => [
            ...state,
            coinData
        ]);

        navigate('/catalog');
        isActiveHandler('/catalog');
    }

    const editCoin = (coinId, coinData) => {
        setCoins(state => state.map(x => x._id === coinId ? coinData : x));

        navigate(`/catalog/${coinId}`);
        isActiveHandler('/catalog');
    }

    const deleteCoin = (coinId) => {
        const coin = coins.filter(x => x._id === coinId)[0];
        const idx = coins.indexOf(coin);

        coins.splice(idx, 1);

        setCoins(state => state = coins);

        navigate('/catalog');
        isActiveHandler('/catalog');
    }

    useEffect(() => {
        async function getCoins() {
            const allCoins = await coinService.getAll();

            setCoins(allCoins);
        }

        try {
            getCoins();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <IsActiveContext.Provider value={{ isActive, isActiveHandler }}>
            <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
                <div>
                    <Header />
                    <CoinContext.Provider value={{ addCoin, editCoin, deleteCoin }}>
                        <Routes>
                            <Route path="/" element={<Home lastThreeCoins={Array.isArray(coins) ? coins.slice(-3) : []} />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/catalog" element={<Catalog coins={coins} />} />
                            <Route path="/catalog/:coinId" element={<CoinDetails />} />
                            <Route path="/catalog/:coinId/edit" element={<EditCoin />} />
                            <Route path="/catalog/:coinId/delete" element={<DeleteCoin />} />
                            <Route path="/create" element={<CreateCoin />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </CoinContext.Provider>
                    <Footer />
                </div>
            </AuthContext.Provider>
        </IsActiveContext.Provider>
    );
}

export default App;