import React from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import Requests from '../requests.js'
import '../CSS/recipe.css'
import logo from '../Images/goodeatslogo.png'
import emptystaricon from '../Images/emptystaricon.png'
import filledstaricon from '../Images/filledstaricon.png'
import difficultyoutline from '../Images/difficultyoutlineicon.png'
import difficultyfilled from '../Images/difficultyfilledicon.png'
import usericon from '../Images/usericon.png'
import { Modal, Button } from 'react-bootstrap'
import noimage from '../Images/noimage.png'
import equipmenticon from '../Images/equipmenticon.png'
import ingredienticon from '../Images/ingredienticon.png'
import stepicon from '../Images/stepicon.png'

function RecipeWithNav(props) {
    const [recipe_id] = React.useState(useParams().recipe_id)
    const [recipeInfo, setRecipeInfo] = React.useState("")
    const [showAddRatingLoginError, setShowAddRatingLoginError] = React.useState(false)
    const [showRatingPopup, setShowRatingPopup] = React.useState(false)

    // On mount
    React.useEffect(() => {
        Requests.getRecipe(recipe_id)
            .then( (res) => {
                setRecipeInfo(res.data)
            })
    }, [])

    // On change
    React.useEffect(() => {
        Requests.getRecipe(recipe_id)
            .then( (res) => {
                setRecipeInfo(res.data)
            })
    }, [recipe_id])

    return (
        <>
            {recipeInfo && recipeInfo.recipeInfo && <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <img src={logo} alt="logo" width="350" height="100" onClick={() => props.navigate("/")}/>
                    </div>

                    <div className="col mt-2">
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            {!sessionStorage.getItem("loggedIn") && <button onClick={() => props.navigate('/login')} className="btn btn-outline-dark">Login</button>}
                            {!sessionStorage.getItem("loggedIn") && <button onClick={() => props.navigate('/signup')} className="btn btn-outline-dark">Signup</button>}
                            {sessionStorage.getItem("loggedIn") && 
                                <span>
                                    <img width="40" height="40" className="rounded-circle me-2" src={usericon} alt="" />
                                    Logged in as: <strong>{JSON.parse(sessionStorage.getItem("user"))}</strong>
                                </span>
                            }
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col">
                        <h4 className="display-4 text-capitalize">{recipeInfo.recipeInfo.recipe_name}</h4>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <span>
                            <img width="40" height="40" className="rounded-circle me-2" src={usericon} alt="" />
                            <strong>Created By: </strong> {recipeInfo.createdBy}
                        </span>
                    </div>
                </div>

                <div className="row">
                    <div className="col mb-3">
                        {("rating" in recipeInfo) && [...Array(recipeInfo.rating)].map((e, i) => <img className="m-1" width="22" height="22" src={filledstaricon} key={i} alt="" />)}
                        {(("rating" in recipeInfo) && 
                            [...Array(5 - recipeInfo.rating)].map((e, i) => <img className="m-1" width="22" height="22" src={emptystaricon} key={i} alt="" />))
                            ||
                            [...Array(5)].map((e, i) => <img className="m-1" width="22" height="22" src={emptystaricon} key={i} alt="" />)
                        }
                        <span className="me-2">{(("numRatings" in recipeInfo) && recipeInfo.numRatings) || 0} Rating</span>
                        <button className="btn btn-sm btn-outline-dark me-2" onClick={handleAddRating}>Add Rating</button>
                        {showAddRatingLoginError && <small><strong className="text-danger">Login to rate recipe</strong></small>}
                        
                        <AddRatingPopup
                            show={showRatingPopup}
                            onHide={() => setShowRatingPopup(false)}
                            recipeID={recipeInfo.recipeInfo.recipe_id}
                            refresh={() => handleRefresh(recipe_id)}
                        />
                    </div>
                    
                    {sessionStorage.getItem("loggedIn") && (JSON.parse(sessionStorage.getItem("user")) === recipeInfo.createdBy)  && 
                    <div className="col d-flex flex-row-reverse mb-3">
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleEdit(recipeInfo.recipeInfo.recipe_id)}>Edit</button>
                        <button className="btn btn-outline-danger btn-sm me-2" onClick={() => handleDelete(recipeInfo.recipeInfo.recipe_id)}>Delete</button>
                    </div>
                    }
                    <hr />
                </div>

                <div className="row">
                    <div className="col-auto">
                        <img className="border border-dark rounded img-fluid maxImgSize" src={recipeInfo.recipeInfo.image} onError={(e) => {e.target.onerror = null; e.target.src = noimage}} alt="" />
                    </div>

                    <div className="col-auto">
                        <div className="border rounded p-2">
                            <strong>Total Time: </strong>
                            <p>{recipeInfo.recipeInfo.prep_time} Minutes</p>

                            <div className="mb-3">
                                <strong>Difficulty: </strong>
                                <br />
                                {[...Array(recipeInfo.recipeInfo.difficulty)].map((e, i) => <img className="m-1" width="15" height="15" src={difficultyfilled} key={i} alt="" />)}
                                {[...Array(5 - recipeInfo.recipeInfo.difficulty)].map((e, i) => <img className="m-1" width="15" height="15" src={difficultyoutline} key={i} alt="" />)}
                            </div>
                            
                            <strong>Category: </strong>
                            <p className="text-capitalize">{recipeInfo.recipeInfo.category}</p>

                            <strong>Healthy: </strong>
                            {recipeInfo.recipeInfo.healthy && <p>Yes</p>}{!recipeInfo.recipeInfo.healthy && <p>No</p>}
                        </div>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <h3>Ingredients: </h3>
                    {recipeInfo.ingredients.map((ingredient, index) => 
                        <li className="text-capitalize list-group-item border-0" key={index}>
                            <img src={ingredienticon} alt="" width="25" height="25" className="me-2"/>
                            <strong>{index + 1}:  </strong>
                            {ingredient.ingredient_name} {(ingredient.amount !== 0) ? ingredient.amount : ""} {ingredient.unit} 
                        </li>
                    )}
                </div>

                <hr />

                <div className="row">
                    <h3>Directions: </h3>
                    {recipeInfo.recipeInfo.directions.map((step, index) =>
                        <li className="list-group-item border-0" key={index}>
                            <img className="me-2" width="22" height="22" src={stepicon} alt="" />
                            <strong>Step {index + 1}:</strong>
                            <br />
                            <p className="mt-2 mx-3">{step.charAt(0).toUpperCase() + step.slice(1)}</p>
                        </li>
                    )}
                </div>

                <hr />

                <div className="row pb-5">
                    <h3>Required Equipment: </h3>
                    {recipeInfo.equipment.map((equipment, index) => 
                        <li className="text-capitalize list-group-item border-0" key={equipment.tool_name}>
                            <img src={equipmenticon} alt="" width="25" height="25" className="me-2"/>
                            <strong>{index + 1}:  </strong>
                            {equipment.tool_name}
                        </li>
                    )}
                </div>
            </div>}
        </>
    )

    function handleAddRating() {
        if (!sessionStorage.getItem("loggedIn")) {
            setShowAddRatingLoginError(true)
        }
        else {
            setShowRatingPopup(true)
        }
    }

    function handleDelete(recipe_id) {
        Requests.deleteRecipe(recipe_id)
        props.navigate("/")
    }

    function handleEdit(recipe_id) {
        sessionStorage.setItem("recipe_id", recipe_id)
        props.navigate("/editRecipe")
    }

    function handleRefresh(recipe_id) {
        Requests.getRecipe(recipe_id)
            .then( (res) => {
                setRecipeInfo(res.data)
            })
    }
}



