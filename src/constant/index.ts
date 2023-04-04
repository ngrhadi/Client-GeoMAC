import axios from 'axios';

const configurations = {
  SERVER_GEO: process.env.NEXT_PUBLIC_API,
};

export const API = axios.create({
  baseURL: configurations.SERVER_GEO,
});
