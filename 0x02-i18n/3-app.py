!/usr/bin/env python3
"""Making a simple flask app with babel"""

from flask import Flask, render_template, request
from flask_babel import Babel, gettext


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
    return render_template("0-index.html", title=gettext('Welcome to Holberton'))


@babel.localeselector
def get_locale():
    """Gets the best match to match the supported
    language"""
    return request.accept_languages.best_match(
            app.config['LANGUAGES']
            )
