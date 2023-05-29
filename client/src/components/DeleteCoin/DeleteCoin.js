import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import * as coinService from '../../services/coinService';
import { CoinContext } from "../../contexts/CoinContext";

const DeleteCoin = () => {
    const { deleteCoin } = useContext(CoinContext);
    const { coinId } = useParams();

    useEffect(() => {
        async function fetchData () {
            await coinService.remove(coinId);

            deleteCoin(coinId);
        }

        try {
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [coinId, deleteCoin]);

    return null;
}

export default DeleteCoin;