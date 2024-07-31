#!/usr/bin/env python3
"""Making a simple flask app with babel"""
from flask import Flask, render_template, request
from flask_babel import Babel
from typing import Any


class Config:
    """Simple flask config params"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@app.route('/')
def index_page() -> Any:
    """retrives the index page
     of the flask app
    """
    return render_template("4-index.html")


@babel.localeselector
def get_locale() -> Any:
    """Gets the best match to match the supported
    language"""
    locale = request.args.get('locale')

    if locale in app.config['LANGUAGES']:
        return locale
    return request.accept_languages.best_match(
            app.config['LANGUAGES']
            )
