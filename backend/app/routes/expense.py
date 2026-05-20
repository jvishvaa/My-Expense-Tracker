from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.db import get_db

from app.schemas.expense import ExpenseCreate

from app.models.expense import Expense
from app.models.user import User

from app.core.dependency import (
    get_current_user
)

router = APIRouter(
    prefix="/expenses",
    tags=["Expenses"]
)

@router.post("/")
def create_expense(
    payload: ExpenseCreate,
    db: Session = Depends(get_db),
    # current_user: User = Depends(
    #     get_current_user
    # )
):
    expense = Expense(
        title=payload.title,
        amount=payload.amount,
        category=payload.category,
        type=payload.type,
        date=payload.date,
        user_id=1
    )

    db.add(expense)

    db.commit()

    db.refresh(expense)

    return expense

@router.get("/")
def get_expenses(
    db: Session = Depends(get_db),
    # current_user: User = Depends(
    #     get_current_user
    # )
):
    # expenses = db.query(Expense).filter(
    #     Expense.user_id == current_user.id
    # ).all()
    
    expenses = db.query(Expense).all()

    return expenses

@router.delete("/{expense_id}")
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db)
):
    expense = db.query(Expense).filter(
        Expense.id == expense_id
    ).first()

    if not expense:
        return {
            "message": "Expense not found"
        }

    db.delete(expense)

    db.commit()

    return {
        "message": "Deleted successfully"
    }
    
@router.put("/{expense_id}")
def update_expense(
    expense_id: int,
    payload: ExpenseCreate,
    db: Session = Depends(get_db)
):
    expense = db.query(Expense).filter(
        Expense.id == expense_id
    ).first()

    if not expense:
        return {
            "message": "Expense not found"
        }

    expense.title = payload.title
    expense.amount = payload.amount
    expense.category = payload.category
    expense.type = payload.type
    expense.date = payload.date

    db.commit()

    db.refresh(expense)

    return expense