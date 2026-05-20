from pydantic import BaseModel
from datetime import date

class ExpenseCreate(BaseModel):
    title: str
    amount: float
    category: str
    type: str
    date: date