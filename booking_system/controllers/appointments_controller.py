from datetime import datetime, timedelta

from models import db
from models.appointment import Appointment


class AppointmentsController():
    def __init__(self):
        pass

    def create(self, user_id, start_timestamp):
        """
        Creates a new appointment
        :param user_id: str
        :param start_timestamp: str
        :return: Appointment
        """
        start_timestamp = datetime.fromisoformat(start_timestamp)
        if start_timestamp <= datetime.now():
            raise Exception(f"Cannot reserve an appointment in the past.")

        appointments_count = Appointment.query.filter(start_timestamp >= Appointment.start_timestamp) \
            .filter(start_timestamp <= Appointment.end_timestamp).count()

        if appointments_count > 0:
            raise Exception(f"Timeslot is already taken.")

        one_hour_from_start = start_timestamp + timedelta(hours=1)
        appointment = Appointment(user_id=user_id, start_timestamp=start_timestamp, end_timestamp=one_hour_from_start)
        db.session.add(appointment)
        db.session.commit()
        return appointment.to_dict()

    def update(self, id, user_id, start_timestamp):
        """
        Updates an appointment
        :param id: str
        :param user_id: str
        :param start_timestamp: str
        :return: Appointment
        """
        appointment = Appointment.query.get(id)
        if appointment.user.id != user_id:
            raise Exception(f"User ({user_id}) is not authorized to edit this appointment")

        start_timestamp = datetime.fromisoformat(start_timestamp)
        if start_timestamp <= datetime.now():
            raise Exception(f"Cannot reserve an appointment in the past.")

        appointments_count = Appointment.query.filter(start_timestamp >= Appointment.start_timestamp) \
            .filter(start_timestamp <= Appointment.end_timestamp).count()

        if appointments_count > 0:
            raise Exception(f"Timeslot is already taken.")

        one_hour_from_start = start_timestamp + timedelta(hours=1)
        appointment.start_timestamp = start_timestamp
        appointment.end_timestamp = one_hour_from_start
        db.session.commit()
        return appointment.to_dict()

    def get_all(self):
        """
        Gets all appointments
        :return: Appointment[]
        """
        return [appointment.to_dict() for appointment in Appointment.query.all()]

    def get_by_user(self, user_id):
        """
        Get appointments for a specific user
        :param user_id: str
        :return: Appointment[]
        """
        return [appointment.to_dict() for appointment in Appointment.query.filter(Appointment.user_id == user_id).all()]

    def delete(self, id, user_id):
        """
        Deletes an appointment
        :param id: str
        :param user_id: str
        """
        appointment = Appointment.query.get(id)
        if appointment.user.id != user_id:
            raise Exception(f"User ({user_id}) is not authorized to delete this appointment")
        db.session.delete(appointment)
        db.session.commit()

    def get_by_id(self, id):
        """
        Gets an appointment by id
        :return: Appointment
        """
        return Appointment.query.get(id).to_dict()