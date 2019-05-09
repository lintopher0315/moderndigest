from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Hello, World!"

@app.route("/digest/twitter", methods = ['GET', 'POST'])
def get_twitter():
    print(request)
    print(request.get_data())
    json_send = {'chris': 500, 'lin': 200}
    return jsonify(json_send)

@app.route("/digest/newspaper")
def get_newspaper():
    json_send = {'chris': 500, 'lin': 200}
    return jsonify(json_send)