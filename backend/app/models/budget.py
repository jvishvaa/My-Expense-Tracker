from sqlalchemy import Column, Integer, String, Float

from app.database.db import Base


class Budget(Base):
    __tablename__ = "budgets"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    category = Column(String)

    monthly_limit = Column(Float)