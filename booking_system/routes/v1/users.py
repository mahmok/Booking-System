from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity

from controllers.users_controller import UsersController
from models.user import UserTypes
from utils.standard_response import StandardResponse

users_blueprint = Blueprint('users_blueprint', __name__, url_prefix='/api/v1/users')


@users_blueprint.route('', methods=['GET'])
@jwt_required()
def get_users():
    try:
        claims = get_jwt()
        role = claims.get('role', "")
        if role == UserTypes.SUPER_USER.value or role == UserTypes.ADMIN.value:
            return StandardResponse(UsersController().get_all(), 200).to_json()
        return StandardResponse(f"Access forbidden", 403).to_json()
    except Exception as e:
        return StandardResponse(f"Error while getting users. ({e})", 500).to_json()


@users_blueprint.route('', methods=['POST'])
def create_user():
    try:
        return StandardResponse(UsersController().create(**request.json), 200).to_json()
    except Exception as e:
        return StandardResponse(f"Error while creating user. ({e})", 500).to_json()


@users_blueprint.route('/auth', methods=['POST'])
def login():
    try:
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        if not username or not password:
            return StandardResponse(f"Username/password cannot be empty", 400).to_json()
        return StandardResponse(UsersController().login(username, password), 200).to_json()
    except Exception as e:
        return StandardResponse(f"{e}", 403).to_json()


@users_blueprint.route('/<id>', methods=['PUT', 'PATCH'])
@jwt_required()
def update(id):
    try:
        claims = get_jwt()
        role = claims.get('role', "")
        name = request.json.get("name", None)
        if role == UserTypes.SUPER_USER.value:
            new_role = request.json.get("role", None)
            return StandardResponse(UsersController().update(id, name, new_role), 200).to_json()
        elif int(id) == int(get_jwt_identity()):
            return StandardResponse(UsersController().update(id, name, UserTypes.MEMBER.value), 200).to_json()
        return StandardResponse(f"Access forbidden", 403).to_json()
    except Exception as e:
        return StandardResponse(f"Error while updating user. {e}", 500).to_json()


@users_blueprint.route('/<id>', methods=['PUT', 'PATCH'])
@jwt_required()
def get_user(id):
    try:
        claims = get_jwt()
        role = claims.get('role', "")
        if role == UserTypes.SUPER_USER.value or role == UserTypes.ADMIN.value:
            return StandardResponse(UsersController().get(id), 200).to_json()
        elif int(id) == int(get_jwt_identity()):
            return StandardResponse(UsersController().get(id), 200).to_json()
        return StandardResponse(f"Access forbidden", 403).to_json()
    except Exception as e:
        return StandardResponse(f"Error while updating user. {e}", 500).to_json()
