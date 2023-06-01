import axios from 'axios';

//criando uma const que configura a rota da
const api = axios.create({
  baseURL: 'http://192.168.43.184:3030',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;