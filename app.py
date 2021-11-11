
from flask import Flask, render_template, request, redirect, Response, send_from_directory
from flask_cors import CORS, cross_origin
import sys
import logging


app = Flask(__name__, static_folder='frontend/build', static_url_path='')
CORS(app)
app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)



@app.route('/')
@cross_origin()
def index():
    return send_from_directory(app.static_folder, 'index.html')

# @app.errorhandler(404)
# @cross_origin()
# def not_found(e):
#     return app.send_static_file('index.html')

@app.route('/test', methods=['GET'])
@cross_origin()
def test():
    return "called test"



if __name__ == "__main__":
    app.run()



