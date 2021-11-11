import axios from 'axios';

class Requests {

    getTest() {
        return axios.get("https://cse412app.herokuapp.com/test")
        // return axios.get("http://127.0.0.1:5000/test")
    }



}


export default new Requests();

