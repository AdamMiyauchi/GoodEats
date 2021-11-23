import React, {Component} from 'react'
import { useNavigate } from 'react-router-dom'
import Requests from '../requests'
import { ToastContainer, Toast } from 'react-bootstrap'
import '../CSS/homepage.css'
import logo from '../Images/goodeatslogo.png'
import topicon from '../Images/toprecipiesicon.png'
import healthyicon from '../Images/healthyrecipiesicon.png'
import quickicon from '../Images/under30recipiesicon.png'
import easyicon from '../Images/easyrecipiesicon.png'
import emptystaricon from '../Images/emptystaricon.png'
import filledstaricon from '../Images/filledstaricon.png'
import difficultyoutline from '../Images/difficultyoutlineicon.png'
import difficultyfilled from '../Images/difficultyfilledicon.png'
import usericon from '../Images/usericon.png'
import noimage from '../Images/noimage.png'
import noresults from '../Images/noresults.png'

class HomepageWithNav extends Component {

    constructor(props) {
        super()

        this.state = {
            recipies : [],
            searchValue : "",
            showCreateRecipeLoginError : false,
            showToast : false,
            showNoResults : false,
            toastMsg : "",
            update : true
        }

        this.handleLogin = this.handleLogin.bind(this)
        this.handleSignup = this.handleSignup.bind(this)
        this.handleCreateRecipe = this.handleCreateRecipe.bind(this)
        this.handleRecipe = this.handleRecipe.bind(this)

        this.getRecipies = this.getRecipies.bind(this)

        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this)

        this.handleTopRecipies = this.handleTopRecipies.bind(this)
        this.handleHealthyRecipies = this.handleHealthyRecipies.bind(this)
        this.handleShortTimeRecipies = this.handleShortTimeRecipies.bind(this)
        this.handleEasyRecipies = this.handleEasyRecipies.bind(this)

