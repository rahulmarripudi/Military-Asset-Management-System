-- Create enums first
CREATE TYPE asset_type AS ENUM ('VEHICLE', 'WEAPON', 'EQUIPMENT', 'DEVICE', 'AIRCRAFT', 'VESSEL');
CREATE TYPE asset_status AS ENUM ('OPERATIONAL', 'MAINTENANCE', 'DAMAGED', 'DECOMMISSIONED', 'DEPLOYED');
CREATE TYPE asset_condition AS ENUM ('EXCELLENT', 'GOOD', 'FAIR', 'POOR', 'CRITICAL');
CREATE TYPE location_type AS ENUM ('BASE', 'OUTPOST', 'FACILITY', 'DEPOT', 'FIELD');
CREATE TYPE user_role AS ENUM ('ADMIN', 'MANAGER', 'OPERATOR', 'VIEWER');
CREATE TYPE maintenance_type AS ENUM ('ROUTINE', 'REPAIR', 'OVERHAUL', 'INSPECTION');
CREATE TYPE maintenance_status AS ENUM ('COMPLETED', 'SCHEDULED', 'IN_PROGRESS');
CREATE TYPE deployment_status AS ENUM ('ACTIVE', 'COMPLETED', 'PLANNED');

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    rank VARCHAR(100),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    unit VARCHAR(255),
    avatar VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create user_roles junction table
CREATE TABLE user_roles (
    user_id UUID REFERENCES users(id),
    role user_role NOT NULL,
    PRIMARY KEY (user_id, role)
);

-- Create locations table
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type location_type NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    country VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create assets table
CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    serial_number VARCHAR(100) NOT NULL UNIQUE,
    type asset_type NOT NULL,
    subtype VARCHAR(100),
    status asset_status NOT NULL,
    condition asset_condition,
    acquisition_date TIMESTAMP WITH TIME ZONE NOT NULL,
    acquisition_cost DECIMAL(15,2) NOT NULL,
    manufacturer VARCHAR(255),
    model VARCHAR(255),
    description TEXT,
    location_id UUID REFERENCES locations(id),
    assigned_to UUID REFERENCES users(id),
    last_serviced TIMESTAMP WITH TIME ZONE,
    next_service_due TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create asset_images table
CREATE TABLE asset_images (
    asset_id UUID REFERENCES assets(id),
    image_url VARCHAR(255) NOT NULL,
    PRIMARY KEY (asset_id, image_url)
);

-- Create asset_tags table
CREATE TABLE asset_tags (
    asset_id UUID REFERENCES assets(id),
    tag VARCHAR(100) NOT NULL,
    PRIMARY KEY (asset_id, tag)
);

-- Create maintenance_records table
CREATE TABLE maintenance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID NOT NULL REFERENCES assets(id),
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    type maintenance_type NOT NULL,
    description TEXT NOT NULL,
    technician VARCHAR(255),
    cost DECIMAL(15,2),
    status maintenance_status NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create maintenance_parts table
CREATE TABLE maintenance_parts (
    maintenance_id UUID REFERENCES maintenance_records(id),
    part_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (maintenance_id, part_name)
);

-- Create deployment_records table
CREATE TABLE deployment_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID NOT NULL REFERENCES assets(id),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    location VARCHAR(255) NOT NULL,
    mission VARCHAR(255) NOT NULL,
    status deployment_status NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_assets_type ON assets(type);
CREATE INDEX idx_assets_status ON assets(status);
CREATE INDEX idx_assets_location ON assets(location_id);
CREATE INDEX idx_assets_assigned_to ON assets(assigned_to);
CREATE INDEX idx_maintenance_asset ON maintenance_records(asset_id);
CREATE INDEX idx_deployment_asset ON deployment_records(asset_id);
CREATE INDEX idx_users_email ON users(email);

-- Add triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_locations_updated_at
    BEFORE UPDATE ON locations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assets_updated_at
    BEFORE UPDATE ON assets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maintenance_records_updated_at
    BEFORE UPDATE ON maintenance_records
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deployment_records_updated_at
    BEFORE UPDATE ON deployment_records
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();