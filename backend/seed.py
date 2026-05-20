from app.database.db import SessionLocal

from app.models.category import Category

db = SessionLocal()

categories = [
    {"name": "Food", "type": "expense"},
    {"name": "Travel", "type": "expense"},
    {"name": "Shopping", "type": "expense"},
    {"name": "Bills", "type": "expense"},
    {"name": "Salary", "type": "income"},
    {"name": "Freelance", "type": "income"},
]

for item in categories:
    exists = db.query(Category).filter(
        Category.name == item["name"]
    ).first()

    if not exists:
        db.add(Category(**item))

db.commit()

print("Categories seeded")