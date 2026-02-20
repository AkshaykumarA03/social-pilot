#!/bin/bash
# Bliz Social Pilot - Quick Start Guide

echo "🚀 Bliz Social Pilot - Setup Guide"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Installation complete!"
echo ""
echo "🎯 To start the server, run:"
echo "   npm start"
echo ""
echo "📖 Then open index.html in your browser"
echo "   file://$(pwd)/index.html"
echo ""
echo "Happy posting! 🎉"
