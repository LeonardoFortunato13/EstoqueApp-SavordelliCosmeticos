import axios from 'axios';

//criando uma const que configura a rota da
const api = axios.create({
  baseURL: 'http://18.231.16.235:3030',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;