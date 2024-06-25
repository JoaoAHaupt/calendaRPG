from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class UserCampaign(Base):
    __tablename__ = "user_campaign"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship("User", backref="user_campaigns")
    campaign_id = Column(Integer, ForeignKey('campaign.id'))
    campaign = relationship("Campaign", backref="user_campaigns")
    
    def __init__ (self, user_id, campaign_id):
        self.user_id = user_id
        self.campaign_id = campaign_id
    
    def __repr__(self):
        return f'<UserCampaign(id={self.id}, user_id={self.user_id}, campaign_id={self.campaign_id})>'
