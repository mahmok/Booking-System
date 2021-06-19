import enum

from sqlalchemy.orm import validates

from models import db
from models.appointment import Appointment


class UserTypes(enum.Enum):
    MEMBER = "MEMBER"
    ADMIN = "ADMIN"
    SUPER_USER = "SUPER_USER"

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    role = db.Column(db.Enum(UserTypes), nullable=False)
    appointments = db.relationship(Appointment)

    @validates('role')
    def validate_role(self, key, role):
        types = [e.name for e in UserTypes]
        if role.upper() not in types:
            raise ValueError(f"{role} is not a valid role. Valid roles are ({types})")
        return role

    def __repr__(self):
        return '<User %r>' % self.username

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'role': self.role
        }