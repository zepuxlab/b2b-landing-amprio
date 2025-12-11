#!/bin/bash

# Deploy script for B2B Landing Page
# Usage: ./deploy.sh [method]
# Methods: local (default) - build locally and rsync, git - pull and build on server

set -e

METHOD=${1:-local}

echo "🚀 Starting deployment (method: $METHOD)..."

if [ "$METHOD" = "git" ]; then
    # Deploy via git on server
    echo "📥 Pulling latest changes on server..."
    ssh amprio "cd ~/officeamprio/b2b && git pull origin main"
    
    echo "📦 Installing dependencies..."
    ssh amprio "cd ~/officeamprio/b2b && npm install"
    
    echo "🔨 Building on server..."
    ssh amprio "cd ~/officeamprio/b2b && npm run build"
    
    echo "🔐 Setting permissions..."
    ssh amprio "sudo chown -R ec2-user:ec2-user ~/officeamprio/b2b && chmod -R 755 ~/officeamprio/b2b"
else
    # Build locally and deploy
    echo "📦 Building project locally..."
    npm run build

    if [ ! -d "dist" ]; then
        echo "❌ Build failed - dist folder not found"
        exit 1
    fi

    echo "✅ Build completed"

    # Deploy to server
    echo "📤 Uploading files to server..."
    rsync -avz --delete \
        --exclude '.git' \
        --exclude 'node_modules' \
        dist/ \
        amprio:~/officeamprio/b2b/

    echo "✅ Files uploaded"

    # Set permissions
    echo "🔐 Setting permissions..."
    ssh amprio "sudo chown -R ec2-user:ec2-user ~/officeamprio/b2b && chmod -R 755 ~/officeamprio/b2b"
fi

echo "✅ Permissions set"

# Test nginx config
echo "🔍 Testing nginx configuration..."
ssh amprio "sudo nginx -t"

if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration is valid"
    echo "🌐 Site is available at: https://office.ampriomilano.com/b2b"
else
    echo "❌ Nginx configuration has errors"
    exit 1
fi

echo "🎉 Deployment completed successfully!"
