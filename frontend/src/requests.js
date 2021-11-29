import axios from 'axios';

class Requests {

    getRecipiesRating() {
        return axios.get("https://cse412app.herokuapp.com/getRecipiesRatings")
        // return axios.get("http://127.0.0.1:5000/getRecipiesRatings")
    }

    getTopRecipies() {
        return axios.get("https://cse412app.herokuapp.com/getTopRecipies")
        // return axios.get("http://127.0.0.1:5000/getTopRecipies")
    }

    getHealthyRecipies() {
        return axios.get("https://cse412app.herokuapp.com/getHealthyRecipies")
        // return axios.get("http://127.0.0.1:5000/getHealthyRecipies")
    }

    getShortRecipies() {
        return axios.get("https://cse412app.herokuapp.com/getShortRecipies")
        // return axios.get("http://127.0.0.1:5000/getShortRecipies")
    }

    getEasyRecipies() {
        return axios.get("https://cse412app.herokuapp.com/getEasyRecipies")
        // return axios.get("http://127.0.0.1:5000/getEasyRecipies")
    }

    searchForRecipe(searchValue) {
        return axios.get("https://cse412app.herokuapp.com/searchForRecipies?searchValue=" + searchValue)
        // return axios.get("http://127.0.0.1:5000/searchForRecipies?searchValue=" + searchValue)
    }

    getRecipe(recipe_id) {
        return axios.get("https://cse412app.herokuapp.com/getRecipe?recipe_id=" + recipe_id)
        // return axios.get("http://127.0.0.1:5000/getRecipe?recipe_id=" + recipe_id)
    }

    userExists(username) {
        return axios.get("https://cse412app.herokuapp.com/userExists?username=" + username)
        // return axios.get("http://127.0.0.1:5000/userExists?username=" + username)
    }

    addUser(username, password) {
        return axios.post("https://cse412app.herokuapp.com/addUser?username=" + username + "&password=" + password)
        // return axios.post("http://127.0.0.1:5000/addUser?username=" + username + "&password=" + password)
    }

    createRecipe(data) {
        axios.post("https://cse412app.herokuapp.com/createRecipe", {recipeData : data})
        // axios.post("http://127.0.0.1:5000/createRecipe", {recipeData : data})
    }

    addRating(recipe_id, username, score) {
        return axios.post("https://cse412app.herokuapp.com/addRating?recipeID=" + recipe_id + "&username=" + username + "&score=" + score)
        // return axios.post("http://127.0.0.1:5000/addRating?recipeID=" + recipe_id + "&username=" + username + "&score=" + score)
    }

    deleteRecipe(recipe_id) {
        return axios.delete("https://cse412app.herokuapp.com/deleteRecipe?recipe_id=" + recipe_id)
        // return axios.delete("http://127.0.0.1:5000/deleteRecipe?recipe_id=" + recipe_id)
    }

}


export default new Requests();

