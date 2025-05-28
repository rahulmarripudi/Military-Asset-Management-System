-- Insert initial admin user (password is 'admin123' - hashed)
INSERT INTO users (id, name, rank, email, password, unit)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'System Administrator',
    'Administrator',
    'admin@mams.mil',
    '$2a$10$rKN3VJSqZHG.bfYoGp9tB.kJ.UZ0RTaWZ0YU0PRKlGPZqfZ6Hv1tq',
    'System Administration'
);

INSERT INTO user_roles (user_id, role)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'ADMIN');

-- Insert initial locations
INSERT INTO locations (name, type, latitude, longitude, country)
VALUES
    ('Fort Bradley', 'BASE', 38.7849, -76.7723, 'USA'),
    ('Camp Sentinel', 'OUTPOST', 36.1699, -115.1398, 'USA'),
    ('Delta Forward Operating Base', 'FACILITY', 33.9416, -118.4085, 'USA'),
    ('Eagle Depot', 'DEPOT', 40.7128, -74.0060, 'USA'),
    ('Thunder Outpost', 'OUTPOST', 29.7604, -95.3698, 'USA');