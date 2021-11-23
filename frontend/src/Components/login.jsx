import React, {Component} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Requests from '../requests.js'
import logo from '../Images/goodeatslogo.png'

class LoginWithNav extends Component {

    constructor(props) {
        super()

        this.state = {
            username : "",
            password : "",
            emptyFields : false,
            wrongCredentials : false
        }

        this.handleLogo = this.handleLogo.bind(this)
        this.handleUsername = this.handleUsername.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    render() {
        return(
            <div className="container">
                <div className="row mt-4">
                    <div className="col">
                        <img onClick={this.handleLogo} src={logo} alt="logo" width="350" height="100"/>
                    </div>
                </div>

                <form>
                    <h1 className="text-center display-4">Log In</h1>
                    <h5 className="text-center">Sign Up <Link to="/signup">here</Link></h5>

                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor="usernameInput">Username:</label>
                                <input onChange={this.handleUsername} value={this.state.username}
                                       className="form-control" type="text" placeholder="Enter username" id="usernameInput" autoComplete="off" />
                            </div>
                        </div>
                        <div className="col-4"></div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor="passwordInput">Password:</label>
                                <input onChange={this.handlePassword} value={this.state.password}
                                       className="form-control" type="password" placeholder="Enter Password" id="passwordInput" autoComplete="off" />
                            </div>
                        </div>
                        <div className="col-4"></div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <div className="form-group">
                                <button onClick={this.handleLogin} className="btn btn-outline-dark w-100">Login</button>
                                {this.state.emptyFields && <strong><p className="text-danger mt-2 text-center">All fields are required</p></strong>}
                                {this.state.wrongCredentials && <strong><p className="text-danger mt-2 text-center">User already exists</p></strong>}
                            </div>
                        </div>
                        <div className="col-4"></div>
                    </div>

                </form>
            </div>
        )
    }

    handleLogo() {
        this.props.navigate("/")
    }

    handleUsername(event) {
        this.setState({username : event.target.value.trim()})
    }
    handlePassword(event) {
        this.setState({password : event.target.value.trim()})
    }
    handleLogin(event) {
        event.preventDefault()
        if (this.state.username === "" || this.state.password === "") {
            this.setState({emptyFields : true})
        }
        Requests.userExists(this.state.username)
            .then( (res) => {
                if (res.data.valid === false) {
                    this.setState({wrongCredentials : true})
                }
                else if (res.data.password !== this.state.password) {
                    this.setState({wrongCredentials : true})
                }
                else {
                    sessionStorage.setItem('loggedIn', JSON.stringify(true))
                    sessionStorage.setItem('user', JSON.stringify(this.state.username))
                    this.props.navigate("/")
                }
            })
    }

}


function Login(props) {
    let navigate = useNavigate()
    return <LoginWithNav {...props} navigate={navigate} />
}

export default Login



