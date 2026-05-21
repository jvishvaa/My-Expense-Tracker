from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from collections import defaultdict

from app.database.db import SessionLocal

from app.models.expense import Expense

from app.models.budget import Budget

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.get("/insights")
def get_insights(
    db: Session = Depends(get_db)
):
    expenses = (
        db.query(Expense)
        .filter(
            Expense.type == "expense"
        )
        .all()
    )

    budgets = db.query(Budget).all()

    insights = []

    # category totals
    category_totals = defaultdict(float)

    total_spent = 0

    for expense in expenses:
        category_totals[
            expense.category
        ] += expense.amount

        total_spent += expense.amount

    # top category
    if category_totals:
        top_category = max(
            category_totals,
            key=category_totals.get
        )

        insights.append(
            {
                "title":
                "Highest Spending",

                "message":
                f"{top_category} is your highest spending category."
            }
        )

    # budget exceeded
    for budget in budgets:
        spent = category_totals.get(
            budget.category,
            0
        )

        if spent > budget.monthly_limit:
            percent = round(
                (
                    spent
                    / budget.monthly_limit
                    - 1
                )
                * 100
            )

            insights.append(
                {
                    "title":
                    "Budget Exceeded",

                    "message":
                    f"You exceeded {budget.category} budget by {percent}%."
                }
            )

    # savings insight
    income = (
        db.query(Expense)
        .filter(
            Expense.type == "income"
        )
        .all()
    )

    total_income = sum(
        item.amount
        for item in income
    )

    savings = (
        total_income - total_spent
    )

    if savings > 0:
        insights.append(
            {
                "title":
                "Savings",

                "message":
                f"You saved ₹{round(savings)} this month."
            }
        )

    return insights