import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.MODE !== 'development' ? 'https://twitter-rate.onrender.com/api/' : 'http://localhost:5001/api/',
});
