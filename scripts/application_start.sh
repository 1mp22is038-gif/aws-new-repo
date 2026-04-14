#!/bin/bash
# Configuration
PROJECT_DIR="/home/ubuntu/aws-new-repo"

echo "Current Directory: $PROJECT_DIR"
cd $PROJECT_DIR

# 1. Pull latest code from GitHub
echo "Syncing with GitHub..."
git pull origin main || echo "Git pull failed, using current files."

# 2. Update backend
cd backend
echo "Installing backend dependencies..."
npm install --omit=dev

# 3. Restart Application
echo "Restarting PM2 process..."
pm2 restart stellar-backend || pm2 start src/index.js --name "stellar-backend"

# 4. Save state
pm2 save
echo "Backend deployment complete!"
