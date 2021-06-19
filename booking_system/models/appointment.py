from models import db


class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    start_timestamp = db.Column(db.DateTime, nullable=False)
    end_timestamp = db.Column(db.DateTime, nullable=False)

    user = db.relationship('User', backref=db.backref('Appointment'))

    def __repr__(self):
        return '<Appointment %r>' % self.id

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'start_timestamp': self.start_timestamp.isoformat(),
            'end_timestamp': self.end_timestamp.isoformat()
        }
