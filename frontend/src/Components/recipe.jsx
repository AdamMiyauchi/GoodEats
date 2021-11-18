import React from 'react'
import { useParams } from 'react-router'
import Requests from '../requests.js'
import '../CSS/recipe.css'

export default function Recipe(props) {
    const [recipe_id] = React.useState(useParams().recipe_id)
    const [recipeInfo, setRecipeInfo] = React.useState("")

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
            {console.log(recipeInfo)}
            {recipeInfo && recipeInfo.recipeInfo && <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <img src="https://goodeats.io/logo_v2.png" alt="logo" width="270" height="80"/>
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
                            <img width="40" height="40" className="rounded-circle me-2" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
                            <strong>Created By: </strong> {recipeInfo.createdBy}
                        </span>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        {("rating" in recipeInfo) && [...Array(recipeInfo.rating)].map((e, i) => <img className="m-1" width="22" height="22" src="https://cdn-icons.flaticon.com/png/512/2377/premium/2377810.png?token=exp=1637115026~hmac=088157ebc1b2d952b94cef672a7d0fb1" key={i} alt="" />)}
                        {(("rating" in recipeInfo) && 
                            [...Array(5 - recipeInfo.rating)].map((e, i) => <img className="m-1" width="22" height="22" src="https://cdn-icons.flaticon.com/png/512/2377/premium/2377878.png?token=exp=1637115029~hmac=0e3c9f32c957e01f8a1d10bac0813f40" key={i} alt="" />))
                            ||
                            [...Array(5)].map((e, i) => <img className="m-1" width="22" height="22" src="https://cdn-icons.flaticon.com/png/512/2377/premium/2377878.png?token=exp=1637115029~hmac=0e3c9f32c957e01f8a1d10bac0813f40" key={i} alt="" />)
                        }
                        <span className="me-2">{(("numRatings" in recipeInfo) && recipeInfo.numRatings) || 0} Rating</span>
                        <button className="btn btn-sm btn-outline-dark">Add Rating</button>
                        <hr />
                    </div>
                    
                </div>

                <div className="row">
                    <div className="col-auto">
                        <img className="border border-dark rounded img-fluid maxImgSize" src={recipeInfo.recipeInfo.image} alt="" />
                    </div>

                    <div className="col-auto">
                        <div className="border rounded p-2">
                            <strong>Total Time: </strong>
                            <p>{recipeInfo.recipeInfo.prep_time} Minutes</p>

                            <div className="mb-3">
                                <strong>Difficulty: </strong>
                                <br />
                                {[...Array(recipeInfo.recipeInfo.difficulty)].map((e, i) => <img className="m-1" width="15" height="15" src="https://cdn-icons.flaticon.com/png/512/2377/premium/2377810.png?token=exp=1637115026~hmac=088157ebc1b2d952b94cef672a7d0fb1" key={i} alt="" />)}
                                {[...Array(5 - recipeInfo.recipeInfo.difficulty)].map((e, i) => <img className="m-1" width="15" height="15" src="https://cdn-icons.flaticon.com/png/512/2377/premium/2377878.png?token=exp=1637115029~hmac=0e3c9f32c957e01f8a1d10bac0813f40" key={i} alt="" />)}
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
                    {recipeInfo.ingredients.map(ingredient => 
                        <div key={ingredient.ingredient_name}>
                            <li>
                                {ingredient.ingredient_name} {(ingredient.amount !== 0) ? ingredient.amount : ""} {ingredient.unit} 
                            </li>
                        </div>
                    )}
                </div>

                <hr />

                <div className="row">
                    <h3>Directions: </h3>
                    {recipeInfo.recipeInfo.directions.map((step, index) =>
                        <li className="list-group-item border-0" key={index}>
                            <img className="me-2" width="22" height="22" src="https://cdn-icons.flaticon.com/png/512/3502/premium/3502463.png?token=exp=1637122831~hmac=df71966796d4b5bd2136c826809c3ded" alt="" />
                            <strong>Step {index + 1}:</strong>
                            <br />
                            <p className="mt-2 mx-3">{step.charAt(0).toUpperCase() + step.slice(1)}</p>
                        </li>
                    )}
                </div>

                <hr />

                <div className="pb-5">
                    <h3>Required Equipment: </h3>
                    {recipeInfo.equipment.map(equipment => 
                        <li className="text-capitalize" key={equipment.tool_name}>{equipment.tool_name}</li>
                    )}
                </div>


            </div>}
        </>
    )
}
