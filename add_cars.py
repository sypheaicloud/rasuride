from sqlalchemy import create_engine, text

# --- DATABASE CONNECTION ---
DATABASE_URL = "postgresql://postgres:password123@localhost:5432/rasuride_db"
engine = create_engine(DATABASE_URL)

# --- THE LIST OF CARS (Now with License Plates!) ---
cars_to_add = [
    {
        "make": "Toyota",
        "model": "Land Cruiser Prado",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/62/Toyota_Land_Cruiser_Prado_%28J150%2C_2nd_Facelift%29_%E2%80%93_Frontansicht%2C_25._Juni_2018%2C_D%C3%BCsseldorf.jpg",
        "price": 150.0,
        "active": True,
        "plate": "KCA 111A"
    },
    {
        "make": "Mazda",
        "model": "Axio",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f8/2008_Toyota_Corolla_Axio_01.jpg",
        "price": 45.0,
        "active": True,
        "plate": "KCB 222B"
    },
    {
        "make": "Mercedes",
        "model": "C-Class",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/18/Mercedes-Benz_C_200_Avantgarde_%28W_205%29_%E2%80%93_Frontansicht%2C_26._April_2014%2C_D%C3%BCsseldorf.jpg",
        "price": 120.0,
        "active": True,
        "plate": "KCC 333C"
    },
    {
        "make": "Subaru",
        "model": "Outback",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d7/2018_Subaru_Outback_2.5i_Premium_front_4.16.18.jpg",
        "price": 80.0,
        "active": True,
        "plate": "KCD 444D"
    },
    {
        "make": "Toyota",
        "model": "Vitz",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/05/Toyota_Vitz_1.0_F_Smart_Stop_Package_Jewela_%28DBA-KSP130%29_front.jpg",
        "price": 30.0,
        "active": True,
        "plate": "KCE 555E"
    }
]

# --- RUN THE INSERTION ---
try:
    with engine.connect() as conn:
        print("🔌 Connected to Database...")
        
        for car in cars_to_add:
            # We added 'license_plate' to the SQL command below
            query = text("""
                INSERT INTO cars (make, model, image_url, price_per_day, is_active, license_plate)
                VALUES (:make, :model, :image_url, :price, :active, :plate)
            """)
            conn.execute(query, car)
            print(f"✅ Added: {car['make']} {car['model']} ({car['plate']})")
            
        conn.commit()
        print("🎉 All cars added successfully!")

except Exception as e:
    print(f"❌ Error: {e}")