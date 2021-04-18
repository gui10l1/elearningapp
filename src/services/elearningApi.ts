import axios from 'axios';

const elearningApi = axios.create({
  baseURL: 'http://10.0.2.2:3333/',
});

export default elearningApi;
