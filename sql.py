
from re import search
import psycopg2 as psy
import psycopg2.extras as psye

from config import database, user, port, host, password

class sql:

    def __init__(self):
        try:
            self.conn = psy.connect(
                database = database, 
                user = user,
                port = port,
                host = host,
                password = password
            )
            self.conn.autocommit = True
            self.cur = self.conn.cursor(cursor_factory=psye.DictCursor)
        except Exception as e:
            print(e)  

    
    def __del__(self):
        self.cur.close()
        self.conn.close()


### User Queries
    def getAllUsers(self):
        try:
            self.cur.execute('''SELECT * FROM user_profile;''')
            return self.cur.fetchall()
        except Exception as e:
            print(e)

    def getUser(self, username):
        try:
            self.cur.execute("SELECT * FROM user_profile WHERE username = %s;", (username,))
            return dict(self.cur.fetchone())
        except Exception as e:
            print(e)

    def addUser(self, username, password):
        try:
            self.cur.execute("INSERT INTO user_profile VALUES (%s, %s);", (username, password))
            return True
        except Exception as e:
            print(e)

    def deleteUser(self, username):
        try:
            self.cur.execute("DELETE FROM user_profile WHERE username = %s;", (username,))
        except Exception as e:
            print(e)

    def getRecipiesByUser(self, username):
        try:
            self.cur.execute('''
                SELECT recipe.*
                FROM user_profile, recipe, creates
                WHERE user_profile.username = creates.username AND creates.recipe_id = recipe.recipe_id AND
                user_profile.username = %s;
            ''', (username, ))
            return self.cur.fetchall()
        except Exception as e:
            print(e)

    def getRecipeCreator(self, recipe_id):
        try:
            self.cur.execute('''
                SELECT user_profile.username
                FROM recipe, creates, user_profile
                WHERE recipe.recipe_id = %s AND
                recipe.recipe_id = creates.recipe_id AND creates.username = user_profile.username
            ''', (recipe_id,))
            recipies = self.cur.fetchall()
            result = []
            for recipe in recipies:
                result.append(dict(recipe))
            return result
        except Exception as e:
            print(e)



### Rating Queries
    def addRating(self, recipe_id, username, score):
        try:
            self.cur.execute("INSERT INTO rating VALUES (%s, %s, %s);", (recipe_id, username, score))
        except Exception as e:
            print(e)
    
    def getAllRatings(self):
        try:
            self.cur.execute("SELECT * FROM rating;")
            return self.cur.fetchall()
        except Exception as e:
            print(e)

    def getAvgRating(self, recipe_id):
        try:
            self.cur.execute('''
                SELECT recipe_id, AVG(score), COUNT(score)
                FROM rating
                WHERE recipe_id = %s
                GROUP BY recipe_id;
            ''', (recipe_id,))
            recipe = self.cur.fetchone()
            return dict(recipe)
        except Exception as e:
            print(e)

    
    
