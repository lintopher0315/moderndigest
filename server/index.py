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

@app.route("/digest/newspaper", methods = ['GET', 'POST'])
def get_newspaper():
    search = request.get_json()["query"]
    quantity = request.get_json()["quantity"]
    client = NewspaperClient()
    query = client.parse_query(search)
    articles = client.get_urls(query, quantity)

    return jsonify(articles)

@app.route("/digest/keywords", methods = ['GET', 'POST'])
def get_keywords():
    articles = request.get_json()["articles"]
    client = NewspaperClient()
    words = client.get_words(articles)

    return jsonify(words)