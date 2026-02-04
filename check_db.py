from sqlalchemy import create_engine, text

DATABASE_URL = "postgresql://postgres:password123@localhost:5432/rasuride_db"
engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    result = conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'users'"))
    columns = [row[0] for row in result]
    print(f"Columns in 'users' table: {columns}")