        this.handleRecipeCard = this.handleRecipeCard.bind(this)
    }

    componentDidMount() {
        this.getRecipies()
    }

    componentDidUpdate(prevProps, prevState) {
        if (!equals(this.state.recipies, prevState.recipies) && this.state.update) {
            this.getRecipies()
        }
    }

    render() {
        return(
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <img src={logo} alt="logo" width="350" height="100" onClick={() => this.props.navigate("/")}/>
                    </div>
                    <div className="col mt-2">
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            {!sessionStorage.getItem("loggedIn") && <button onClick={this.handleLogin} className="btn btn-outline-dark">Login</button>}
                            {!sessionStorage.getItem("loggedIn") && <button onClick={this.handleSignup} className="btn btn-outline-dark">Signup</button>}
                            {sessionStorage.getItem("loggedIn") && 
                                <span>
                                    <img width="40" height="40" className="rounded-circle me-2" src={usericon} alt="" />
                                    Logged in as: <strong>{JSON.parse(sessionStorage.getItem("user"))}</strong>
                                </span>
                            }
                        </div>
                    </div>
                </div>

                <hr/>

                <div className="row mt-3">
                    <div className="col-4">
                        <div className="input-group">
                            <input className="form-control" type="text" 
                                   placeholder="Find recipe by name or ingredient" value = {this.state.searchValue}
                                   onChange={this.handleSearchChange} onKeyPress={this.handleSearchSubmit}/>
                            <button className="input-group-append btn btn-outline-dark" onClick={this.handleSearchSubmit}>Search</button>
                        </div>

                        <button onClick={this.handleCreateRecipe} className="btn btn-outline-dark mt-3">Create Recipe</button>
                        <br />
                        {this.state.showCreateRecipeLoginError && <small><strong className="text-danger">Login to create recipe</strong></small>}
                    </div>

                    <div className="col-8">
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <div className="text-center me-3 p-1 quickbuttons" onClick={this.handleTopRecipies}> 
                                <img width="85" height="85" className="rounded-circle" src={topicon} alt="top recipe" />
                                <div>Top Recipies</div>
                            </div>

                            <div className="text-center me-3 p-1 quickbuttons" onClick={this.handleHealthyRecipies}>
                                <img src={healthyicon} alt="healthy" width="85" height="85" className="rounded-circle"/>
                                <div>Healthy Recipies</div>
                            </div>

                            <div className="text-center me-3 p-1 quickbuttons" onClick={this.handleShortTimeRecipies}>
                                <img width="85" height="85" src={quickicon} alt="timer icon" />
                                <div>Under 30 Minutes</div>
                            </div>

                            <div className="text-center me-3 p-1 quickbuttons" onClick={this.handleEasyRecipies}> 
                                <img width="85" height="85" src={easyicon} alt="easy to cook" />
                                <div>Easy To Make</div>
                            </div>
                        </div>
                    </div>

                </div>
                
                <hr />

                <div className="row">
                    {this.state.recipies.map( recipe => 
                        <div className="col-lg-4 mt-2 mb-4" key={recipe.recipe_id} >
                            <div className="card box recipeCard" style={{width: "18rem"}} recipe_id={recipe.recipe_id} onClick={this.handleRecipeCard}>
                                <img src={recipe.image} alt="" onError={(e) => {e.target.onerror = null; e.target.src = noimage}} className="card-img-top" recipe_id={recipe.recipe_id}/>
                                <div className="card-body" recipe_id={recipe.recipe_id}>
                                    <h4 className="card-title text-capitalize" recipe_id={recipe.recipe_id}>{recipe.recipe_name}</h4>
                                </div>
                                <ul className="list-group list-group-flush" recipe_id={recipe.recipe_id}>
                                    <li className="list-group-item" recipe_id={recipe.recipe_id}><span recipe_id={recipe.recipe_id}><strong className="me-2" recipe_id={recipe.recipe_id}>
                                        Rating: 
                                        </strong>
                                            {(recipe.rating !== null) && 
                                                [...Array(recipe.rating)].map((e, i) => <img className="m-1" width="17" height="17" src={filledstaricon} key={i} alt="" />)
                                            }
                                            {recipe.rating !== null && 
                                                [...Array(5 - recipe.rating)].map((e, i) => <img className="m-1" width="17" height="17" src={emptystaricon} key={i} alt="" />)
                                            }
                                            {recipe.rating === null && 
                                                [...Array(5)].map((e, i) => <img className="m-1" width="17" height="17" src={emptystaricon} key={i} alt="" />)
                                            }
                                        </span>
                                    </li>
                                    <li className="list-group-item" recipe_id={recipe.recipe_id}><span recipe_id={recipe.recipe_id}><strong recipe_id={recipe.recipe_id}>Prep Time:</strong> {recipe.prep_time} Minutes</span></li>
                                    <li className="list-group-item" recipe_id={recipe.recipe_id}><span recipe_id={recipe.recipe_id}><strong recipe_id={recipe.recipe_id}>
                                        Difficulty:
                                        </strong>
                                            {[...Array(recipe.difficulty)].map((e, i) => <img className="m-1" width="17" height="17" src={difficultyfilled} key={i} alt="" />)}
                                            {[...Array(5 - recipe.difficulty)].map((e, i) => <img className="m-1" width="17" height="17" src={difficultyoutline} key={i} alt="" />)}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {
                    this.state.showNoResults && 
                    <div>
                        <div className="d-flex justify-content-center mt-5">
                            <img width="125" height="125" src={noresults} alt="" />
                        </div>
                        <div className="d-flex justify-content-center mt-5">
                            <h2 className="">No results found</h2>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p>Try adjusting your search or filter to find the recipe your looking for.</p>
                        </div>
                    </div>
                }

                <ToastContainer position='bottom-end' className="mb-5 position-fixed">
                    <Toast show={this.state.showToast} onClose={() => this.setState({showToast : false})} delay={5000} autohide>
                        <Toast.Header>
                            <strong>Filter:</strong>
                        </Toast.Header>
                        <Toast.Body>
                            {this.state.toastMsg}
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
                

            </div>
        )
    }

    handleLogin() {
        this.props.navigate("/login")
    }

    handleSignup() {
        this.props.navigate("/signup")
    }

    handleCreateRecipe() {
        if (sessionStorage.getItem("loggedIn")) {
            this.props.navigate("/createRecipe")
        }
        else {
            this.setState({showCreateRecipeLoginError : true})
        }
    }

    handleRecipe() {
        this.props.navigate("/recipe")
    }

    getRecipies() {
        Requests.getRecipiesRating()
            .then( (res) => {
                if (res.data.length === 0) {
                    this.setState({ recipies : res.data, showNoResults : true })
                }
                else {
                    this.setState({ recipies : res.data, showNoResults : false })
                }
            })
    }

    handleSearchChange(event) {
        if (event.key !== 'Enter') {
            this.setState({searchValue : event.target.value})
        }

    }
    handleSearchSubmit(event) {
        if (event.key === 'Enter' || event.type === 'click') {
            Requests.searchForRecipe(this.state.searchValue)
                .then( (res) => {
                    if (res.data.length === 0) {
                        this.setState({ recipies : res.data, showNoResults : true, update : false})
                    }
                    else {
                        this.setState({ recipies : res.data, showNoResults : false, update : false})
                    }
                })
        }
    }

    handleTopRecipies() {
        Requests.getTopRecipies()
            .then( (res) => {
                if (res.data.length === 0) {
                    this.setState({ recipies : res.data, showNoResults : true, update : false,
                                    showToast : true, toastMsg : "Recipies sorted by rating"})
                }
                else {
                    this.setState({ recipies : res.data, showNoResults : false, update : false,
                                    showToast : true, toastMsg : "Recipies sorted by rating"})
                }
            })
    }
    handleHealthyRecipies() {
        Requests.getHealthyRecipies()
            .then( (res) => {
                if (res.data.length === 0) {
                    this.setState({ recipies : res.data, showNoResults : true, update : false,
                                    showToast : true, toastMsg : "Showing only healthy recipies"})
                }
                else {
                    this.setState({ recipies : res.data, showNoResults : false, update : false,
                                    showToast : true, toastMsg : "Showing only healthy recipies"})
                }
            })
    }
    handleShortTimeRecipies() {
        Requests.getShortRecipies()
            .then( (res) => {
                if (res.data.length === 0) {
                    this.setState({ recipies : res.data, showNoResults : true, update : false,
                                    showToast : true, toastMsg : "Recipies sorted by prep-time"})
                }
                else {
                    this.setState({ recipies : res.data, showNoResults : false, update : false,
                                    showToast : true, toastMsg : "Recipies sorted by prep-time"})
                }
            })
    }
    handleEasyRecipies() {
        Requests.getEasyRecipies()
            .then( (res) => {
                if (res.data.length === 0) {
                    this.setState({ recipies : res.data, showNoResults : true, showToast : true, toastMsg : "Recipies sorted by difficulty"})
                }
                else {
                    this.setState({ recipies : res.data, showNoResults : false, showToast : true, toastMsg : "Recipies sorted by difficulty"})
                }
            })
    }

    handleRecipeCard(event, data) {
        this.props.navigate("/recipe/" + event.target.getAttribute("recipe_id")) 
    }

}

const equals = (a, b) => {
    if (a === b) return true;
  
    if (a instanceof Date && b instanceof Date)
      return a.getTime() === b.getTime();
  
    if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
      return a === b;
  
    if (a.prototype !== b.prototype) return false;
  
    const keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;
  
    return keys.every(k => equals(a[k], b[k]));
  };


function Homepage(props) {
    let navigate = useNavigate()
    return <HomepageWithNav {...props} navigate={navigate} />
}


export default Homepage