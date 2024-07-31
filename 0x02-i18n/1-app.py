#!/usr/bin/env python3
"""Making a simple flask app with babel"""

from flask import Flask, render_template
from flask_babel import Babel


class Config:
    """Simple flask config params"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@app.route('/')
def index_page():
    """retrives the index page
     of the flask app
    """
    return render_template("0-index.html")