function AddRatingPopup(props) {
    const [rating, setRating] = React.useState("1")
    const [showError, setError] = React.useState(false)

    function handleAdd() {
        Requests.addRating(props.recipeID, JSON.parse(sessionStorage.getItem('user')), rating)
            .then( (res) => {
                props.refresh(props.recipeID)
                props.onHide()
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 400) {
                        setError(true)
                    }
                }
            })
    }

    function handleChange(event) {
        setRating(event.target.value)
    }

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered size="sm">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Rate Recipe
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Rating:</h5>
                <div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" value="1" id="oneStar" name="rating" onChange={handleChange} checked={rating==="1"}/>
                        <label for="oneStar">1</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" value="2" id="twoStar" name="rating" onChange={handleChange} checked={rating==="2"}/>
                        <label for="twoStar">2</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" value="3" id="threeStar" name="rating" onChange={handleChange} checked={rating==="3"}/>
                        <label for="threeStar">3</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" value="4" id="fourStar" name="rating" onChange={handleChange} checked={rating==="4"}/>
                        <label for="fourStar">4</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" value="5" id="fiveStar" name="rating" onChange={handleChange} checked={rating==="5"}/>
                        <label for="fiveStar">5</label>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleAdd}>Add Rating</Button>
                {showError && <small><strong className="text-danger">Recipe already rated</strong></small>}
            </Modal.Footer>
        </Modal>
    );
  }







export default function Recipe(props) {
    let navigate = useNavigate()
    return <RecipeWithNav {...props} navigate={navigate} />
}