### Recipe queries
    def addRecipe(self, recipe_id, healthy, image, category, recipe_name, directions, difficulty, prep_time):
        try:
            self.cur.execute("INSERT INTO recipe VALUES (%s, %s, %s, %s, %s, %s, %s, %s);", 
                (recipe_id, healthy, image, category, recipe_name, directions, difficulty, prep_time))
        except Exception as e:
            print(e)
    
    def deleteRecipe(self, recipe_id):
        try:
            self.cur.execute("DELETE FROM recipe WHERE recipe_id = %s;", (recipe_id,))
        except Exception as e:
            print(e)

    def changeRecipe(self, recipe_id, healthy, image, category, recipe_name, directions, difficulty, prep_time):
        try: 
            self.cur.execute('''
                UPDATE recipe
                SET healthy = %s, image = %s, category = %s, recipe_name = %s, directions = %s, difficulty = %s, prep_time = %s
                WHERE recipe_id = %s;
            ''', (healthy, image, category, recipe_name, directions, difficulty, prep_time, recipe_id))
        except Exception as e:
            print(e)
    
    def getAllRecipies(self):
        try:
            self.cur.execute("SELECT * FROM recipe;")
            return self.cur.fetchall()
        except Exception as e:
            print(e)

    def getRecipesAndRatings(self):
        try:
            self.cur.execute('''
                SELECT Recipe.*, ROUND(AVG(Rating.score)) as rating
                FROM Recipe LEFT JOIN Rating ON Recipe.recipe_id = Rating.recipe_id
                GROUP BY Recipe.recipe_id
                ORDER BY Recipe.recipe_id
            ''')
            recipies = self.cur.fetchall()
            result = []
            for recipe in recipies:
                result.append(dict(recipe))
            return result
        except Exception as e:
            print(e)

    def getTopRecipies(self):
        try:
            self.cur.execute('''
                SELECT Recipe.*, ROUND(AVG(Rating.score)) as rating
                FROM Recipe, Rating
                WHERE Recipe.recipe_id = Rating.recipe_id
                GROUP BY Recipe.recipe_id
                ORDER BY rating DESC;
            ''')
            recipies = self.cur.fetchall()
            result = []
            for recipe in recipies:
                result.append(dict(recipe))
            return result
        except Exception as e:
            print(e)

    def getRecipiesShort(self):
        try:
            self.cur.execute('''
                SELECT Recipe.*, ROUND(AVG(Rating.score)) as rating
                FROM Recipe, Rating
                WHERE Recipe.recipe_id = Rating.recipe_id
                GROUP BY Recipe.recipe_id
                ORDER BY Recipe.prep_time ASC;
            ''')
            recipies = self.cur.fetchall()
            result = []
            for recipe in recipies:
                result.append(dict(recipe))
            return result
        except Exception as e:
            print(e)

    def getEasyRecipies(self):
        try:
            self.cur.execute('''
                SELECT Recipe.*, ROUND(AVG(Rating.score)) as rating
                FROM Recipe, Rating
                WHERE Recipe.recipe_id = Rating.recipe_id
                GROUP BY Recipe.recipe_id
                ORDER BY Recipe.difficulty ASC;
            ''')
            recipies = self.cur.fetchall()
            result = []
            for recipe in recipies:
                result.append(dict(recipe))
            return result
        except Exception as e:
            print(e)

    def searchForRecipe(self, searchValue):
        try:
            self.cur.execute('''
                SELECT recipe.*, ROUND(AVG(rating.score)) as rating
                FROM recipe LEFT JOIN rating ON recipe.recipe_id = rating.recipe_id, have, ingredient
                WHERE (LOWER(recipe.recipe_name) LIKE LOWER(%s) OR LOWER(ingredient.ingredient_name) LIKE LOWER(%s)) AND
                have.recipe_id = recipe.recipe_id AND have.ingredient_id = ingredient.ingredient_id
                GROUP BY Recipe.recipe_id 
                ORDER BY Recipe.recipe_id
            ''', (searchValue, searchValue))
            recipies = self.cur.fetchall()
            result = []
            for recipe in recipies:
                result.append(dict(recipe))
            return result
        except Exception as e:
            print(e)

    def getRecipeByName(self, recipe_name):
        try:
            self.cur.execute("SELECT * FROM recipe WHERE recipe_name = %s;", (recipe_name,))
            return self.cur.fetchall()
        except Exception as e:
            print(e)

    def getRecipeByID(self, recipe_id):
        try:
            self.cur.execute("SELECT * FROM recipe WHERE recipe_id = %s;", (recipe_id,))
            recipe = self.cur.fetchone()
            result = dict(recipe)
            steps = recipe[5].split("; ")
            steps[len(steps) -1] = steps[len(steps) -1][:-1]
            directions = []
            for step in steps:
                directions.append(step.split(": ")[1])

            result['directions'] = directions
            return result
        except Exception as e:
            print(e)

    def getAllRecipeIngredientEquipment(self):
        try:
            self.cur.execute('''
                SELECT recipe.*, have.ingredient_id, ingredient.ingredient_name, have.amount, have.unit, equipment.tool_name
                FROM recipe, have, ingredient, require, equipment
                WHERE recipe.recipe_id = have.recipe_id AND have.ingredient_id = ingredient.ingredient_id AND
                recipe.recipe_id = require.recipe_id AND require.tool_name = equipment.tool_name;
            ''')
            recipies = self.cur.fetchall()
            result = []
            for recipe in recipies:
                result.append(dict(recipe))
            return result
        except Exception as e:
            print(e)

    def getHealthyRecipies(self):
        try:
            self.cur.execute('''
                SELECT Recipe.*, ROUND(AVG(Rating.score)) as rating
                FROM Recipe, Rating
                WHERE Recipe.recipe_id = Rating.recipe_id AND Recipe.healthy = TRUE
                GROUP BY Recipe.recipe_id;
            ''')
            recipies = self.cur.fetchall()
            result = []
            for recipe in recipies:
                result.append(dict(recipe))
            return result
        except Exception as e:
            print(e)
    
    def getCategoryRecipe(self, category, includeIngredientEquipment = False):
        try:
            if includeIngredientEquipment == False:
                self.cur.execute("SELECT * FROM recipe WHERE category = %s;", (category,))
                return self.cur.fetchall()
            else:
                self.cur.execute('''
                    SELECT recipe.*, have.ingredient_id, ingredient.ingredient_name, have.amount, have.unit, equipment.tool_name
                    FROM recipe, have, ingredient, require, equipment
                    WHERE category = %s AND
                    recipe.recipe_id = have.recipe_id AND have.ingredient_id = ingredient.ingredient_id AND
                    recipe.recipe_id = require.recipe_id AND require.tool_name = equipment.tool_name;
                ''', (category,))
        except Exception as e:
            print(e)
    
    def getPrepTimeRecipe(self, prep_time, includeIngredientEquipment = False):
        try: 
            if includeIngredientEquipment == False:
                self.cur.execute("SELECT * FROM recipe WHERE prep_time < %s;", (prep_time,))
                return self.cur.fetchall()
            else:
                self.cur.execute('''
                    SELECT recipe.*, have.ingredient_id, ingredient.ingredient_name, have.amount, have.unit, equipment.tool_name
                    FROM recipe, have, ingredient, require, equipment
                    WHERE prep_time < %s AND
                    recipe.recipe_id = have.recipe_id AND have.ingredient_id = ingredient.ingredient_id AND
                    recipe.recipe_id = require.recipe_id AND require.tool_name = equipment.tool_name;
                ''', (prep_time,))
                return self.cur.fetchall()
        except Exception as e:
            print(e)

    def getDifficultyRecipe(self, difficulty, includeIngredientEquipment = False):
        try: 
            if includeIngredientEquipment == False:
                self.cur.execute("SELECT * FROM recipe WHERE difficulty < %s;", (difficulty,))
                return self.cur.fetchall()
            else:
                self.cur.execute('''
                    SELECT recipe.*, have.ingredient_id, ingredient.ingredient_name, have.amount, have.unit, equipment.tool_name
                    FROM recipe, have, ingredient, require, equipment
                    WHERE difficulty < %s AND
                    recipe.recipe_id = have.recipe_id AND have.ingredient_id = ingredient.ingredient_id AND
                    recipe.recipe_id = require.recipe_id AND require.tool_name = equipment.tool_name;
                ''', (difficulty,))
                return self.cur.fetchall()
        except Exception as e:
            print(e)

    def getRecipeWithIngredient(self, ingredient_name):
        try:
            self.cur.execute('''
                SELECT recipe.*
                FROM recipe, have, ingredient
                WHERE ingredient.ingredient_name = %s AND
                recipe.recipe_id = have.recipe_id AND have.ingredient_id = ingredient.ingredient_id;
            ''', (ingredient_name,))
            return self.cur.fetchall()
        except Exception as e:
            print(e)
    
    def getRecipeWithoutIngredient(self, ingredient_name):
        try:
            self.cur.execute('''
                SELECT *
                FROM recipe
                WHERE recipe_id NOT IN (SELECT recipe_id 
                                        FROM ingredient, have
                                        WHERE ingredient_name = %s AND 
                                        have.ingredient_id = ingredient.ingredient_id);
            ''', (ingredient_name,))
            return self.cur.fetchall()
        except Exception as e:
            print(e)

    def getRecipeWithoutEquipment(self, equipment_name):
        try:
            self.cur.execute('''
                SELECT * 
                FROM recipe
                WHERE recipe_id NOT IN (SELECT recipe_id
                                        FROM equipment, require
                                        WHERE equipment.tool_name = %s AND
                                        require.tool_name = equipment.tool_name);
            ''', (equipment_name,))
            return self.cur.fetchall()
        except Exception as e:
            print(e)
    
    def getRecipeByRating(self, score):
        try:
            self.cur.execute('''
                SELECT *
                FROM recipe, (SELECT recipe_id, AVG(score) as avg
                                FROM rating
                                GROUP BY recipe_id) AS avgRating
                WHERE avg > %s AND
                recipe.recipe_id = avgRating.recipe_id;
            ''', (score,))
            return self.cur.fetchall()
        except Exception as e:
            print(e)

    def getPopularRecipe(self, n = 10):
        try:
            self.cur.execute('''
                SELECT avg, recipe.*
                FROM recipe, rating, (SELECT recipe_id, AVG(score) as avg
                                    FROM rating
                                    GROUP BY recipe_id) AS avgRating
                WHERE recipe.recipe_id = rating.recipe_id AND recipe.recipe_id = avgRating.recipe_id
                ORDER BY avg DESC LIMIT %s;   
            ''', (n,))
            return self.cur.execute()
        except Exception as e:
            print(e)

    

