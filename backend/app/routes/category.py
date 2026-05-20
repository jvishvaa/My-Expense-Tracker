from fastapi import APIRouter

from sqlalchemy.orm import Session

from fastapi import Depends

from app.database.db import get_db

from app.models.category import Category

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)

@router.get("/")
def get_categories(
    db: Session = Depends(get_db)
):
    categories = db.query(Category).all()

    return categories