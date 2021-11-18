import React, {Component} from 'react'
import { useNavigate } from 'react-router-dom'
import Requests from '../requests'

class HomepageWithNav extends Component {

    constructor(props) {
        super()

        this.state = {
            recipies : [],
            searchValue : ""
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

    render() {
        return(
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <img src="https://goodeats.io/logo_v2.png" alt="logo" width="350" height="100"/>
                    </div>
                    <div className="col mt-2">
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button onClick={this.handleLogin} className="btn btn-outline-dark">Login</button>
                            <button onClick={this.handleSignup} className="btn btn-outline-dark">Signup</button>
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
                            <span className="input-group-text" onClick={this.handleSearchSubmit}>Search</span>
                        </div>

                        <button onClick={this.handleCreateRecipe} className="btn btn-outline-dark mt-3">Create Recipe</button>
                    </div>

                    <div className="col-8">
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <div className="text-center me-3" onClick={this.handleTopRecipies}> 
                                <img width="85" height="85" className="rounded-circle" src="data:image/png;base64,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" alt="top recipe" />
                                <div>Top Recipies</div>
                            </div>

                            <div className="text-center me-3" onClick={this.handleHealthyRecipies}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb7LEHrJ8K9TwjXMDUOWZQXqtyeCIbr2zFPg&usqp=CAU" alt="healthy" width="85" height="85" className="rounded-circle"/>
                                <div>Healthy Recipies</div>
                            </div>

                            <div className="text-center me-3" onClick={this.handleShortTimeRecipies}>
                                <img width="85" height="85" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ8aoS0PmbKk14LCxIyXYsgvMeuybin6OC_w&usqp=CAU" alt="timer icon" />
                                <div>Under 30 Minutes</div>
                            </div>

                            <div className="text-center me-3" onClick={this.handleEasyRecipies}> 
                                <img width="85" height="85" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb8ucQeilNLophp-ayiTqIXQgBpt5z_z0-qQ&usqp=CAU" alt="easy to cook" />
                                <div>Easy To Make</div>
                            </div>
                        </div>
                    </div>

                </div>
                
                <hr />

                <div className="row">
                    {this.state.recipies.map( recipe => 
                        <div className="col-lg-4 mt-2 mb-4" key={recipe.recipe_id} >
                            <div className="card box" style={{width: "18rem"}} recipe_id={recipe.recipe_id} onClick={this.handleRecipeCard}>
                                <img src={recipe.image} alt="" className="card-img-top" recipe_id={recipe.recipe_id}/>
                                <div className="card-body" recipe_id={recipe.recipe_id}>
                                    <h4 className="card-title text-capitalize" recipe_id={recipe.recipe_id}>{recipe.recipe_name}</h4>
                                </div>
                                <ul className="list-group list-group-flush" recipe_id={recipe.recipe_id}>
                                    <li className="list-group-item" recipe_id={recipe.recipe_id}><span recipe_id={recipe.recipe_id}><strong recipe_id={recipe.recipe_id}>Rating:</strong> {recipe.rating}/5</span></li>
                                    <li className="list-group-item" recipe_id={recipe.recipe_id}><span recipe_id={recipe.recipe_id}><strong recipe_id={recipe.recipe_id}>Prep Time:</strong> {recipe.prep_time} Minutes</span></li>
                                    <li className="list-group-item" recipe_id={recipe.recipe_id}><span recipe_id={recipe.recipe_id}><strong recipe_id={recipe.recipe_id}>Difficulty:</strong> {recipe.difficulty}/5</span></li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

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
        this.props.navigate("/createRecipe")
    }

    handleRecipe() {
        this.props.navigate("/recipe")
    }

    getRecipies() {
        Requests.getRecipiesRating()
            .then( (res) => {
                this.setState({ recipies : res.data })
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
                    this.setState({ recipies : res.data })
                })
        }
    }

    handleTopRecipies() {
        Requests.getTopRecipies()
            .then( (res) => {
                this.setState({ recipies : res.data })
            })
    }
    handleHealthyRecipies() {
        Requests.getHealthyRecipies()
            .then( (res) => {
                this.setState({ recipies : res.data })
            })
    }
    handleShortTimeRecipies() {
        Requests.getShortRecipies()
            .then( (res) => {
                this.setState({ recipies : res.data })
            })
    }
    handleEasyRecipies() {
        Requests.getEasyRecipies()
            .then( (res) => {
                this.setState({ recipies : res.data })
            })
    }

    handleRecipeCard(event, data) {
        this.props.navigate("/recipe/" + event.target.getAttribute("recipe_id")) 
    }

}

function Homepage(props) {
    let navigate = useNavigate()
    return <HomepageWithNav {...props} navigate={navigate} />
}


export default Homepage