### Ingredient Queries
    def getRecipeIngredients(self, recipe_id):
        try:
            self.cur.execute('''
                SELECT ingredient_name, unit, amount
                FROM ingredient, have
                WHERE have.recipe_id = %s AND
                have.ingredient_id = ingredient.ingredient_id;
            ''', (recipe_id,))
            recipies = self.cur.fetchall()
            result = []
            for recipe in recipies:
                result.append(dict(recipe))
            return result
        except Exception as e:
            print(e)

    def getAllIngredients(self):
        try:
            self.cur.execute("SELECT * FROM ingredient;")
            return self.cur.fetchall()
        except Exception as e:
            print(e)

    def addIngredient(self, ingredient_name, ingredient_id):
        try:
            self.cur.execute("INSERT INTO ingredient VALUES (%s, %s);", (ingredient_name, ingredient_id))
        except Exception as e:
            print(e)



### Equipment Queries
    def getRecipeEquipment(self, recipe_id):
        try:
            self.cur.execute('''
                SELECT equipment.tool_name, measurement_type
                FROM require, equipment
                WHERE require.recipe_id = %s AND
                require.tool_name = equipment.tool_name;
            ''', (recipe_id,))
            recipies = self.cur.fetchall()
            result = []
            for recipe in recipies:
                result.append(dict(recipe))
            return result
        except Exception as e:
            print(e)

    def getAllEquipment(self): 
        try:
            self.cur.execute("SELECT * FROM equipment;")
            return self.cur.fetchall()
        except Exception as e:
            print(e)

    def addEquipment(self, tool_name, measurement_type):
        try:
            self.cur.execute("INSERT into equipment VALUES (%s, %s);", (tool_name, measurement_type))
        except Exception as e:
            print(e)
    


