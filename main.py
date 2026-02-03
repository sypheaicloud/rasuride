from fastapi import FastAPI, Query, HTTPException, File, UploadFile, Form
from sqlalchemy import create_engine, text
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from passlib.context import CryptContext 
from typing import Optional, List
import requests 
import os
import shutil
from fastapi.staticfiles import StaticFiles
from datetime import datetime

app = FastAPI()

# --- 📁 IMAGE UPLOAD SETUP ---
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# --- DATABASE CONNECTION ---
DATABASE_URL = "postgresql://postgres:password123@localhost:5432/rasuride_db"

try:
    engine = create_engine(DATABASE_URL)
    print("✅ Database connection object created successfully.")
except Exception as e:
    print(f"❌ Error creating engine: {e}")

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- SECURITY SETUP ---
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# --- HELPER: CATEGORY SORTER ---
def determine_category(model: str):
    model_lower = model.lower()
    if "vitz" in model_lower or "axio" in model_lower or "demio" in model_lower:
        return "Economy"
    elif "mercedes" in model_lower or "c-class" in model_lower:
        return "Crossover" 
    else:
        return "SUV"

# --- DATA MODELS ---
class UserSignup(BaseModel):
    full_name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class GoogleLoginRequest(BaseModel):
    token: str

class BookingRequest(BaseModel):
    user_id: Optional[int] = None 
    car_id: int
    start_date: str
    end_date: str
    customer_name: str
    customer_email: str
    customer_phone: str
    total_price: float

class PriceUpdate(BaseModel):
    new_price: int

class StatusUpdate(BaseModel):
    is_active: bool

class BanUpdate(BaseModel):
    is_banned: bool

# --- 🚀 CAR ENDPOINTS ---

