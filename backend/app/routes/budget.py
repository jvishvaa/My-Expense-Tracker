from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import SessionLocal

from app.models.budget import Budget

router = APIRouter(
    prefix="/budgets",
    tags=["Budgets"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_budget(
    payload: dict,
    db: Session = Depends(get_db)
):
    existing_budget = (
        db.query(Budget)
        .filter(
            Budget.category
            == payload["category"]
        )
        .first()
    )

    if existing_budget:
        existing_budget.monthly_limit = (
            payload["monthly_limit"]
        )

        db.commit()

        db.refresh(existing_budget)

        return existing_budget

    budget = Budget(
        category=payload["category"],
        monthly_limit=payload[
            "monthly_limit"
        ],
    )

    db.add(budget)

    db.commit()

    db.refresh(budget)

    return budget


@router.get("/")
def get_budgets(
    db: Session = Depends(get_db)
):
    return db.query(Budget).all()

@router.delete("/{budget_id}")
def delete_budget(
    budget_id: int,
    db: Session = Depends(get_db)
):
    budget = (
        db.query(Budget)
        .filter(Budget.id == budget_id)
        .first()
    )

    if not budget:
        return {
            "message": "Budget not found"
        }

    db.delete(budget)

    db.commit()

    return {
        "message": "Budget deleted"
    }