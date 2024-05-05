import axios from 'axios';

const instance = axios.create({
    baseURL:'http://127.0.0.1:5001/woodzone-12dca/us-central1/api'         //url of an api{Cloud function}
})
//http://127.0.0.1:5001/woodzone-12dca/us-central1/api
//http://127.0.0.1:5001/woodzone-12dca/us-central1/api
export default instance;