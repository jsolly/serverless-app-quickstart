#!/bin/bash

# Setup Supabase database for the serverless app
# This script creates the users table and sets up RLS policies
#
# Usage:
#   ./scripts/setup-database.sh
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
    echo "SUPABASE_URL=your_supabase_url"
    echo "SUPABASE_ANON_KEY=your_supabase_anon_key"
    exit 1
fi

# Load environment variables
export $(cat .env.local | grep -v '^#' | xargs)

# Check if required environment variables are set
if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}Error: DATABASE_URL must be set in .env.local${NC}"
    echo "Example: DATABASE_URL=postgresql://postgres:password@host:5432/database"
    exit 1
fi

DB_URL="$DATABASE_URL"

echo -e "${GREEN}Connecting to database...${NC}"

# Execute the SQL
if psql "$DB_URL" -f "supabase/users-table.sql"; then
    echo -e "${GREEN}✅ Database setup completed successfully!${NC}"
    echo -e "${GREEN}Users table created with RLS policies and triggers.${NC}"
else
    echo -e "${RED}❌ Database setup failed${NC}"
    exit 1
fi

# No cleanup needed since we're using the existing SQL file

echo -e "${GREEN}🎉 Setup complete! You can now test registration.${NC}"
