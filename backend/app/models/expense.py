from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import Date
from sqlalchemy import ForeignKey

from app.database.db import Base

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    amount = Column(Float, nullable=False)

    category = Column(String, nullable=False)

    type = Column(String, nullable=False)

    date = Column(Date, nullable=False)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )