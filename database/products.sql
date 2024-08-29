CREATE TABLE products (
    product_uid INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    img_url TEXT,
    price DECIMAL(10, 2) NOT NULL,
    isactive BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR,
    updated_by VARCHAR
);

register admin
regiter user
admin login
user login
create update product
create update users (by addmin);
