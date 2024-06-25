from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Session(Base):
    __tablename__ = 'session'
    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(Date, unique=True, nullable=False)
    description = Column(String(400))
    campaign_id = Column(Integer, ForeignKey('campaign.id')) 
    campaign = relationship("Campaign", backref="sessions")

    def __init__(self, date, description=None):
        self.date = date
        self.description = description

    def __repr__(self):
        return f'<Session(date={self.date}, description={self.description})>'
