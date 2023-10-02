import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:5000/api/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'authorization': typeof window !== 'undefined' ? (localStorage.getItem('authToken') ? 'Bearer ' + localStorage.getItem('authToken') : null) : null
  },
});
export default instance;