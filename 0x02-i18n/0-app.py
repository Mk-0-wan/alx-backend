#!/usr/bin/env python3
"""Making a simple flask app"""

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index_page():
    """retrives the index page
     of the flask app
    """
    return render_template("0-index.html")
