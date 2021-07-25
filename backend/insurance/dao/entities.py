import datetime

from sqlalchemy import Column, Integer, Numeric, String, DateTime, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils import JSONType

Base = declarative_base()


class Policy(Base):
    '''
    Policies table entity
    '''

    __tablename__ = "policies"
    id = Column(Integer, primary_key=True, autoincrement=True)
    customer_id = Column(Integer)
    date_of_purchase = Column(DateTime)
    fuel = Column(String)
    vehicle_segment = Column(String(1))
    premium = Column(Integer)
    bodily_injury_liability = Column(Integer)
    personal_injury_protection = Column(Integer)
    property_damage_liability = Column(Integer)
    collision = Column(Integer)
    comprehensive = Column(Integer)
    customer_gender = Column(String)
    customer_income_group = Column(String)
    customer_region = Column(String)
    customer_marital_status = Column(Integer)

    def __init__(self,
                 customer_id,
                 fuel,
                 vehicle_segment,
                 premium,
                 bodily_injury_liability,
                 personal_injury_protection,
                 property_damage_liability,
                 collision,
                 comprehensive,
                 customer_gender,
                 customer_income_group,
                 customer_region,
                 customer_marital_status
                 ):
        '''
        Constructor function
        '''
        self.date_of_purchase = datetime.datetime.utcnow(),
        self.customer_id = customer_id,
        self.fuel = fuel,
        self.vehicle_segment = vehicle_segment,
        self.premium = premium,
        self.bodily_injury_liability = bodily_injury_liability,
        self.personal_injury_protection = personal_injury_protection,
        self.property_damage_liability = property_damage_liability,
        self.collision = collision,
        self.comprehensive = comprehensive,
        self.customer_gender = customer_gender,
        self.customer_income_group = customer_income_group,
        self.customer_region = customer_region,
        self.customer_marital_status = customer_marital_status

    def to_dict(self):
        return {c.name: getattr(self, c.name).strftime('%d/%m/%Y') if c.name == "date_of_purchase" else getattr(self, c.name) for c in self.__table__.columns}
