#!/usr/bin/env python3
"""Making a simple flask app with babel"""
from flask import Flask, g, render_template, request
from flask_babel import Babel
from typing import Any, Dict, Union


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


class Config:
    """Simple flask config params"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"

# def get_locale() -> Any:
#   """Gets the best match to match the supported
#   language"""
#   locale = request.args.get('locale')
#
#   if locale in app.config['LANGUAGES']:
#       return locale
#   return request.accept_languages.best_match(
#           app.config['LANGUAGES']
#           )
#


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)
# babel.init_app(app, locale_selector=get_locale)


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


def get_user(usr_id: str) -> Union[Dict[str, str], None]:
    """gets the specified user by the given user_id"""
    return users[int(usr_id)] if usr_id else None


@app.before_request
def before_request() -> None:
    """Returns a specified user from the mock
    database"""
    usr_id = request.args.get('login_as')
    if usr_id:
        g.user = get_user(usr_id)
    else:
        g.user = None


@app.route('/')
def index_page() -> Any:
    """retrives the index page
     of the flask app
    """
    return render_template("5-index.html")
