import hashlib

from flask_jwt_extended import create_access_token

from models import db
from models.user import User, UserTypes


class UsersController():
    def __init__(self):
        pass

    def get_all(self):
        """
        Gets all users from the database.
        TODO: Add pagination.
        :return: User[]
        """
        result = []
        for user in User.query.all():
            result.append(user.to_dict())
        return result

    def get(self, id):
        """
        Gets user by ID from the database.
        :return: User
        """
        return User.query.get(id).to_dict()

    def create(self, name, username, password):
        """
        Creates a new user
        :param name: str
        :param username: str
        :param password: str
        :return: User
        """
        user = User(name=name, username=username, password=hashlib.sha512(password.encode('utf-8')).digest(),
                    role=UserTypes.MEMBER.value)
        db.session.add(user)
        db.session.commit()
        return user.to_dict()

    def login(self, username, password):
        """
        Returns an access token for the authorized user.
        :param username: str
        :param password: str
        :return: JWT: str
        """
        user = User.query.filter_by(username=username).first()
        if not user:
            raise Exception(f"Invalid username/password")

        if user.password != hashlib.sha512(password.encode('utf-8')).digest():
            raise Exception(f"Invalid username/password")

        return create_access_token(identity=user.id, additional_claims={'username': user.username, 'role': user.role})

    def update(self, id, name, role):
        """
        Updates a user
        :param id: str
        :param name: str
        :param role: UserType
        :return: User
        """
        user = User.query.get(id)
        if not user:
            raise Exception("User not found.")

        # TODO: Make attributes update dynamic, instead of writing multiple conditions
        if name:
            user.name = name
        if role:
            user.role = role
        db.session.commit()
        return user.to_dict()

    def create_default_user(self, username, password):
        """
        Creates a default super user if the users table is empty
        :param username: str
        :param password: str
        """
        users_count = User.query.count()
        if users_count == 0:
            user = User(name="Default User", username=username, password=hashlib.sha512(password.encode('utf-8')).digest(), role=UserTypes.SUPER_USER.value)
            db.session.add(user)
            db.session.commit()
