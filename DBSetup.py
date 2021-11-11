
import psycopg2 as psy
import csv

from config import database, user, port, host, password


class DBSetup:

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
            self.cur = self.conn.cursor()
        except Exception as e:
            print(e)

    
    def __del__(self):
        self.cur.close()
        self.conn.close()


    def createTables(self):
        query = '''
            CREATE TABLE Equipment (
                tool_name TEXT NOT NULL,
                measurement_type TEXT,
                PRIMARY KEY (tool_name)
            );

            CREATE TABLE Ingredient (
                ingredient_name TEXT NOT NULL,
                ingredient_id INTEGER,
                PRIMARY KEY(ingredient_id)
            );

            CREATE TABLE Recipe (
                recipe_id INTEGER NOT NULL,
                healthy BOOLEAN,
                image TEXT,
                category TEXT,
                recipe_name TEXT,
                directions TEXT,
                difficulty INTEGER,
                prep_time INTEGER,
                PRIMARY KEY (recipe_id)
            );

            CREATE TABLE User_Profile (
                username TEXT NOT NULL,
                password TEXT,
                PRIMARY KEY (username)
            );
            
            CREATE TABLE Rating (
                recipe_id INTEGER NOT NULL,
                username TEXT NOT NULL,
                score INTEGER,
                PRIMARY KEY (recipe_id, username),
                FOREIGN KEY (recipe_id) REFERENCES Recipe ON DELETE CASCADE,
                FOREIGN KEY (username) REFERENCES User_Profile ON DELETE CASCADE
            );
            
            CREATE TABLE Creates (
                recipe_id INTEGER NOT NULL,
                username TEXT NOT NULL,
                PRIMARY KEY (recipe_id),
                FOREIGN KEY (recipe_id) REFERENCES Recipe ON DELETE CASCADE,
                FOREIGN KEY (username) REFERENCES User_Profile ON DELETE CASCADE
            );

            CREATE TABLE Have (
                recipe_id INTEGER NOT NULL,
                ingredient_id INTEGER NOT NULL,
                unit TEXT,
                amount FLOAT,
                PRIMARY KEY (recipe_id, ingredient_id),
                FOREIGN KEY (recipe_id) REFERENCES Recipe ON DELETE CASCADE,
                FOREIGN KEY (ingredient_id) REFERENCES Ingredient ON DELETE CASCADE
            );

            CREATE TABLE Require(
                tool_name TEXT NOT NULL,
                recipe_id INTEGER NOT NULL,
                PRIMARY KEY (tool_name, recipe_id),
                FOREIGN KEY (tool_name) REFERENCES Equipment ON DELETE CASCADE,
                FOREIGN KEY (recipe_id) REFERENCES Recipe ON DELETE CASCADE
            );
        '''
        try:
            self.cur.execute(query)
        except Exception as e:
            print(e)


    def deleteTables(self):
        query = '''
            DROP TABLE IF EXISTS Creates;
            DROP TABLE IF EXISTS Have;
            DROP TABLE IF EXISTS Require;
            DROP TABLE IF EXISTS Rating;
            DROP TABLE IF EXISTS User_Profile;
            DROP TABLE IF EXISTS Equipment;
            DROP TABLE IF EXISTS Ingredient;
            DROP TABLE IF EXISTS Recipe;
        '''
        try:
            self.cur.execute(query)
        except Exception as e:
            print(e)


    def loadData(self):
        # Insert Equipment.csv data
        try: 
            with open("Data/Equipment.csv") as f:
                content = f.readlines()
            f.close()
            rows = content[1:]
            for row in rows:
                data = row.rstrip().lower().split(",")
                self.cur.execute("INSERT INTO Equipment VALUES (%s, %s);", (data[0], data[1] if data[1] != 'null' else 'NULL'))
        except Exception as e:
            print("Failed to insert Equipment.csv data. ", e)

        # Insert Ingredient.csv data
        try: 
            with open("Data/Ingredient.csv") as f:
                content = f.readlines()
            f.close()
            rows = content[1:]
            for row in rows:
                data = row.rstrip().lower().split(",")
                self.cur.execute("INSERT INTO Ingredient VALUES (%s, %s);", (data[0], data[1]))
        except Exception as e:
            print("Failed to insert Ingredient.csv data. ", e)
        
        # # Insert Recipe.csv data
        try: 
            with open("Data/Recipe.csv") as f:
                content = f.readlines()
            f.close()
            rows = content[1:]
            for row in rows:
                data = row.rstrip().lower().split(",")
                self.cur.execute("INSERT INTO Recipe VALUES (%s, %s, %s, %s, %s, %s, %s, %s);", (data[0], bool(int(data[1])), data[2], data[3], data[4], data[5], data[6], data[7]))
        except Exception as e:
            print("Failed to insert Recipe.csv data. ", e)

        # # Insert User_Profile.csv data
        try: 
            with open("Data/User_Profile.csv") as f:
                content = f.readlines()
            f.close()
            rows = content[1:]
            for row in rows:
                data = row.rstrip().lower().split(",")
                self.cur.execute("INSERT INTO User_Profile VALUES (%s, %s);", (data[0], data[1]))
        except Exception as e:
            print("Failed to insert User_Profile.csv data. ", e)

        # # Insert Rating.csv data
        try: 
            with open("Data/Rating.csv") as f:
                content = f.readlines()
            f.close()
            rows = content[1:]
            for row in rows:
                data = row.rstrip().lower().split(",")
                self.cur.execute("INSERT INTO Rating VALUES (%s, %s, %s);", (data[0], data[1], data[2]))
        except Exception as e:
            print("Failed to insert Rating.csv data. ", e)

        # # Insert Creates.csv data
        try: 
            with open("Data/Creates.csv") as f:
                content = f.readlines()
            f.close()
            rows = content[1:]
            for row in rows:
                data = row.rstrip().lower().split(",")
                self.cur.execute("INSERT INTO CREATES VALUES (%s, %s);", (data[0], data[1]))
        except Exception as e:
            print("Failed to insert Creates.csv data. ", e)

        # # Insert Have.csv data
        try: 
            with open("Data/Have.csv") as f:
                content = f.readlines()
            f.close()
            rows = content[1:]
            for row in rows:
                data = row.rstrip().lower().split(",")
                self.cur.execute("INSERT INTO Have VALUES (%s, %s, %s, %s);", (data[0], data[1], data[2], data[3]))
        except Exception as e:
            print("Failed to insert Have.csv data. ", e)

        # # Insert Require.csv data
        try: 
            with open("Data/Require.csv") as f:
                content = f.readlines()
            f.close()
            rows = content[1:]
            for row in rows:
                data = row.rstrip().lower().split(",")
                self.cur.execute("INSERT INTO Require VALUES (%s, %s)", (data[0], data[1]))
        except Exception as e:
            print("Failed to insert Require.csv data. ", e)



x = DBSetup()
x.deleteTables()
x.createTables()
x.loadData()
