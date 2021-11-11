import React, {Component} from 'react'
import { useNavigate } from 'react-router-dom'

class HomepageWithNav extends Component {

    constructor(props) {
        super()

        this.handleLogin = this.handleLogin.bind(this)
        this.handleSignup = this.handleSignup.bind(this)
        this.handleCreateRecipe = this.handleCreateRecipe.bind(this)
        this.handleRecipe = this.handleRecipe.bind(this)
    }

    render() {
        return(
            <div>
                <button onClick={this.handleLogin}>Login</button>
                <button onClick={this.handleSignup}>Signup</button>
                <button onClick={this.handleCreateRecipe}>Create Recipe</button>
                <div onClick={this.handleRecipe}>Recipe 1</div>
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



}

function Homepage(props) {
    let navigate = useNavigate()
    return <HomepageWithNav {...props} navigate={navigate} />
}


export default Homepage