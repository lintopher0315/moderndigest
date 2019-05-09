from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Hello, World!"

@app.route("/digest/twitter")
def get_twitter():
    return request.get_json()

@app.route("/digest/newspaper")
def get_newspaper():
    return request.get_json()