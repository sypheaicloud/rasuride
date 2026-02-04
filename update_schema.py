from sqlalchemy import create_engine, text

DATABASE_URL = "postgresql://postgres:password123@localhost:5432/rasuride_db"
engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    try:
        conn.execute(text("UPDATE users SET is_admin = TRUE WHERE email = 'djboziah@gmail.com'"))
        conn.commit()
        print("✅ Updated 'djboziah@gmail.com' to admin.")
    except Exception as e:
        print(f"❌ Error: {e}")
