from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required, get_jwt

from controllers.appointments_controller import AppointmentsController
from models.user import UserTypes
from utils.standard_response import StandardResponse

appointments_blueprint = Blueprint('appointments_blueprint', __name__, url_prefix='/api/v1/appointments')

@appointments_blueprint.route('', methods=['POST'])
@jwt_required()
def create_appointment():
    try:
        start_timestamp = request.json.get('start_timestamp', None)
        if not start_timestamp:
            return StandardResponse(f"start_timestamp cannot be empty", 400).to_json()
        return StandardResponse(AppointmentsController().create(get_jwt_identity(), start_timestamp), 200).to_json()
    except Exception as e:
        return StandardResponse(f"Error while creating appointment. ({e})", 500).to_json()


@appointments_blueprint.route('/<id>', methods=['PUT', 'PATCH'])
@jwt_required()
def update_appointment(id):
    try:
        start_timestamp = request.json.get('start_timestamp', None)
        if not start_timestamp:
            return StandardResponse(f"start_timestamp cannot be empty", 400).to_json()
        return StandardResponse(AppointmentsController().update(id, get_jwt_identity(), start_timestamp), 200).to_json()
    except Exception as e:
        return StandardResponse(f"Error while updating appointment. ({e})", 500).to_json()


@appointments_blueprint.route('', methods=['GET'])
@jwt_required()
def get_appointments():
    try:
        role = get_jwt().get("role", None)
        if role == UserTypes.ADMIN.value:
            return StandardResponse(AppointmentsController().get_all(), 200).to_json()
        elif role == UserTypes.MEMBER.value:
            return StandardResponse(AppointmentsController().get_by_user(get_jwt_identity()), 200).to_json()
        return StandardResponse(f"Access forbidden", 403).to_json()
    except Exception as e:
        return StandardResponse(f"Error while updating appointment. ({e})", 500).to_json()


@appointments_blueprint.route('/<id>', methods=['GET'])
@jwt_required()
def get_appointment(id):
    try:
        appointment = AppointmentsController().get_by_id(id)
        if int(appointment['user']['id']) != int(get_jwt_identity()):
            return StandardResponse(f"Access forbidden", 403).to_json()
        return StandardResponse(appointment, 200).to_json()

    except Exception as e:
        return StandardResponse(f"Error while updating appointment. ({e})", 500).to_json()


@appointments_blueprint.route('/mine', methods=['GET'])
@jwt_required()
def get_my_appointments():
    try:
        return StandardResponse(AppointmentsController().get_by_user(get_jwt_identity()), 200).to_json()
    except Exception as e:
        return StandardResponse(f"Error while updating appointment. ({e})", 500).to_json()


@appointments_blueprint.route('/<id>', methods=['DELETE'])
@jwt_required()
def delete_appointments(id):
    try:
        return StandardResponse(AppointmentsController().delete(id, get_jwt_identity()), 204).to_json()
    except Exception as e:
        return StandardResponse(f"Error while updating appointment. ({e})", 500).to_json()

