#!/bin/sh

export FLASK_APP=./server/index.py
source $(pipenv --venv)/bin/activate
flask run -h 127.0.0.1