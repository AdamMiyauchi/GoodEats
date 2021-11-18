
from flask import Flask, render_template, request, redirect, Response, send_from_directory
from flask_cors import CORS, cross_origin
import sys
import logging
import simplejson as json
from sql import sql

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
CORS(app)
app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)


@app.route('/')
@cross_origin()
def index():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/test', methods=['GET'])
@cross_origin()
def test():
    return "called test"


@app.route('/getRecipiesRatings', methods=['GET'])
def getRecipiesRatings():
    db = sql()
    recipies = db.getRecipesAndRatings()
    return json.dumps(recipies)


@app.route('/getTopRecipies', methods=['GET'])
def getTopRecipies():
    db = sql()
    recipies = db.getTopRecipies()
    return json.dumps(recipies)


@app.route('/getHealthyRecipies', methods=['GET'])
def getHealthyRecipies():
    db = sql()
    recipies = db.getHealthyRecipies()
    return json.dumps(recipies)


@app.route('/getShortRecipies', methods=['GET'])
def getShortRecipies():
    db = sql()
    recipies = db.getRecipiesShort()
    return json.dumps(recipies)


@app.route('/getEasyRecipies', methods=['GET'])
def getEasyRecipies():
    db = sql()
    recipies = db.getEasyRecipies()
    return json.dumps(recipies)


@app.route('/searchForRecipies', methods=['GET'])
def searchForRecipies():
    db = sql()
    recipies = db.searchForRecipe("%" + request.args.get("searchValue") + "%")
    return json.dumps(recipies)


@app.route('/getRecipe', methods=['GET'])
def getRecipe():
    db = sql()
    result = {}
    recipe_id = request.args.get("recipe_id")

    recipe = db.getRecipeByID(recipe_id)
    ingredients = db.getRecipeIngredients(recipe_id)
    equipment = db.getRecipeEquipment(recipe_id)
    rating = db.getAvgRating(recipe_id)
    userCreated = db.getRecipeCreator(recipe_id)

    result['recipeInfo'] = recipe
    result['ingredients'] = ingredients
    result['equipment'] = equipment
    if rating:
        result['rating'] = round(rating['avg'])
        result['numRatings'] = rating['count']
    result['createdBy'] = userCreated[0]['username']

    return json.dumps(result)


@app.route('/userExists', methods=['GET'])
def userExists():
    db = sql()
    user = db.getUser(request.args.get("username"))
    if user != None:
        user = dict(user)
        user['valid'] = True
    else:
        user = {'valid' : False}
    return json.dumps(user)


@app.route('/addUser', methods=['POST'])
def addUser():
    db = sql()
    user = db.addUser(request.args.get("username"), request.args.get("password"))
    if user:
        return "true"
    return "false"


@app.route('/createRecipe', methods=['POST'])
def createRecipe():
    print("APP.PY")
    print(request.get_json())
    data = request.get_json()
    recipe = data['recipeData']['recipe']
    db = sql()
    recipeId = db.getRecipeId()

    db.addRecipe(recipeId, recipe['healthy'], recipe['image'], recipe['category'], recipe['recipeName'], " ".join(recipe['directions']), recipe['difficulty'], recipe['prepTime'])

    for i in data['recipeData']['ingredients']:
        iid = db.getIngredientId()
        db.addIngredient(i['name'], iid)
        db.addRecipeIngredient(recipeId, iid, i['unit'], i['amount'])

    for tool in data['recipeData']['equipment']:
        db.addEquipment(tool, None)
        db.addRecipeEquipment(tool, recipeId)

    db.addCreator(recipeId, data['recipeData']['createdBy'])


    return "aaaaa"
    




if __name__ == "__main__":
    app.run()



