import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom'
import Requests from '../requests.js'
import logo from '../Images/goodeatslogo.png'
import equipmenticon from '../Images/equipmenticon.png'
import ingredienticon from '../Images/ingredienticon.png'
import stepicon from '../Images/stepicon.png'

class EditRecipeWithNav extends Component{

    constructor(props) {
        super()

        this.state = {
            num : 3,
            recipeName : "",
            directions : [{id : 0, desc : ""}],
            ingredients : [{id : 1, name : '', unit : '', amount : 0}],
            equipment : [{id : 2, desc : ""}],
            prepTime : null,
            difficulty : 0,
            healthy : false,
            category : "",
            image : "",
            recipe_id : null,

            missingRecipeName : false,
            missingIngredients : false,
            missingDirections : false,
            badImage : false
        }

        this.handleLogo = this.handleLogo.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handlePrepTime = this.handlePrepTime.bind(this)
        this.handleDifficulty = this.handleDifficulty.bind(this)
        this.handleHealthy = this.handleHealthy.bind(this)
        this.handleCategory = this.handleCategory.bind(this)
        this.handleImage = this.handleImage.bind(this)
        
        this.handleAddStep = this.handleAddStep.bind(this)
        this.handleDeleteStep = this.handleDeleteStep.bind(this)
        this.handleDirections = this.handleDirections.bind(this)
        
        this.handleAddIngredient = this.handleAddIngredient.bind(this)
        this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this)
        this.handleIngredientUnit = this.handleIngredientUnit.bind(this)
        this.handleIngredientName = this.handleIngredientName.bind(this)
        this.handleIngredientAmount = this.handleIngredientAmount.bind(this)

        this.handleToolName = this.handleToolName.bind(this)
        this.handleDeleteEquipment = this.handleDeleteEquipment.bind(this)
        this.handleAddEquipment = this.handleAddEquipment.bind(this)
        
        this.handleCreateRecipe = this.handleCreateRecipe.bind(this)
    }

    componentDidMount() {
        Requests.getRecipe(sessionStorage.getItem("recipe_id"))
            .then((res) => {
                sessionStorage.setItem("recipe_id", null)
                let idx = this.state.num
                let dir = []
                for (let i = 0; i < res.data.recipeInfo.directions.length; i++) {
                    dir.push({id : idx, desc : res.data.recipeInfo.directions[i]})
                    idx++
                }
                let ing = []
                for (let i = 0; i < res.data.ingredients.length; i++) {
                    ing.push({id : idx, 
                              name : res.data.ingredients[i].ingredient_name, 
                              unit : res.data.ingredients[i].unit, 
                              amount : res.data.ingredients[i].amount
                            })
                    idx++
                }
                let equip = []
                for (let i = 0; i < res.data.equipment.length; i++) {
                    equip.push({
                        id : idx,
                        desc : res.data.equipment[i].tool_name
                    })
                    idx++
                }
                this.setState({
                    num : idx,
                    recipeName : res.data.recipeInfo.recipe_name,
                    directions : dir,
                    ingredients : ing,
                    equipment : equip,
                    prepTime : res.data.recipeInfo.prep_time,
                    difficulty : res.data.recipeInfo.difficulty,
                    healthy : res.data.recipeInfo.healthy,
                    category : res.data.recipeInfo.category,
                    image : res.data.recipeInfo.image,
                    recipe_id : res.data.recipeInfo.recipe_id
                })
            })
    }

    render() {
        return(
            <div className="container">
                <div className="row mt-4">
                    <div className="col">
                        <img onClick={this.handleLogo} src={logo} alt="" width="350" height="100"/>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col">
                        <h3 className="display-5">Edit Recipe</h3>
                    </div>
                </div>
                <form>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <h5>Recipe Name:*</h5>
                                <input onChange={this.handleName}  onSelect={this.handleName} defaultValue={this.state.recipeName}
                                    type="text" className="form-control" placeholder="Name" autoComplete="off"/>
                                {this.state.missingRecipeName && <strong><small className="text-danger mt-3">A recipe name is required</small></strong>}

                            </div>
                        </div>
                        <div className="col-8"></div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-11">
                            <div className="form-group">
                                <hr />
                                <h5>Directions:*</h5>

                                {this.state.directions.map((step, index) =>
                                    <div className="row mb-3" key={step.id}>
                                        <div className="input-group">
                                            <label className="me-3 mt-1">
                                            <img className="me-2" width="22" height="22" src={stepicon} alt="" />
                                                Step {index + 1}:
                                            </label>
                                            <input onChange={(e) => this.handleDirections(e, index)} defaultValue={step.desc}
                                                   type="text" className="form-control rounded me-2" placeholder="Step" autoComplete="off"/>
                                            <div className="input-group-append">
                                                <button onClick={(e) => this.handleDeleteStep(e, index)} className="btn btn-outline-danger">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <button onClick={this.handleAddStep} className="btn btn-sm btn-outline-dark mx-2">Add Step</button>
                                <br />
                                {this.state.missingDirections && <strong><small className="text-danger mt-3">Recipe directions are required</small></strong>}
                            </div>
                        </div>
                        <div className="col-7"></div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-11">
                            <hr />
                            <h5>Ingredients:*</h5>
                                {this.state.ingredients.map((ingredient, index) => 
                                    <div className="row mb-3" key={ingredient.id}>
                                        <div className="col-1 mt-3">
                                            <img className="me-2" width="25" height="25" src={ingredienticon} alt="" />
                                            {index + 1}:
                                        </div>

                                        <div className="col">
                                            <label>Ingredient Name:*</label>
                                            <input onChange={(e) => this.handleIngredientName(e, index)} defaultValue={ingredient.name}
                                                   type="text" className="form-control" placeholder="Name" autoComplete="off"/>
                                        </div>

                                        <div className="col">
                                            <label>Ingredient Unit:</label>
                                            <input onChange={(e) => this.handleIngredientUnit(e, index)} defaultValue={ingredient.unit}
                                                   type="text" className="form-control" placeholder="Unit" autoComplete="off"/>
                                        </div>

                                        <div className="col-2">
                                            <label>Amount:</label>
                                            <input  onChange={(e) => this.handleIngredientAmount(e, index)} defaultValue={ingredient.amount}
                                                    type="number" min="0" className="form-control" placeholder="Amount" autoComplete="off"/>
                                        </div>

                                        <div className="col-1">
                                            <button onClick={(e) => this.handleDeleteIngredient(e, index)} className="btn btn-outline-danger mt-4 ">Remove</button>
                                        </div>
                                    </div>
                                )}
                            <button onClick={this.handleAddIngredient} className="btn btn-sm btn-outline-dark mx-2">Add Ingredient</button>
                            <br />
                            {this.state.missingIngredients && <strong><small className="text-danger mt-3">Recipe ingredients are required</small></strong>}
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-11">
                            <hr />
                            <h5>Required Equipment:</h5>
                            {this.state.equipment.map((tool, index) =>
                                <div className="row mb-3" key={tool.id}>
                                    <div className="col-1 mt-3">
                                        <img className="me-2" width="28" height="28" src={equipmenticon} alt="" />
                                        {index + 1}:
                                    </div>

                                    <div className="col">
                                        <label>Tool Name:</label>
                                        <input onChange={(e) => this.handleToolName(e, index)} defaultValue={tool.desc}
                                                type="text" className="form-control" placeholder="Tool" autoComplete="off"/>
                                    </div>

                                    <div className="col-7">
                                        <button onClick={(e) => this.handleDeleteEquipment(e, index)} className="btn btn-outline-danger mt-4 ">Remove</button>
                                    </div>
                                </div>
                            )}
                            <button onClick={this.handleAddEquipment} className="btn btn-sm btn-outline-dark mx-2 mb-3">Add Equipment</button>
                            <hr />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <h5>Prep Time:</h5>
                            <div className="input-group">
                                <input onChange={this.handlePrepTime} defaultValue={this.state.prepTime}
                                    type="number" min="0" className="form-control" placeholder="Prep Time" autoComplete="off"/>
                                <div className="input-group-append">
                                    <span className="input-group-text border-left-0 rounded-right">Minutes</span>
                                </div>
                            </div>
                                
                        </div>
                        <div className="col-7"></div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <div className="form-group">
                                <h5>Difficulty:</h5>
                                <select className="form-control" onChange={this.handleDifficulty} defaultValue={this.state.difficulty}>
                                    <option value="0" selected={this.state.difficulty === 0}>0</option>
                                    <option value="1" selected={this.state.difficulty === 1}>1</option>
                                    <option value="2" selected={this.state.difficulty === 2}>2</option>
                                    <option value="3" selected={this.state.difficulty === 3}>3</option>
                                    <option value="4" selected={this.state.difficulty === 4}>4</option>
                                    <option value="5" selected={this.state.difficulty === 5}>5</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-7"></div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <div className="form-group">
                                <h5>Healthy:</h5>
                                <select className="form-control" onChange={this.handleHealthy}>
                                    <option value="false" selected={this.state.healthy === false}>No</option>
                                    <option value="true" selected={this.state.healthy === true}>Yes</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-7"></div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <div className="form-group">
                                <h5>Category:</h5>
                                <input onChange={this.handleCategory} defaultValue={this.state.category}
                                    type="text" className="form-control" placeholder="" autoComplete="off"/>
                            </div>
                        </div>
                        <div className="col-7"></div>
                    </div>

                    <div className="row mt-3 mb-5">
                        <div className="col">
                            <div className="form-group">
                                <h5>Image Link:</h5>
                                <input onChange={this.handleImage} onSelect={this.handleImage} defaultValue={this.state.image}
                                    type="url" className="form-control" placeholder="" autoComplete="off"/>
                                {this.state.badImage && <strong><small className="text-danger mt-3">Invalid Link</small></strong>}

                                <br />
                                <button onClick={this.handleCreateRecipe} className="mt-3 btn btn-outline-dark">Edit Recipe</button>
                            </div>
                        </div>
                        <div className="col-7"></div>
                    </div>
                    
                </form>
            </div>
        )
    }


    handleLogo() {
        this.props.navigate("/")
    }
    handleName(event) {
        this.setState({recipeName : event.target.value})
    }
    handleDirections(event, index) {
        let t = this.state.directions
        t[index].desc = event.target.value
        this.setState({directions : t})
    }
    handlePrepTime(event) {
        this.setState({prepTime : event.target.value})
    }
    handleDifficulty(event) {
        this.setState({difficulty : event.target.value})
    }
    handleHealthy(event) {
        this.setState({healthy : event.target.value})
    }
    handleCategory(event) {
        this.setState({category : event.target.value})
    }
    handleImage(event) {
        this.setState({image : event.target.value})
    }
    handleAddStep(event) {
        event.preventDefault()
        let t = this.state.directions
        t.push({id : this.state.num, desc : ""})
        this.setState({directions : t, num : this.state.num + 1})
    }
    handleDeleteStep(event, index) {
        event.preventDefault()
        let t = this.state.directions
        t.splice(index, 1)
        this.setState({directions : t})
    }

    handleAddIngredient(event) {
        event.preventDefault()
        let t = this.state.ingredients
        t.push({id : this.state.num, name : '', unit : '', amount : 0})
        this.setState({ingredients : t, num : this.state.num +1})
    }
    handleDeleteIngredient(event, index) {
        event.preventDefault()
        let t = this.state.ingredients
        t.splice(index, 1)
        this.setState({ingredients : t})
    }
    handleIngredientName(event, index) {
        let t = this.state.ingredients
        t[index].name = event.target.value
        this.setState({ingredients : t})
    }
    handleIngredientUnit(event, index) {
        let t = this.state.ingredients
        t[index].unit = event.target.value
        this.setState({ingredients : t})
    }
    handleIngredientAmount(event, index) {
        let t = this.state.ingredients
        t[index].amount = event.target.value
        this.setState({ingredients : t})
    }
    handleToolName(event, index) {
        let t = this.state.equipment
        t[index].desc = event.target.value
        this.setState({equipment : t})
    }
    handleDeleteEquipment(event, index) {
        event.preventDefault()
        let t = this.state.equipment
        t.splice(index, 1)
        this.setState({equipment : t})
    }
    handleAddEquipment(event) {
        event.preventDefault()
        let t = this.state.equipment
        t.push({id : this.state.num, desc : ""})
        this.setState({equipment : t, num : this.state.num +1})
    }

    handleCreateRecipe(event) {
        event.preventDefault()
        // name
        let name = this.state.recipeName.trim()
        if (name === "") {
            this.setState({missingRecipeName : true})
            return
        }
        else if (this.state.missingRecipeName === true) {
            this.setState({missingRecipeName : false})
        }
        // directions
        let dir = this.state.directions
        let directions = []
        for (let i = 0; i < dir.length; i++) {
            let x = dir[i].desc.trim()
            if (x !== "") {
                x = x.replaceAll(",", "")
                x = "Step " + i + ": " + x + ";"
                directions.push(x)
            }
        }
        if (directions.length === 0) {
            this.setState({missingDirections : true})
            return 
        }
        else if (this.state.missingDirections === true) {
            this.setState({missingDirections : false})
        }
        // Ingredients
        let ing = this.state.ingredients
        let ingredients = []
        for (let i = 0; i < ing.length; i++) {
            let n = ing[i].name.trim()
            let u = ing[i].unit.trim()
            let a = ing[i].amount
            if (n !== "") {
                n = n.replaceAll(",", "")
                u = u.replaceAll(",", "")
                ingredients.push({name : n, unit : u, amount : a})
            }
        }
        if (ingredients.length === 0) {
            this.setState({missingIngredients : true})
            return 
        }
        else if (this.state.missingIngredients === true) {
            this.setState({missingIngredients : false})
        }
        // Equipment
        let eqip = this.state.equipment
        let equipment = []
        for (let i = 0; i < eqip.length; i++) {
            let x = eqip[i].desc.trim()
            if (x !== "") {
                x = x.replaceAll(",", "")
                equipment.push(x)
            }
        }
        // category
        let category = null
        if (this.state.category !== null) {
        }
        if (this.state.category !== null && this.state.category !== "") {
            category = this.state.category.trim()
        }
        // image
        let image = null
        if (this.state.image !== null && this.state.image !== "") {
            image = this.state.image.trim()
            try {
                new URL(image)
                if (this.state.badImage === true) {
                    this.setState({badImage : false})
                }
            }
            catch(_) {
                this.setState({badImage : true})
                return 
            }
        }
        const payload = {
            recipe : {
                recipeName : name,
                directions : directions,
                prepTime : this.state.prepTime,
                difficulty : this.state.difficulty,
                healthy : this.state.healthy, 
                category : category, 
                image : image
            },
            ingredients : ingredients,
            equipment : equipment,
            createdBy : JSON.parse(sessionStorage.getItem("user")).toLowerCase()
        }
        Requests.deleteRecipe(this.state.recipe_id)
            .then(() => {
                Requests.createRecipe(payload)
                this.props.navigate("/")
            })
    }

}



function EditRecipe(props) {
    let navigate = useNavigate()
    return <EditRecipeWithNav {...props} navigate={navigate} />
}

export default EditRecipe