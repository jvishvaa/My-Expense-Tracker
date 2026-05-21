from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import Base
from app.database.db import engine

from app.models.user import User
from app.models.expense import Expense
from app.models.category import Category
from app.models.budget import Budget

from app.routes.auth import (
    router as auth_router
)

from app.routes.expense import (
    router as expense_router
)

from app.routes.category import (
    router as category_router
)

from app.routes.analytics import (
    router as analytics_router
)

from app.routes.budget import (
    router as budget_router
)

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

app.include_router(expense_router)

app.include_router(category_router)

app.include_router(analytics_router)

app.include_router(budget_router)

@app.get("/")
def home():
    return {
        "message": "Expense Tracker API"
    }