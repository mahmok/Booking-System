import json

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from controllers.users_controller import UsersController
from models import db
from routes.v1.appointments import appointments_blueprint
from routes.v1.users import users_blueprint
from utils.json_encoder import JSONEncoder

app = Flask(__name__)
app.config.from_file("config.json", load=json.load)
CORS(app)
app.json_encoder = JSONEncoder
jwt = JWTManager(app)
db.init_app(app)


def register_blueprints():
    app.register_blueprint(users_blueprint)
    app.register_blueprint(appointments_blueprint)


@app.route('/status')
def health():
    return {
        'health': "OK",
        'version': '1.0',
        'build': '20210617'
    }


if __name__ == "__main__":
    register_blueprints()
    with app.app_context():
        db.create_all()
        UsersController().create_default_user(username=app.config['DEFAULT_USERNAME'],
                                              password=app.config['DEFAULT_PASSWORD'])
    app.run(host=app.config['HOST'], port=app.config['PORT'])