### Require Queries
    def addRecipeEquipment(self, tool_name, recipe_id):
        try:
            self.cur.execute("INSERT INTO require VALUES (%s, %s);", (tool_name, recipe_id))
        except Exception as e:
            print(e)

    def deleteRecipeEquipment(self, tool_name, recipe_id):
        try:
            self.cur.execute("DELETE FROM require WHERE tool_name = %s AND recipe_id = %s;", (tool_name, recipe_id))
        except Exception as e:
            print(e)

    

### Have Queries
    def addRecipeIngredient(self, recipe_id, ingredient_id, unit, amount):
        try:
            print("AddRecipeIngredients")
            print(recipe_id, ingredient_id, unit, amount)
            self.cur.execute("INSERT INTO have VALUES (%s, %s, %s, %s);", (recipe_id, ingredient_id, unit, amount))
        except Exception as e:
            print(e)

    def changeRecipeIngredient(self, recipe_id, ingredient_id, unit, amount):
        try:
            self.cur.execute('''
                UPDATE have
                SET unit = %s, amount = %s
                WHERE recipe_id = %s AND ingredient_id = %s;
            ''', (unit, amount, recipe_id, ingredient_id))
        except Exception as e:
            print(e)
    
    def deleteRecipeIngredient(self, recipe_id, ingredient_id):
        try:
            self.cur.execute("DELETE FROM have WHERE recipe_id = %s AND ingredient_id = %s;", (recipe_id, ingredient_id))
        except Exception as e:
            print(e)

    def getIngredientId(self):
        try:
            self.cur.execute("SELECT MAX(ingredient_id) FROM INGREDIENT;")
            id = self.cur.fetchone()[0]
            return id +1
        except Exception as e:
            print(e)

    def getRecipeId(self):
        try:
            self.cur.execute('''
                SELECT MAX(recipe_id) FROM RECIPE;
            ''')
            id = self.cur.fetchone()[0]
            return id + 1
        except Exception as e:
            print(e)


### Creates Queries
    def addCreator(self, recipe_id, username):
        try:
            self.cur.execute("INSERT INTO CREATES VALUES (%s, %s);", (recipe_id, username))
        except Exception as e:
            print(e)








