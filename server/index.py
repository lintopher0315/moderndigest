from flask import Flask, jsonify, request
from .data.TwitterClient import *
from .data.NewspaperClient import *

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Hello, World!"

@app.route("/digest/twitter", methods = ['GET', 'POST'])
def get_twitter():
    search = request.get_json()["query"]
    api = TwitterClient()
    tweets = api.get_tweets(query = search, count = 200)

    return jsonify(tweets)

@app.route("/digest/newspaper")
def get_newspaper():
    json_send = {'chris': 500, 'lin': 200}
    return jsonify(json_send)