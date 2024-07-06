#!/usr/bin/env python3
"""Making a simple flask app with babel"""
from flask import Flask, render_template, request
from flask_babel import Babel


class Config:
    """ global configuration """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
babel = Babel(app)
app.config.from_object(Config)
app.url_map.strict_slashes = False


@babel.localeselector
def get_locale() -> str:
    """ getting locale """
    return request.accept_languages.best_match(
            app.config['LANGUAGES']
            )


@app.route('/')
def helloWorld() -> str:
    """ Home page for the Flask app """
    return render_template('3-index.html')
