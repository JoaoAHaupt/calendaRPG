from app import db

class User(db.Model):
    __tablename__ = 'user'

    pid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, nullable=False)
    email = db.Column(db.Text, nullable=False)
    password = db.Column(db.Text, nullable=False)
    
    def __repr__(self):
        return f'User with name {self.username}'
    