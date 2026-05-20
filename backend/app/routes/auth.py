from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from pydantic import BaseModel

from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.user import User
from app.schemas.auth import (
    SignupSchema,
    LoginSchema
)

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

class LoginPayload(BaseModel):
    email: str
    password: str


router = APIRouter()

@router.post("/signup")
def signup(
    payload: SignupSchema,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.email == payload.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_user = User(
        name=payload.name,
        email=payload.email,
        password=hash_password(payload.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully"
    }

@router.post("/login")
def login(
    payload: LoginPayload,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.email == payload.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Invalid credentials"
        )

    if not verify_password(
        payload.password,
        user.password
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {"sub": user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }