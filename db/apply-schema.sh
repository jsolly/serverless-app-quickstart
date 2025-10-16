#!/bin/bash

# Apply database schema from users-table.sql to Supabase
# This script creates the users table and sets up RLS policies
#
# Usage:
#   ./db/apply-schema.sh
#
# Prerequisites:
#   - .env.local file with DATABASE_URL
#   - psql command line tool installed

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Setting up Supabase database...${NC}"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${RED}Error: .env.local file not found${NC}"
    echo "Please create .env.local with your Supabase credentials:"
    echo "DATABASE_URL=postgresql://postgres:password@host:5432/database"
    exit 1
fi

# Load environment variables
set -a
source .env.local
set +a

# Check if required environment variables are set
if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}Error: DATABASE_URL must be set in .env.local${NC}"
    echo "Example: DATABASE_URL=postgresql://postgres:password@host:5432/database"
    exit 1
fi

echo -e "${GREEN}Connecting to database...${NC}"

echo -e "${YELLOW}Dropping existing users table...${NC}"
psql "$DATABASE_URL" -c "DROP TABLE IF EXISTS users CASCADE;"

if psql "$DATABASE_URL" -f "db/users-table.sql"; then
    echo -e "${GREEN}✅ Database setup completed successfully!${NC}"
    echo -e "${GREEN}Users table created with RLS policies and triggers.${NC}"
else
    echo -e "${RED}❌ Database setup failed${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Setup complete! You can now test registration.${NC}"

