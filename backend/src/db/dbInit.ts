const {Pool} = require('pg');


const initScript = `
-- Drop existing tables if they exist
DROP TABLE IF EXISTS favorites, payments, bookings, property_photos, properties, property_type, categories, districts, cities, users;

-- Users table creation and sample data insertion
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(255) UNIQUE NOT NULL,
    birth_date DATE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE cities (
    city_id SERIAL PRIMARY KEY,
    city_name VARCHAR(100) NOT NULL
);

CREATE TABLE districts (
    district_id SERIAL PRIMARY KEY,
    district_name VARCHAR(100) NOT NULL,
    city_id INT REFERENCES cities(city_id)
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

CREATE TABLE property_type (
    type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL
);

CREATE TABLE properties (
    property_id SERIAL PRIMARY KEY,
    property_name VARCHAR(255) NOT NULL,
    city_id INT REFERENCES cities(city_id),
    district_id INT REFERENCES districts(district_id),
    category_id INT REFERENCES categories(category_id),
    type_id INT REFERENCES property_type(type_id),
    room_count INT,
    bed_count INT,
    price DECIMAL(10, 2),
    description TEXT
);

CREATE TABLE property_photos (
    photo_id SERIAL PRIMARY KEY,
    property_id INT REFERENCES properties(property_id),
    photo BYTEA NOT NULL
);

CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    property_id INT REFERENCES properties(property_id),
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE, 
    CONSTRAINT check_in_out_dates CHECK (check_in_date < check_out_date)
);

CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    property_id INT REFERENCES properties(property_id), 
    amount DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE favorites (
    favorite_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    property_id INT REFERENCES properties(property_id),
    UNIQUE(user_id, property_id)
);

INSERT INTO users (first_name, last_name, phone_number, email, birth_date, password) VALUES
('John', 'Doe', '123-456-7890', 'john.doe@example.com', '1990-01-01', '12345'),
('Jane', 'Smith', '123-456-7891', 'jane.smith@example.com', '1991-02-02', '12345'),
('Alice', 'Johnson', '123-456-7892', 'alice.johnson@example.com', '1992-03-03', '12345'),
('Bob', 'Williams', '123-456-7893', 'bob.williams@example.com', '1993-04-04', '12345'),
('Carol', 'Brown', '123-456-7894', 'carol.brown@example.com', '1994-05-05', '12345'),
('David', 'Jones', '123-456-7895', 'david.jones@example.com', '1995-06-06', '12345'),
('Eve', 'Miller', '123-456-7896', 'eve.miller@example.com', '1996-07-07', '12345'),
('Frank', 'Davis', '123-456-7897', 'frank.davis@example.com', '1997-08-08', '12345'),
('Grace', 'Garcia', '123-456-7898', 'grace.garcia@example.com', '1998-09-09', '12345'),
('Hank', 'Martinez', '123-456-7899', 'hank.martinez@example.com', '1999-10-10', '12345'),
('Sarah', 'Wilson', '123-456-7900', 'sarah.wilson@example.com', '2000-11-11', '12345'),
('Michael', 'Brown', '123-456-7901', 'michael.brown@example.com', '1989-12-12', '12345'),
('Olivia', 'Rodriguez', '123-456-7902', 'olivia.rodriguez@example.com', '1988-01-13', '12345'),
('James', 'Gonzalez', '123-456-7903', 'james.gonzalez@example.com', '1987-02-14', '12345'),
('Emma', 'Lopez', '123-456-7904', 'emma.lopez@example.com', '1986-03-15', '12345'),
('Daniel', 'Hernandez', '123-456-7905', 'daniel.hernandez@example.com', '1985-04-16', '12345'),
('Sophia', 'Jackson', '123-456-7906', 'sophia.jackson@example.com', '1984-05-17', '12345'),
('Liam', 'Morgan', '123-456-7907', 'liam.morgan@example.com', '1983-06-18', '12345'),
('Isabella', 'Smith', '123-456-7908', 'isabella.smith@example.com', '1982-07-19', '12345'),
('Logan', 'Martin', '123-456-7909', 'logan.martin@example.com', '1981-08-20', '12345'),
('Mia', 'Garcia', '123-456-7910', 'mia.garcia@example.com', '1980-09-21', '12345');

-- 20 sample records for cities
INSERT INTO cities (city_name) VALUES
('New York'),
('Los Angeles'),
('Chicago'),
('Houston'),
('Phoenix'),
('Philadelphia'),
('San Antonio'),
('San Diego'),
('Dallas'),
('San Jose'),
('Austin'),
('Jacksonville'),
('San Francisco'),
('Indianapolis'),
('Seattle'),
('Denver'),
('Washington'),
('Boston'),
('El Paso'),
('Nashville');

-- 20 sample records for districts
INSERT INTO districts (district_name, city_id) VALUES
('Manhattan', 1),
('Brooklyn', 1),
('Hollywood', 2),
('Downtown', 2),
('Lincoln Park', 3),
('Hyde Park', 3),
('Midtown', 4),
('Uptown', 4),
('North Mountain', 5),
('South Mountain', 5),
('Downtown', 6),
('Westside', 6),
('Financial District', 7),
('East Village', 7),
('Gaslamp Quarter', 8),
('Pacific Beach', 8),
('Downtown', 9),
('Uptown', 9),
('Downtown', 10),
('Willow Glen', 10);

-- 20 sample records for categories
INSERT INTO categories (category_name) VALUES
('Apartment'),
('House'),
('Condo'),
('Townhouse'),
('Studio'),
('Loft'),
('Villa'),
('Cottage'),
('Duplex'),
('Penthouse'),
('Mansion'),
('Farmhouse'),
('Bungalow'),
('Chalet'),
('Ranch'),
('Mobile Home'),
('Castle'),
('Treehouse'),
('Boat House'),
('Cabin');

-- 20 sample records for property_type
INSERT INTO property_type (type_name) VALUES
('Residential'),
('Commercial'),
('Industrial'),
('Land'),
('Mixed Use'),
('Retail'),
('Office'),
('Multi-family'),
('Single-family'),
('Agricultural'),
('Vacant Land'),
('Warehouse'),
('Restaurant'),
('Hotel'),
('Convenience Store'),
('Apartment Complex'),
('Shopping Center'),
('Office Building'),
('Townhome'),
('Farm');

-- 20 sample records for properties
INSERT INTO properties (property_name, city_id, district_id, category_id, type_id, room_count, bed_count, price, description) VALUES
('Cozy Apartment', 1, 1, 1, 1, 3, 2, 1500.00, 'A cozy apartment in the heart of the city.'),
('Luxury Condo', 2, 3, 3, 2, 4, 3, 2500.00, 'A luxury condo with stunning views.'),
('Spacious House', 3, 5, 2, 1, 5, 4, 3500.00, 'A spacious house with a large garden.'),
('Modern Loft', 4, 7, 6, 2, 2, 1, 1800.00, 'A modern loft in the downtown area.'),
('Beachfront Villa', 5, 9, 7, 1, 6, 5, 4500.00, 'A beachfront villa with private access to the beach.'),
('Charming Cottage', 6, 10, 8, 1, 4, 3, 3000.00, 'A charming cottage in a quiet neighborhood.'),
('Downtown Studio', 7, 8, 5, 2, 1, 1, 1200.00, 'A studio apartment in the downtown area.'),
('Elegant Townhouse', 8, 6, 4, 1, 3, 2, 2000.00, 'An elegant townhouse with modern amenities.'),
('Rustic Duplex', 9, 4, 9, 1, 3, 2, 1600.00, 'A rustic duplex with a vintage charm.'),
('Penthouse Suite', 10, 2, 10, 2, 5, 4, 5000.00, 'A penthouse suite with panoramic views.'),
('Urban Apartment', 1, 2, 1, 1, 2, 1, 1300.00, 'An apartment in a bustling urban area.'),
('Suburban House', 2, 4, 2, 1, 4, 3, 2800.00, 'A house with a spacious backyard in a suburban neighborhood.'),
('Beach House', 3, 6, 2, 1, 4, 3, 3800.00, 'A beachfront house with direct access to the ocean.'),
('Historic Loft', 4, 8, 6, 2, 2, 1, 1900.00, 'A loft located in a historic building.'),
('Mountain Retreat', 5, 10, 8, 1, 3, 2, 3200.00, 'A cozy cottage nestled in the mountains.'),
('City Studio', 6, 1, 5, 2, 1, 1, 1100.00, 'A studio apartment in the heart of the city.'),
('Luxury Townhome', 7, 3, 4, 1, 3, 2, 2200.00, 'A luxurious townhome with modern architecture.'),
('Vintage Duplex', 8, 5, 9, 1, 3, 2, 1700.00, 'A duplex featuring vintage interior design.'),
('Skyline Penthouse', 9, 7, 10, 2, 5, 4, 5200.00, 'A penthouse offering breathtaking skyline views.'),
('Coastal Villa', 10, 9, 7, 1, 6, 5, 4800.00, 'A villa overlooking the coast with luxurious amenities.');

-- 20 sample records for bookings
INSERT INTO bookings (user_id, property_id, check_in_date, check_out_date, is_approved) VALUES
(1, 1, '2024-07-01', '2024-07-07', TRUE),
(2, 2, '2024-08-01', '2024-08-07', FALSE),
(3, 3, '2024-09-01', '2024-09-07', TRUE),
(4, 4, '2024-10-01', '2024-10-07', FALSE),
(5, 5, '2024-11-01', '2024-11-07', TRUE),
(6, 6, '2024-12-01', '2024-12-07', FALSE),
(7, 7, '2025-01-01', '2025-01-07', TRUE),
(8, 8, '2025-02-01', '2025-02-07', FALSE),
(9, 9, '2025-03-01', '2025-03-07', TRUE),
(10, 10, '2025-04-01', '2025-04-07', FALSE),
(11, 11, '2025-05-01', '2025-05-07', TRUE),
(12, 12, '2025-06-01', '2025-06-07', FALSE),
(13, 13, '2025-07-01', '2025-07-07', TRUE),
(14, 14, '2025-08-01', '2025-08-07', FALSE),
(15, 15, '2025-09-01', '2025-09-07', TRUE),
(16, 16, '2025-10-01', '2025-10-07', FALSE),
(17, 17, '2025-11-01', '2025-11-07', TRUE),
(18, 18, '2025-12-01', '2025-12-07', FALSE),
(19, 19, '2026-01-01', '2026-01-07', TRUE),
(20, 20, '2026-02-01', '2026-02-07', FALSE);



-- 20 sample records for favorites
INSERT INTO favorites (user_id, property_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12),
(13, 13),
(14, 14),
(15, 15),
(16, 16),
(17, 17),
(18, 18),
(19, 19),
(20, 20);
`

export const runInitScript = async () => {
    const pool = new Pool({
        connectionString : process.env.POSTGRESQL_URL + "?ssl=true"
      });
    const client = await pool.connect();
    try {
        await client.query(initScript);
        console.log("Database values initialized successfully");
    } catch (error) {
        console.error("Error executing init script")
    } finally{
        client.release();
    }
}