@app.post("/cars/upload")
async def add_car_with_upload(
    make: str = Form(...),
    model: str = Form(...),
    price_per_day: int = Form(...),
    license_plate: str = Form(...),
    image: UploadFile = File(...)
):
    try:
        file_path = os.path.join(UPLOAD_DIR, image.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        
        image_url = f"http://localhost:8000/uploads/{image.filename}"
        
        with engine.connect() as conn:
            query = text("""
                INSERT INTO cars (make, model, license_plate, image_url, price_per_day, is_active)
                VALUES (:make, :model, :plate, :image, :price, true)
            """)
            conn.execute(query, {"make": make, "model": model, "plate": license_plate, "image": image_url, "price": price_per_day})
            conn.commit()
            
        return {"message": "Car added successfully!", "url": image_url}
    except Exception as e:
        print(f"❌ Upload Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/cars")
def get_cars(start_date: str = Query(None), end_date: str = Query(None)):
    try:
        with engine.connect() as conn:
            sql_query = "SELECT id, make, model, license_plate, image_url, price_per_day, is_active FROM cars WHERE is_active = true"
            params = {}
            if start_date and end_date:
                sql_query += """
                AND id NOT IN (
                    SELECT car_id FROM bookings 
                    WHERE start_date <= :end_date 
                    AND end_date >= :start_date
                    AND status = 'Confirmed'
                )
                """
                params = {"start_date": start_date, "end_date": end_date}
            query = text(sql_query)
            result = conn.execute(query, params)
            cars_list = []
            for row in result.mappings():
                cat = determine_category(row["model"])
                cars_list.append({
                    "id": row["id"],
                    "make": row["make"],
                    "model": row["model"],
                    "image": row["image_url"],      
                    "price": row["price_per_day"],
                    "category": cat,
                    "transmission": "Automatic",    
                    "people": 5,                    
                    "features": ["GPS", "Bluetooth", "4x4"], 
                    "active": row["is_active"]
                })
            return cars_list
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return {"error": str(e)}

@app.delete("/cars/{car_id}")
def delete_car(car_id: int):
    try:
        with engine.connect() as conn:
            conn.execute(text("DELETE FROM bookings WHERE car_id = :id"), {"id": car_id})
            conn.execute(text("DELETE FROM cars WHERE id = :id"), {"id": car_id})
            conn.commit()
            return {"message": "Car and its history deleted successfully"}
    except Exception as e:
        print(f"❌ Delete Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.patch("/cars/{car_id}/price")
def update_car_price(car_id: int, data: PriceUpdate):
    try:
        with engine.connect() as conn:
            conn.execute(text("UPDATE cars SET price_per_day = :p WHERE id = :id"), {"p": data.new_price, "id": car_id})
            conn.commit()
            return {"message": "Price updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.patch("/cars/{car_id}/status")
def toggle_car_status(car_id: int, data: StatusUpdate):
    try:
        with engine.connect() as conn:
            conn.execute(text("UPDATE cars SET is_active = :s WHERE id = :id"), {"s": data.is_active, "id": car_id})
            conn.commit()
            return {"message": "Status updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- 📊 ADMIN & BOOKINGS ---

@app.get("/admin/cars")
def get_all_cars_admin():
    try:
        with engine.connect() as conn:
            query = text("SELECT id, make, model, license_plate, image_url, price_per_day, is_active FROM cars ORDER BY id DESC")
            result = conn.execute(query)
            cars_list = []
            for row in result.mappings():
                cars_list.append({
                    "id": row["id"],
                    "make": row["make"],
                    "model": row["model"],
                    "image": row["image_url"],      
                    "image_url": row["image_url"],
                    "price": row["price_per_day"],
                    "price_per_day": row["price_per_day"],
                    "license_plate": row["license_plate"],
                    "active": row["is_active"],
                    "is_active": row["is_active"]
                })
            return cars_list
    except Exception as e:
        print(f"❌ Error fetching admin cars: {str(e)}")
        return []

@app.get("/admin/stats")
def get_admin_stats():
    try:
        with engine.connect() as conn:
            rev_query = text("SELECT SUM(total_price) FROM bookings WHERE status = 'Confirmed'")
            rev_result = conn.execute(rev_query).fetchone()
            total_revenue = rev_result[0] if rev_result and rev_result[0] else 0
            
            total_cars = conn.execute(text("SELECT COUNT(*) FROM cars")).fetchone()[0]
            active_cars = conn.execute(text("SELECT COUNT(*) FROM cars WHERE is_active = true")).fetchone()[0]
            
            return {"total_revenue": total_revenue, "total_cars": total_cars, "active_cars": active_cars}
    except Exception as e:
        return {"total_revenue": 0, "total_cars": 0, "active_cars": 0}

@app.post("/bookings")
def create_booking(booking: BookingRequest):
    try:
        with engine.connect() as conn:
            query = text("""
                INSERT INTO bookings 
                (user_id, car_id, start_date, end_date, customer_name, customer_email, customer_phone, total_price, status, created_at)
                VALUES 
                (:uid, :cid, :start, :end, :name, :email, :phone, :price, 'Confirmed', NOW())
            """)
            conn.execute(query, {
                "uid": booking.user_id,
                "cid": booking.car_id,
                "start": booking.start_date,
                "end": booking.end_date,
                "name": booking.customer_name,
                "email": booking.customer_email,
                "phone": booking.customer_phone,
                "price": booking.total_price
            })
            conn.commit()
            return {"message": "Booking successful!"}
    except Exception as e:
        print(f"❌ Booking Creation Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/my-bookings/{user_id}")
def get_user_bookings(user_id: int):
    try:
        with engine.connect() as conn:
            query = text("""
                SELECT b.id, c.make, c.model, c.image_url, b.start_date, b.end_date, b.total_price, b.status 
                FROM bookings b
                JOIN cars c ON b.car_id = c.id
                WHERE b.user_id = :uid
                ORDER BY b.start_date DESC
            """)
            result = conn.execute(query, {"uid": user_id})
            bookings_list = []
            for row in result.mappings():
                bookings_list.append({
                    "id": row["id"],
                    "make": row["make"],
                    "model": row["model"],
                    "image_url": row["image_url"],
                    "start_date": row["start_date"],
                    "end_date": row["end_date"],
                    "total_price": row["total_price"],
                    "status": row["status"]
                })
            return bookings_list
    except Exception as e:
        print(f"❌ Error fetching user bookings: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/admin/bookings")
def get_all_bookings():
    try:
        with engine.connect() as conn:
            query = text("""
                SELECT b.id, COALESCE(b.customer_name, u.full_name, 'Unknown') as customer, 
                COALESCE(b.customer_email, u.email, 'No Email') as email, c.make, c.model, 
                b.start_date, b.end_date, b.status, b.total_price 
                FROM bookings b
                JOIN cars c ON b.car_id = c.id
                LEFT JOIN users u ON b.user_id = u.id
                ORDER BY b.start_date DESC
            """)
            result = conn.execute(query)
            bookings_list = []
            for row in result.mappings():
                bookings_list.append({
                    "id": row["id"],
                    "customer": row["customer"],
                    "email": row["email"],
                    "car": f"{row['make']} {row['model']}",
                    "dates": f"{row['start_date']} to {row['end_date']}",
                    "status": row["status"],
                    "price": row["total_price"]
                })
            return bookings_list
    except Exception as e:
        print(f"❌ Error fetching bookings: {e}")
        return []

@app.delete("/bookings/{booking_id}")
def delete_booking(booking_id: int):
    with engine.connect() as conn:
        conn.execute(text("DELETE FROM bookings WHERE id = :id"), {"id": booking_id})
        conn.commit()
        return {"message": "Deleted"}

# --- 👮 ADMIN USER MANAGEMENT (BAN/DELETE) ---

@app.get("/admin/users")
def get_all_users():
    with engine.connect() as conn:
        # Include is_banned column
        return conn.execute(text("SELECT id, full_name, email, is_banned, (password_hash = 'GOOGLE_AUTH_USER') as is_google_user FROM users ORDER BY id DESC")).mappings().all()

@app.patch("/users/{user_id}/ban")
def toggle_user_ban(user_id: int, data: BanUpdate):
    with engine.connect() as conn:
        conn.execute(text("UPDATE users SET is_banned = :b WHERE id = :id"), {"b": data.is_banned, "id": user_id})
        conn.commit()
        return {"message": "User status updated"}

@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    """
    Deletes user AND their booking history (Cascade)
    """
    try:
        with engine.connect() as conn:
            conn.execute(text("DELETE FROM bookings WHERE user_id = :id"), {"id": user_id})
            conn.execute(text("DELETE FROM users WHERE id = :id"), {"id": user_id})
            conn.commit()
            return {"message": "User permanently deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- AUTH (UPDATED LOGIN) ---

@app.post("/google-login")
def google_login(request: GoogleLoginRequest):
    try:
        google_res = requests.get(f"https://www.googleapis.com/oauth2/v3/userinfo?access_token={request.token}")
        google_data = google_res.json()
        email = google_data.get("email")
        name = google_data.get("name")
        is_admin = True if email == "djboziah@gmail.com" else False
        with engine.connect() as conn:
            query = text("SELECT id, full_name, is_banned FROM users WHERE email = :email")
            existing_user = conn.execute(query, {"email": email}).fetchone()
            
            # 🔴 CHECK IF BANNED
            if existing_user and existing_user.is_banned:
                raise HTTPException(status_code=403, detail="Your account has been suspended by Admin.")

            if existing_user:
                return {"user_id": existing_user[0], "name": existing_user[1], "email": email, "is_admin": is_admin}
            else:
                dummy_pwd = get_password_hash("GOOGLE_AUTH_USER")
                res = conn.execute(text("INSERT INTO users (full_name, email, password_hash, is_banned) VALUES (:n, :e, :p, FALSE) RETURNING id"), {"n": name, "e": email, "p": dummy_pwd})
                conn.commit()
                return {"user_id": res.fetchone()[0], "name": name, "email": email, "is_admin": is_admin}
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/signup")
def signup(user: UserSignup):
    with engine.connect() as conn:
        hashed_pw = get_password_hash(user.password)
        conn.execute(text("INSERT INTO users (full_name, email, password_hash, is_banned) VALUES (:n, :e, :p, FALSE)"), {"n": user.full_name, "e": user.email, "p": hashed_pw})
        conn.commit()
        return {"message": "Success"}

@app.post("/login")
def login(user: UserLogin):
    with engine.connect() as conn:
        # 🔴 Fetch is_banned status
        res = conn.execute(text("SELECT id, full_name, password_hash, is_banned FROM users WHERE email = :e"), {"e": user.email}).fetchone()
        
        if res and verify_password(user.password, res[2]):
            # 🔴 BLOCK IF BANNED
            if res.is_banned:
                raise HTTPException(status_code=403, detail="Your account has been suspended by Admin.")
                
            return {"user_id": res[0], "name": res[1], "email": user.email, "is_admin": (user.email == "djboziah@gmail.com")}
        raise HTTPException(status_code=400, detail="Invalid credentials")