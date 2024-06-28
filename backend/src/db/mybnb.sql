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
    booking_id INT REFERENCES bookings(booking_id),
    amount DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorites (
    favorite_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    property_id INT REFERENCES properties(property_id),
    UNIQUE(user_id, property_id)
);

CREATE TABLE property_reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    property_id INT REFERENCES properties(property_id),
    comment_text TEXT NOT NULL,
    comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
