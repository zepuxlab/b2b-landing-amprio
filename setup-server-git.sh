#!/bin/bash

# Setup git repository on server for B2B Landing Page
# This script sets up git repo on server for future deployments

set -e

echo "🔧 Setting up git repository on server..."

# Clone repository on server
ssh amprio "cd ~/officeamprio && rm -rf b2b && git clone https://github.com/zepuxlab/b2b-landing-amprio.git b2b"

echo "📦 Installing dependencies on server..."
ssh amprio "cd ~/officeamprio/b2b && npm install"

echo "🔨 Building on server..."
ssh amprio "cd ~/officeamprio/b2b && npm run build"

echo "🔐 Setting permissions..."
ssh amprio "sudo chown -R ec2-user:ec2-user ~/officeamprio/b2b && chmod -R 755 ~/officeamprio/b2b"

echo "✅ Server git setup completed!"
echo "💡 For future deployments, use: ./deploy.sh git"
