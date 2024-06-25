from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Campaign(Base):
    __tablename__ = "campaign"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(25), nullable=False)
    description = Column(String(400))
    hex_color = Column(String(6))
    dm_id = Column(Integer, ForeignKey('user.id')) 
    user = relationship("User", backref="campaigns")
    
    def __init__(self, name, description=None, hex_color=None, dm_id=None):
        self.name = name
        self.description = description
        self.hex_color = hex_color
        self.dm_id = dm_id

    def __repr__(self):
        return f'<Campaign(id={self.id}, name={self.name}, user_id={self.dm_id})>'
