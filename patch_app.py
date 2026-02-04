import os

def patch_main():
    file_path = 'main.py'
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()

    new_lines = []
    for line in lines:
        if 'DATABASE_URL = "postgresql://postgres:password123@localhost:5432/rasuride_db"' in line:
            new_lines.append('DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:password123@localhost:5432/rasuride_db")\n')
        elif 'engine = create_engine(DATABASE_URL)' in line:
            new_lines.append(line)
            new_lines.append('    with engine.connect() as conn:\n')
            new_lines.append('        try:\n')
            new_lines.append('            conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE"))\n')
            new_lines.append('            conn.commit()\n')
            new_lines.append('            print("✅ Auto-migration: column added/checked")\n')
            new_lines.append('        except Exception as migration_error:\n')
            new_lines.append('            print(f"ℹ️ Migration info: {migration_error}")\n')
        else:
            new_lines.append(line)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

if __name__ == "__main__":
    patch_main()
    print("Patch applied successfully")
