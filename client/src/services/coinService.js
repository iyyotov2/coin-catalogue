import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/coins';

export const getAll = () => request.get(baseUrl);

export const getOne = (coinId) => request.get(`${baseUrl}/${coinId}`);

export const create = (coinData) => request.post(baseUrl, coinData);

export const edit = (coinId, coinData) => request.put(`${baseUrl}/${coinId}`, coinData);

export const remove = (coinId) => request.del(`${baseUrl}/${coinId}`);