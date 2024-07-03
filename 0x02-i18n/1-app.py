#!/usr/bin/env python3
"""Making a simple flask app with babel"""

from flask import Flask, render_template
from flask_babel import Babel

app = Flask(__name__)


class Config:
    """configuration for flask babel"""
    LANGUAGES = ["en", "fr"]


app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'
babel = Babel(app)


@app.route('/')
def index_page():
    """retrives the index page
     of the flask app
    """
    return render_template("0-index.html")
